'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { formatRelativeTime } from '@/utils';

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
  postLikes: initialPostLikes, 
  postAuthorId,
  currentUser,
  initialComments,
  userHasLiked: initialUserHasLiked 
}: PostCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const [postLikes, setPostLikes] = useState(initialPostLikes);
  const [userHasLiked, setUserHasLiked] = useState(initialUserHasLiked);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editCommentText, setEditCommentText] = useState('');
  
  // Check if current user is admin
  const isAdmin = ['admin', 'executive', 'ceo'].includes(currentUser?.role || '');
  
  const getDisplayName = (user: any) => {
    if (user?.username) return `u/${user.username}`;
    if (user?.first_name) return user.first_name;
    return 'Anonymous';
  };
  
  const getAvatar = (user: any) => {
    const initial = user?.first_name?.[0] || user?.username?.[0] || '?';
    return initial.toUpperCase();
  };
  
  const handleLikePost = async () => {
    const supabase = createClient();
    if (userHasLiked) {
      await supabase.from('community_likes').delete().eq('post_id', postId).eq('user_id', currentUser.id);
      await supabase.from('community_posts').update({ likes: postLikes - 1 }).eq('id', postId);
      setPostLikes(postLikes - 1);
      setUserHasLiked(false);
    } else {
      await supabase.from('community_likes').insert({ post_id: postId, user_id: currentUser.id });
      await supabase.from('community_posts').update({ likes: postLikes + 1 }).eq('id', postId);
      if (postAuthorId !== currentUser.id) {
        await supabase.rpc('increment_points', { user_id: postAuthorId, amount: 2 });
      }
      setPostLikes(postLikes + 1);
      setUserHasLiked(true);
    }
  };
  
  const handleSubmitComment = async (parentId: string | null = null) => {
    const text = parentId ? replyTexts[parentId] || '' : newComment;
    if (!text.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    const supabase = createClient();
    
    try {
      const { data, error } = await supabase
        .from('community_comments')
        .insert({
          post_id: postId,
          user_id: currentUser.id,
          body: text.trim(),
          parent_id: parentId,
          likes: 0,
        })
        .select('*')
        .single();
      
      if (error) {
        console.error('Comment error:', error);
        alert('Failed to post comment. Please try again.');
        setIsSubmitting(false);
        return;
      }
      
      if (data) {
        // Add the new comment with current user's profile
        const newCommentWithProfile = {
          ...data,
          user_profiles: {
            id: currentUser.id,
            username: currentUser.username,
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            role: currentUser.role,
            is_prime: currentUser.is_prime,
            points: currentUser.points,
            avatar_url: currentUser.avatar_url,
          }
        };
        
        setComments([...comments, newCommentWithProfile as any]);
        
        if (parentId) {
          setReplyTexts(prev => ({ ...prev, [parentId]: '' }));
          setReplyingTo(null);
        } else {
          setNewComment('');
        }
        
        // Award points
        try {
          await supabase.rpc('increment_points', { user_id: currentUser.id, amount: 5 });
        } catch (e) {
          // Ignore points error
        }
      }
    } catch (err) {
      console.error('Comment error:', err);
      alert('Failed to post comment. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const handleEditComment = async (commentId: string) => {
    if (!editCommentText.trim()) return;
    
    const supabase = createClient();
    const { error } = await supabase
      .from('community_comments')
      .update({ body: editCommentText.trim(), updated_at: new Date().toISOString() })
      .eq('id', commentId)
      .eq('user_id', currentUser.id);
    
    if (!error) {
      setComments(comments.map(c => c.id === commentId ? { ...c, body: editCommentText.trim() } : c));
      setEditingComment(null);
      setEditCommentText('');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    
    const supabase = createClient();
    const { error } = await supabase
      .from('community_comments')
      .update({ deleted: true })
      .eq('id', commentId);
    
    if (!error) {
      setComments(comments.filter(c => c.id !== commentId));
    }
  };

  const handleAdminDeleteComment = async (commentId: string) => {
    if (!confirm('ADMIN: Delete this comment? This action will be logged.')) return;
    
    const supabase = createClient();
    const { error } = await supabase
      .from('community_comments')
      .update({ deleted: true })
      .eq('id', commentId);
    
    if (!error) {
      await supabase.from('admin_actions').insert({
        admin_id: currentUser.id,
        action_type: 'delete_comment',
        target_id: commentId,
        details: { reason: 'Admin deletion from post' },
      });
      setComments(comments.filter(c => c.id !== commentId));
    }
  };

  const handleReplyTextChange = (commentId: string, value: string) => {
    setReplyTexts(prev => ({ ...prev, [commentId]: value }));
  };
  
  const topLevelComments = comments.filter(c => !c.parent_id);
  const getReplies = (parentId: string) => comments.filter(c => c.parent_id === parentId);
  
  return (
    <div>
      {/* Post Actions */}
      <div className="flex items-center gap-6 py-4 border-t border-knight-gold-dark">
        <button 
          onClick={handleLikePost}
          className={`flex items-center gap-2 text-lg ${userHasLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} transition`}
        >
          {userHasLiked ? '❤️' : '🤍'} {postLikes}
        </button>
        <span className="flex items-center gap-2 text-lg text-gray-400">
          💬 {comments.length}
        </span>
      </div>
      
      {/* New Comment */}
      <div className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full bg-knight-hover border border-knight-gold-dark rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-knight-gold resize-none"
          rows={3}
        />
        <button
          onClick={() => handleSubmitComment(null)}
          disabled={!newComment.trim() || isSubmitting}
          className="btn-knight mt-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Posting...' : '💬 Post Comment (+5 pts)'}
        </button>
      </div>
      
      {/* Comments List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Comments ({comments.length})</h3>
        {topLevelComments.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No comments yet. Be the first!</p>
        ) : (
          topLevelComments.map(comment => {
            const replies = getReplies(comment.id);
            const user = Array.isArray(comment.user_profiles) ? comment.user_profiles[0] : comment.user_profiles;
            
            return (
              <div key={comment.id}>
                <div className="bg-knight-hover rounded-lg p-4 mb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-knight-gold-dark flex items-center justify-center text-white font-bold text-sm">
                      {getAvatar(user)}
                    </div>
                    <span className="text-white font-bold">{getDisplayName(user)}</span>
                    <Badge type="role" role={user?.role || 'free'} />
                    {user?.is_prime && <span className="text-xs bg-knight-gold text-black px-2 py-0.5 rounded-full font-bold">⭐</span>}
                    <span className="text-gray-500 text-sm">{formatRelativeTime(comment.created_at)}</span>
                  </div>
                  <p className="text-gray-200 mb-3">{comment.body}</p>
                  <div className="flex items-center gap-4 text-sm flex-wrap">
                    <button className="text-gray-400 hover:text-knight-gold flex items-center gap-1">❤️ {comment.likes}</button>
                    <button 
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="text-gray-400 hover:text-knight-gold"
                    >
                      💬 Reply
                    </button>
                    
                    {/* Edit/Delete for comment owner */}
                    {comment.user_id === currentUser?.id && (
                      <>
                        <button 
                          onClick={() => {
                            setEditingComment(comment.id);
                            setEditCommentText(comment.body);
                          }}
                          className="text-gray-400 hover:text-blue-400"
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          🗑️ Delete
                        </button>
                      </>
                    )}
                    
                    {/* Admin delete */}
                    {isAdmin && comment.user_id !== currentUser?.id && (
                      <button 
                        onClick={() => handleAdminDeleteComment(comment.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        🔴 Admin Delete
                      </button>
                    )}
                  </div>
                  
                  {replyingTo === comment.id && (
                    <div className="mt-3">
                      <textarea
                        value={replyTexts[comment.id] || ''}
                        onChange={(e) => handleReplyTextChange(comment.id, e.target.value)}
                        placeholder="Write a reply..."
                        className="w-full bg-knight-black border border-knight-gold-dark rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-knight-gold resize-none"
                        rows={2}
                        autoFocus
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleSubmitComment(comment.id)}
                          disabled={!(replyTexts[comment.id] || '').trim() || isSubmitting}
                          className="btn-knight text-sm px-4 py-1 disabled:opacity-50"
                        >
                          {isSubmitting ? 'Posting...' : 'Reply'}
                        </button>
                        <button
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyTexts(prev => ({ ...prev, [comment.id]: '' }));
                          }}
                          className="text-gray-400 hover:text-white text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Edit Comment Form */}
                  {editingComment === comment.id && (
                    <div className="mt-3">
                      <textarea
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                        className="w-full bg-knight-black border border-knight-gold-dark rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-knight-gold resize-none"
                        rows={2}
                        autoFocus
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleEditComment(comment.id)}
                          disabled={!editCommentText.trim()}
                          className="btn-knight text-sm px-4 py-1 disabled:opacity-50"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingComment(null);
                            setEditCommentText('');
                          }}
                          className="text-gray-400 hover:text-white text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Nested Replies */}
                {replies.map(reply => {
                  const replyUser = Array.isArray(reply.user_profiles) ? reply.user_profiles[0] : reply.user_profiles;
                  return (
                    <div key={reply.id} className="ml-8 border-l-2 border-knight-gold-dark pl-4">
                      <div className="bg-knight-hover rounded-lg p-4 mb-2">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-knight-gold-dark flex items-center justify-center text-white font-bold text-sm">
                            {getAvatar(replyUser)}
                          </div>
                          <span className="text-white font-bold">{getDisplayName(replyUser)}</span>
                          <Badge type="role" role={replyUser?.role || 'free'} />
                          {replyUser?.is_prime && <span className="text-xs bg-knight-gold text-black px-2 py-0.5 rounded-full font-bold">⭐</span>}
                          <span className="text-gray-500 text-sm">{formatRelativeTime(reply.created_at)}</span>
                        </div>
                        <p className="text-gray-200">{reply.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
