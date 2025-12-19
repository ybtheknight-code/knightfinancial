'use client';

import { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { Textarea } from '@/components/Input';
import { formatRelativeTime } from '@/utils';
import { createClient } from '@/lib/supabase';

interface Comment {
  id: string;
  body: string;
  likes: number;
  created_at: string;
  user_id: string;
  parent_id: string | null;
  user_profiles: any;
}

interface PostCommentsProps {
  postId: string;
  postLikes: number;
  postAuthorId: string;
  currentUser: any;
  initialComments: Comment[];
  userHasLiked: boolean;
}

export default function PostComments({
  postId,
  postLikes,
  postAuthorId,
  currentUser,
  initialComments,
  userHasLiked,
}: PostCommentsProps) {
  const [likes, setLikes] = useState(postLikes);
  const [hasLiked, setHasLiked] = useState(userHasLiked);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [posting, setPosting] = useState(false);
  const [sortBy, setSortBy] = useState<'best' | 'new' | 'old'>('best');

  const getDisplayName = (user: any) => {
    if (user?.username) return `u/${user.username}`;
    if (user?.first_name) return user.first_name;
    return 'Anonymous';
  };

  const getAvatar = (user: any) => {
    const initial = user?.first_name?.[0] || user?.username?.[0] || '?';
    return initial.toUpperCase();
  };

  const handleUpvote = async () => {
    const supabase = createClient();
    
    if (hasLiked) {
      // Remove like
      await supabase
        .from('community_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', currentUser.id);
      
      await supabase
        .from('community_posts')
        .update({ likes: likes - 1 })
        .eq('id', postId);
      
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      // Add like
      await supabase
        .from('community_likes')
        .insert({ post_id: postId, user_id: currentUser.id });
      
      await supabase
        .from('community_posts')
        .update({ likes: likes + 1 })
        .eq('id', postId);
      
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    setPosting(true);
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('community_comments')
      .insert({
        post_id: postId,
        user_id: currentUser.id,
        body: newComment,
        likes: 0,
        parent_id: null,
      })
      .select(`
        id, body, likes, created_at, user_id, parent_id,
        user_profiles!community_comments_user_id_fkey (
          id, username, first_name, last_name, role, is_prime, points, avatar_url
        )
      `)
      .single();
    
    if (!error && data) {
      setComments([...comments, data]);
      setNewComment('');
      
      // Award points
      await supabase.rpc('award_points', {
        p_user_id: currentUser.id,
        p_points: 3,
        p_reason: 'Commented on post',
      });
    }
    setPosting(false);
  };

  const handleReply = async (parentId: string) => {
    if (!replyText.trim()) return;
    
    setPosting(true);
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('community_comments')
      .insert({
        post_id: postId,
        user_id: currentUser.id,
        body: replyText,
        likes: 0,
        parent_id: parentId,
      })
      .select(`
        id, body, likes, created_at, user_id, parent_id,
        user_profiles!community_comments_user_id_fkey (
          id, username, first_name, last_name, role, is_prime, points, avatar_url
        )
      `)
      .single();
    
    if (!error && data) {
      setComments([...comments, data]);
      setReplyText('');
      setReplyingTo(null);
      
      // Award points
      await supabase.rpc('award_points', {
        p_user_id: currentUser.id,
        p_points: 3,
        p_reason: 'Replied to comment',
      });
    }
    setPosting(false);
  };

  const handleLikeComment = async (commentId: string) => {
    const supabase = createClient();
    const comment = comments.find(c => c.id === commentId);
    if (!comment) return;
    
    // Simple toggle - in real app would track individual likes
    await supabase
      .from('community_comments')
      .update({ likes: comment.likes + 1 })
      .eq('id', commentId);
    
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    ));
  };

  // Get top-level comments
  const topLevelComments = comments.filter(c => !c.parent_id);
  
  // Sort comments
  const sortedComments = [...topLevelComments].sort((a, b) => {
    switch (sortBy) {
      case 'best': return b.likes - a.likes;
      case 'new': return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'old': return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      default: return 0;
    }
  });

  // Get replies for a comment
  const getReplies = (parentId: string) => {
    return comments
      .filter(c => c.parent_id === parentId)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  };

  const CommentCard = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => {
    const replies = getReplies(comment.id);
    const isAuthor = comment.user_id === postAuthorId;
    
    return (
      <div className={`${isReply ? 'ml-8 border-l-2 border-knight-gold-dark pl-4' : ''}`}>
        <div className="bg-knight-hover rounded-lg p-4 mb-3">
          {/* Comment Header */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <div className="w-8 h-8 rounded-full bg-knight-gold-dark flex items-center justify-center text-white font-bold text-sm">
              {getAvatar(comment.user_profiles)}
            </div>
            <Link 
              href={`/profile/${comment.user_profiles?.id}`}
              className="font-bold text-white hover:text-knight-gold text-sm"
            >
              {getDisplayName(comment.user_profiles)}
            </Link>
            <Badge type="role" role={comment.user_profiles?.role as any || 'free'} />
            {comment.user_profiles?.is_prime && (
              <span className="text-xs bg-knight-gold text-black px-1 py-0.5 rounded font-bold">⭐</span>
            )}
            {isAuthor && (
              <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">OP</span>
            )}
            <span className="text-xs text-gray-500">{formatRelativeTime(comment.created_at)}</span>
          </div>
          
          {/* Comment Body */}
          <p className="text-gray-200 whitespace-pre-wrap break-words mb-3">
            {comment.body}
          </p>
          
          {/* Comment Actions */}
          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={() => handleLikeComment(comment.id)}
              className="flex items-center gap-1 text-gray-400 hover:text-knight-gold transition"
            >
              ⬆️ <span>{comment.likes}</span>
            </button>
            <button
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="text-gray-400 hover:text-knight-gold transition"
            >
              💬 Reply
            </button>
          </div>
          
          {/* Reply Form */}
          {replyingTo === comment.id && (
            <div className="mt-4 space-y-2">
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={3}
                placeholder={`Reply to ${getDisplayName(comment.user_profiles)}...`}
              />
              <div className="flex gap-2">
                <Button
                  onClick={() => handleReply(comment.id)}
                  disabled={!replyText.trim()}
                  loading={posting}
                  size="sm"
                >
                  Reply
                </Button>
                <Button
                  onClick={() => { setReplyingTo(null); setReplyText(''); }}
                  variant="gold-outline"
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Nested Replies */}
        {replies.length > 0 && (
          <div className="space-y-3">
            {replies.map(reply => (
              <CommentCard key={reply.id} comment={reply} isReply />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Post Action Bar */}
      <div className="flex items-center gap-6 py-4 border-t border-b border-knight-gold-dark mb-6">
        <button
          onClick={handleUpvote}
          className={`flex items-center gap-2 text-lg transition ${
            hasLiked ? 'text-knight-gold' : 'text-gray-400 hover:text-knight-gold'
          }`}
        >
          <span className="text-2xl">⬆️</span>
          <span className="font-bold">{likes}</span>
          <span>{hasLiked ? 'Upvoted' : 'Upvote'}</span>
        </button>
        
        <div className="flex items-center gap-2 text-gray-400">
          <span className="text-xl">💬</span>
          <span className="font-bold">{comments.length}</span>
          <span>Comments</span>
        </div>
        
        <button className="flex items-center gap-2 text-gray-400 hover:text-knight-gold transition">
          <span className="text-xl">🔗</span>
          <span>Share</span>
        </button>
        
        <button className="flex items-center gap-2 text-gray-400 hover:text-knight-gold transition">
          <span className="text-xl">🔖</span>
          <span>Save</span>
        </button>
      </div>
      
      {/* Comment Box */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-knight-gold mb-4">Leave a Comment</h3>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
          placeholder="Share your thoughts, advice, or support..."
        />
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-gray-500">Be respectful. Follow the Warrior Code.</span>
          <Button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            loading={posting}
          >
            Post Comment (+3 pts)
          </Button>
        </div>
      </div>
      
      {/* Comments Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-knight-gold">
            Comments ({comments.length})
          </h3>
          <div className="flex gap-2">
            {(['best', 'new', 'old'] as const).map(sort => (
              <button
                key={sort}
                onClick={() => setSortBy(sort)}
                className={`px-3 py-1 rounded text-sm font-bold transition ${
                  sortBy === sort
                    ? 'bg-knight-gold text-black'
                    : 'bg-knight-hover text-gray-400 hover:text-white'
                }`}
              >
                {sort === 'best' ? '🏆 Best' : sort === 'new' ? '✨ New' : '📅 Old'}
              </button>
            ))}
          </div>
        </div>
        
        {sortedComments.length > 0 ? (
          <div className="space-y-4">
            {sortedComments.map(comment => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <div className="text-5xl mb-4">💬</div>
            <h4 className="text-xl font-bold text-knight-gold mb-2">No Comments Yet</h4>
            <p className="text-gray-400">Be the first to share your thoughts!</p>
          </Card>
        )}
      </div>
    </>
  );
}
