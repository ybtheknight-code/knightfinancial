'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { Textarea, Select } from '@/components/Input';
import { formatRelativeTime } from '@/utils';
import { createClient } from '@/lib/supabase';

// Reaction types - like Facebook reactions
const REACTIONS = [
  { emoji: '⬆️', name: 'upvote', label: 'Upvote' },
  { emoji: '⚔️', name: 'warrior', label: 'Warrior!' },
  { emoji: '🔥', name: 'fire', label: 'Fire!' },
  { emoji: '🏆', name: 'victory', label: 'Victory!' },
  { emoji: '💪', name: 'strong', label: 'Stay Strong' },
];

const TAGS = [
  { name: 'Victory', color: 'bg-green-600', emoji: '🏆' },
  { name: 'Question', color: 'bg-blue-600', emoji: '❓' },
  { name: 'Help', color: 'bg-red-600', emoji: '🆘' },
  { name: 'Strategy', color: 'bg-purple-600', emoji: '🎯' },
  { name: 'Legal', color: 'bg-yellow-600', emoji: '⚖️' },
  { name: 'TransUnion', color: 'bg-orange-600', emoji: '🎯' },
  { name: 'Equifax', color: 'bg-pink-600', emoji: '🎯' },
  { name: 'Experian', color: 'bg-cyan-600', emoji: '🎯' },
  { name: 'Miller Case', color: 'bg-knight-gold', emoji: '⚔️' },
  { name: 'Discussion', color: 'bg-gray-600', emoji: '💬' },
];

interface Post {
  id: string;
  title: string;
  body: string;
  tags: string[];
  likes: number;
  created_at: string;
  user_id: string;
  pinned: boolean;
  comment_count: number;
  user_profiles: {
    id: string;
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    role: string;
    is_prime: boolean;
    points: number;
    badges: string[];
    avatar_url: string | null;
  };
}

interface Comment {
  id: string;
  body: string;
  created_at: string;
  likes: number;
  user_profiles: {
    username: string | null;
    first_name: string | null;
    role: string;
    is_prime: boolean;
    points: number;
  };
}

interface CommunityFeedProps {
  currentUser: any;
  initialPosts: Post[];
  commentsMap: Record<string, Comment[]>;
  trending: { id: string; title: string; likes: number }[];
  topWarriors: any[];
  stats: { totalPosts: number; totalComments: number; totalWarriors: number };
}

export default function CommunityFeed({
  currentUser,
  initialPosts,
  commentsMap,
  trending,
  topWarriors,
  stats,
}: CommunityFeedProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPostBody, setNewPostBody] = useState('');
  const [newPostTags, setNewPostTags] = useState<string[]>([]);
  const [showFullPost, setShowFullPost] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('hot');
  const [posting, setPosting] = useState(false);
  const [quickComment, setQuickComment] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editPostBody, setEditPostBody] = useState('');

  // Check if current user is admin
  const isAdmin = ['admin', 'executive', 'ceo'].includes(currentUser?.role || '');

  // Calculate "hot" score (Reddit-style)
  const getHotScore = (post: Post) => {
    const ageHours = (Date.now() - new Date(post.created_at).getTime()) / (1000 * 60 * 60);
    const score = post.likes + (post.comment_count * 2);
    return score / Math.pow(ageHours + 2, 1.5);
  };

  const sortedPosts = [...posts]
    .filter(p => !selectedTag || p.tags?.includes(selectedTag))
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      
      switch (sortBy) {
        case 'hot': return getHotScore(b) - getHotScore(a);
        case 'new': return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'top': return b.likes - a.likes;
        default: return 0;
      }
    });

  const handleCreatePost = async () => {
    if (!newPostBody.trim() || posting) return;
    
    setPosting(true);
    const supabase = createClient();
    
    // Auto-generate title from first line or first 50 chars
    const title = newPostBody.split('\n')[0].slice(0, 100) || newPostBody.slice(0, 100);
    
    const { data, error } = await supabase
      .from('community_posts')
      .insert({
        user_id: currentUser.id,
        title,
        body: newPostBody,
        tags: newPostTags,
        likes: 0,
        pinned: false,
      })
      .select()
      .single();
    
    if (!error && data) {
      const newPost: Post = {
        ...data,
        comment_count: 0,
        user_profiles: currentUser,
      };
      setPosts([newPost, ...posts]);
      setNewPostBody('');
      setNewPostTags([]);
      setShowFullPost(false);
      
      // Award points
      await supabase.rpc('award_points', {
        p_user_id: currentUser.id,
        p_points: 10,
        p_reason: 'Posted in community',
      });
    }
    setPosting(false);
  };

  const handleEditPost = async (postId: string) => {
    if (!editPostBody.trim()) return;
    
    const supabase = createClient();
    const title = editPostBody.split('\n')[0].slice(0, 100) || editPostBody.slice(0, 100);
    
    const { error } = await supabase
      .from('community_posts')
      .update({ body: editPostBody, title, updated_at: new Date().toISOString() })
      .eq('id', postId)
      .eq('user_id', currentUser.id);
    
    if (!error) {
      setPosts(posts.map(p => p.id === postId ? { ...p, body: editPostBody, title } : p));
      setEditingPost(null);
      setEditPostBody('');
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    const supabase = createClient();
    
    // Soft delete the post
    const { error } = await supabase
      .from('community_posts')
      .update({ deleted: true })
      .eq('id', postId);
    
    if (!error) {
      setPosts(posts.filter(p => p.id !== postId));
    }
  };

  const handleAdminDeletePost = async (postId: string) => {
    if (!confirm('ADMIN: Are you sure you want to delete this post? This action will be logged.')) return;
    
    const supabase = createClient();
    
    const { error } = await supabase
      .from('community_posts')
      .update({ deleted: true, deleted_by: currentUser.id })
      .eq('id', postId);
    
    if (!error) {
      // Log admin action
      await supabase.from('admin_actions').insert({
        admin_id: currentUser.id,
        action_type: 'delete_post',
        target_id: postId,
        details: { reason: 'Admin deletion from feed' },
      });
      setPosts(posts.filter(p => p.id !== postId));
    }
  };

  const handleUpvote = async (postId: string) => {
    const supabase = createClient();
    
    const { data: existing } = await supabase
      .from('community_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', currentUser.id)
      .single();
    
    if (existing) {
      await supabase.from('community_likes').delete().eq('id', existing.id);
      setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes - 1 } : p));
      await supabase.from('community_posts').update({ likes: posts.find(p => p.id === postId)!.likes - 1 }).eq('id', postId);
    } else {
      await supabase.from('community_likes').insert({ post_id: postId, user_id: currentUser.id });
      setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
      await supabase.from('community_posts').update({ likes: posts.find(p => p.id === postId)!.likes + 1 }).eq('id', postId);
    }
  };

  const handleQuickComment = async (postId: string) => {
    const comment = quickComment[postId];
    if (!comment?.trim()) return;
    
    const supabase = createClient();
    
    await supabase.from('community_comments').insert({
      post_id: postId,
      user_id: currentUser.id,
      body: comment,
      likes: 0,
    });
    
    setPosts(posts.map(p => p.id === postId ? { ...p, comment_count: p.comment_count + 1 } : p));
    setQuickComment({ ...quickComment, [postId]: '' });
    
    await supabase.rpc('award_points', {
      p_user_id: currentUser.id,
      p_points: 3,
      p_reason: 'Commented on post',
    });
  };

  const handleReportPost = async (postId: string) => {
    const reason = prompt('Why are you reporting this post?');
    if (!reason) return;
    
    const supabase = createClient();
    
    // Flag the post
    await supabase
      .from('community_posts')
      .update({ 
        flagged: true,
        flagged_reason: reason 
      })
      .eq('id', postId);
    
    // Notify user
    alert('Thank you for reporting. Our team will review this post.');
  };

  const getAvatar = (user: any) => {
    if (user?.avatar_url) return user.avatar_url;
    const initial = user?.first_name?.[0] || user?.username?.[0] || '?';
    return initial.toUpperCase();
  };

  const getDisplayName = (user: any) => {
    if (user?.username) return `u/${user.username}`;
    if (user?.first_name) return user.first_name;
    return 'Anonymous';
  };

  return (
    <div className="min-h-screen bg-knight-black">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-knight-gold-dark via-knight-gold to-knight-gold-dark py-6">
        <div className="container-knight">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-black">⚔️ Knight Community</h1>
              <p className="text-black/70">Warriors fighting credit bureaus together</p>
            </div>
            <div className="hidden md:flex gap-6 text-black">
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.totalWarriors}</div>
                <div className="text-sm">Warriors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.totalPosts}</div>
                <div className="text-sm">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.totalComments}</div>
                <div className="text-sm">Comments</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-knight py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-3">
            {/* Post Box - Facebook style */}
            <Card className="mb-6">
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-knight-gold flex items-center justify-center text-black font-bold text-xl flex-shrink-0">
                  {getAvatar(currentUser)}
                </div>
                
                <div className="flex-1">
                  {!showFullPost ? (
                    <button
                      onClick={() => setShowFullPost(true)}
                      className="w-full text-left bg-knight-hover rounded-full px-6 py-3 text-gray-400 hover:bg-knight-gold-dark transition"
                    >
                      What's on your mind, {currentUser?.first_name || 'Warrior'}? Share your victory or ask for help...
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <Textarea
                        value={newPostBody}
                        onChange={(e) => setNewPostBody(e.target.value)}
                        rows={4}
                        placeholder="Share your credit journey... 🏆 Victory? ❓ Question? 🆘 Need help?"
                        autoFocus
                      />
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {TAGS.map(tag => (
                          <button
                            key={tag.name}
                            onClick={() => {
                              if (newPostTags.includes(tag.name)) {
                                setNewPostTags(newPostTags.filter(t => t !== tag.name));
                              } else {
                                setNewPostTags([...newPostTags, tag.name]);
                              }
                            }}
                            className={`px-3 py-1 rounded-full text-sm font-bold transition flex items-center gap-1 ${
                              newPostTags.includes(tag.name)
                                ? `${tag.color} text-white`
                                : 'bg-knight-hover text-gray-400 hover:text-white'
                            }`}
                          >
                            {tag.emoji} {tag.name}
                          </button>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <button onClick={() => setShowFullPost(false)} className="text-gray-400 hover:text-white">
                          Cancel
                        </button>
                        <Button
                          onClick={handleCreatePost}
                          disabled={!newPostBody.trim()}
                          loading={posting}
                        >
                          🚀 Post (+10 pts)
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Sort/Filter Bar */}
            <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
              {['hot', 'new', 'top'].map(sort => (
                <button
                  key={sort}
                  onClick={() => setSortBy(sort)}
                  className={`px-4 py-2 rounded-full font-bold transition whitespace-nowrap ${
                    sortBy === sort
                      ? 'bg-knight-gold text-black'
                      : 'bg-knight-hover text-gray-400 hover:text-white'
                  }`}
                >
                  {sort === 'hot' && '🔥'} {sort === 'new' && '✨'} {sort === 'top' && '🏆'} {sort.charAt(0).toUpperCase() + sort.slice(1)}
                </button>
              ))}
              
              <div className="border-l border-gray-700 ml-2 pl-4 flex gap-2">
                <button
                  onClick={() => setSelectedTag('')}
                  className={`px-3 py-2 rounded-full text-sm font-bold transition ${
                    !selectedTag ? 'bg-knight-gold text-black' : 'bg-knight-hover text-gray-400'
                  }`}
                >
                  All
                </button>
                {TAGS.slice(0, 5).map(tag => (
                  <button
                    key={tag.name}
                    onClick={() => setSelectedTag(selectedTag === tag.name ? '' : tag.name)}
                    className={`px-3 py-2 rounded-full text-sm font-bold transition whitespace-nowrap ${
                      selectedTag === tag.name ? `${tag.color} text-white` : 'bg-knight-hover text-gray-400'
                    }`}
                  >
                    {tag.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {sortedPosts.map((post) => (
                <Card key={post.id} className={`${post.pinned ? 'border-2 border-knight-gold' : ''}`}>
                  {post.pinned && (
                    <div className="text-xs text-knight-gold font-bold mb-2">📌 PINNED BY MODERATORS</div>
                  )}
                  
                  <div className="flex gap-4">
                    {/* Upvote Column */}
                    <div className="flex flex-col items-center gap-1 min-w-[50px]">
                      <button
                        onClick={() => handleUpvote(post.id)}
                        className="text-3xl hover:scale-125 transition active:scale-95"
                      >
                        ⬆️
                      </button>
                      <div className={`text-xl font-bold ${post.likes > 0 ? 'text-knight-gold' : 'text-gray-500'}`}>
                        {post.likes}
                      </div>
                    </div>
                    
                    {/* Post Content */}
                    <div className="flex-1 min-w-0">
                      {/* Author Header */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <div className="w-8 h-8 rounded-full bg-knight-gold-dark flex items-center justify-center text-white font-bold text-sm">
                          {getAvatar(post.user_profiles)}
                        </div>
                        <Link href={`/profile/${post.user_profiles?.id}`} className="font-bold text-white hover:text-knight-gold">
                          {getDisplayName(post.user_profiles)}
                        </Link>
                        <Badge type="role" role={post.user_profiles?.role as any || 'free'} />
                        {post.user_profiles?.is_prime && (
                          <span className="text-xs bg-knight-gold text-black px-2 py-0.5 rounded-full font-bold">⭐ PRIME</span>
                        )}
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 text-sm">{formatRelativeTime(post.created_at)}</span>
                      </div>
                      
                      {/* Title */}
                      <Link href={`/community/post/${post.id}`}>
                        <h3 className="text-xl font-bold text-white hover:text-knight-gold transition mb-2 break-words">
                          {post.title}
                        </h3>
                      </Link>
                      
                      {/* Body Preview */}
                      <p className="text-gray-300 mb-3 whitespace-pre-wrap break-words line-clamp-4">
                        {post.body}
                      </p>
                      
                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map(tagName => {
                            const tag = TAGS.find(t => t.name === tagName);
                            return (
                              <span
                                key={tagName}
                                onClick={() => setSelectedTag(tagName)}
                                className={`text-xs font-bold px-2 py-1 rounded-full cursor-pointer transition hover:opacity-80 ${
                                  tag?.color || 'bg-gray-600'
                                } text-white`}
                              >
                                {tag?.emoji} {tagName}
                              </span>
                            );
                          })}
                        </div>
                      )}
                      
                      {/* Action Bar */}
                      <div className="flex items-center gap-4 text-sm border-t border-knight-gold-dark pt-3 mt-3 flex-wrap">
                        <Link
                          href={`/community/post/${post.id}`}
                          className="flex items-center gap-1 text-gray-400 hover:text-knight-gold transition"
                        >
                          💬 <span>{post.comment_count} comments</span>
                        </Link>
                        <button className="flex items-center gap-1 text-gray-400 hover:text-knight-gold transition">
                          🔗 Share
                        </button>
                        <button className="flex items-center gap-1 text-gray-400 hover:text-knight-gold transition">
                          🔖 Save
                        </button>
                        
                        {/* Edit/Delete for post owner */}
                        {post.user_id === currentUser?.id && (
                          <>
                            <button 
                              onClick={() => {
                                setEditingPost(post.id);
                                setEditPostBody(post.body);
                              }}
                              className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition"
                            >
                              ✏️ Edit
                            </button>
                            <button 
                              onClick={() => handleDeletePost(post.id)}
                              className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition"
                            >
                              🗑️ Delete
                            </button>
                          </>
                        )}
                        
                        {/* Admin delete */}
                        {isAdmin && post.user_id !== currentUser?.id && (
                          <button 
                            onClick={() => handleAdminDeletePost(post.id)}
                            className="flex items-center gap-1 text-red-400 hover:text-red-300 transition"
                          >
                            🔴 Admin Delete
                          </button>
                        )}
                        
                        <button 
                          onClick={() => handleReportPost(post.id)}
                          className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition ml-auto"
                        >
                          🚨 Report
                        </button>
                      </div>
                      
                      {/* Edit Form */}
                      {editingPost === post.id && (
                        <div className="mt-4 p-4 bg-knight-hover rounded-lg border border-knight-gold-dark">
                          <textarea
                            value={editPostBody}
                            onChange={(e) => setEditPostBody(e.target.value)}
                            className="w-full bg-knight-black border border-knight-gold-dark rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-knight-gold resize-none"
                            rows={4}
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleEditPost(post.id)}
                              disabled={!editPostBody.trim()}
                              className="btn-knight text-sm px-4 py-1 disabled:opacity-50"
                            >
                              Save Changes
                            </button>
                            <button
                              onClick={() => {
                                setEditingPost(null);
                                setEditPostBody('');
                              }}
                              className="text-gray-400 hover:text-white text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {/* Comment Preview */}
                      {commentsMap[post.id] && commentsMap[post.id].length > 0 && (
                        <div className="mt-4 space-y-2">
                          {commentsMap[post.id].slice(0, 2).map((comment: Comment) => (
                            <div key={comment.id} className="bg-knight-hover p-3 rounded-lg">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-sm text-white">
                                  {getDisplayName(comment.user_profiles)}
                                </span>
                                <Badge type="role" role={comment.user_profiles?.role as any || 'free'} />
                                <span className="text-xs text-gray-500">{formatRelativeTime(comment.created_at)}</span>
                              </div>
                              <p className="text-sm text-gray-300 line-clamp-2">{comment.body}</p>
                            </div>
                          ))}
                          {post.comment_count > 2 && (
                            <Link
                              href={`/community/post/${post.id}`}
                              className="text-sm text-knight-gold hover:underline"
                            >
                              View all {post.comment_count} comments →
                            </Link>
                          )}
                        </div>
                      )}
                      
                      {/* Quick Comment */}
                      <div className="mt-4 flex gap-2">
                        <input
                          type="text"
                          value={quickComment[post.id] || ''}
                          onChange={(e) => setQuickComment({ ...quickComment, [post.id]: e.target.value })}
                          placeholder="Write a comment..."
                          className="flex-1 bg-knight-hover border border-knight-gold-dark rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-knight-gold outline-none"
                          onKeyPress={(e) => e.key === 'Enter' && handleQuickComment(post.id)}
                        />
                        <button
                          onClick={() => handleQuickComment(post.id)}
                          disabled={!quickComment[post.id]?.trim()}
                          className="bg-knight-gold text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-knight-gold-dark hover:text-white transition disabled:opacity-50"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {sortedPosts.length === 0 && (
              <Card className="text-center py-16">
                <div className="text-6xl mb-4">⚔️</div>
                <h3 className="text-2xl font-bold text-knight-gold mb-2">No Posts Yet</h3>
                <p className="text-gray-400 mb-6">Be the first warrior to post!</p>
                <Button onClick={() => setShowFullPost(true)}>Create First Post</Button>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Rules */}
            <Card>
              <h3 className="text-lg font-bold text-knight-gold mb-4">⚔️ Warrior Code</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>NO credit repair scams</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>NO personal info sharing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">❌</span>
                  <span>NO illegal advice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Share victories & strategies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✅</span>
                  <span>Help fellow warriors</span>
                </li>
              </ul>
            </Card>

            {/* Trending Posts */}
            {trending.length > 0 && (
              <Card>
                <h3 className="text-lg font-bold text-knight-gold mb-4">🔥 Trending This Week</h3>
                <div className="space-y-3">
                  {trending.map((post, i) => (
                    <Link
                      key={post.id}
                      href={`/community/post/${post.id}`}
                      className="flex items-start gap-3 group"
                    >
                      <span className="text-2xl font-bold text-gray-600">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white group-hover:text-knight-gold transition line-clamp-2">
                          {post.title}
                        </p>
                        <p className="text-xs text-gray-500">{post.likes} upvotes</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}

            {/* Top Warriors */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-knight-gold">🏆 Top Warriors</h3>
                <Link href="/leaderboard" className="text-xs text-knight-gold hover:underline">
                  View All →
                </Link>
              </div>
              <div className="space-y-3">
                {topWarriors.slice(0, 5).map((warrior, i) => (
                  <div key={warrior.id} className="flex items-center gap-3">
                    <span className={`text-lg font-bold ${
                      i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-amber-600' : 'text-gray-600'
                    }`}>
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-knight-gold-dark flex items-center justify-center text-white font-bold text-sm">
                      {warrior.first_name?.[0] || warrior.username?.[0] || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">
                        {warrior.username ? `u/${warrior.username}` : warrior.first_name}
                      </p>
                      <p className="text-xs text-knight-gold">{warrior.points.toLocaleString()} pts</p>
                    </div>
                    {warrior.is_prime && <span className="text-xs">⭐</span>}
                  </div>
                ))}
              </div>
            </Card>

            {/* Your Stats */}
            <Card premium>
              <h3 className="text-lg font-bold text-gradient-gold mb-4">📊 Your Stats</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-knight-gold">{currentUser?.points || 0}</div>
                  <div className="text-xs text-gray-400">Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{currentUser?.badges?.length || 0}</div>
                  <div className="text-xs text-gray-400">Badges</div>
                </div>
              </div>
              <Link href="/profile" className="block mt-4">
                <Button fullWidth variant="gold-outline" size="sm">
                  View Profile
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
