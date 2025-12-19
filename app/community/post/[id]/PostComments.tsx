'use client';

import { useState, useCallback } from 'react';
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
  const [replyText, setReplyText] = useState('');
  const [postLikes, setPostLikes] = useState(initialPostLikes);
  const [userHasLiked, setUserHasLiked] = useState(initialUserHasLiked);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const supabase = createClient();
  
  const getDisplayName = (user: any) => {
    if (user?.username) return `u/${user.username}`;
    if (user?.first_name) return user.first_name;
    return 'Anonymous';
  };
  
  const getAvatar = (user: any) => {
    const initial = user?.first_name?.[0] || user?.username?.[0] || '?';
    return initial.toUpperCase();
  };
  
  // FIXED: Use useCallback to prevent re-renders
  const handleCommentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  }, []);
  
  const handleReplyChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
  }, []);
  
  const handleLikePost = async () => {
    if (userHasLiked) {
      // Unlike
      await supabase
        .from('community_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', currentUser.id);
      
      await supabase
        .from('community_posts')
        .update({ likes: postLikes - 1 })
        .eq('id', postId);
      
      setPostLikes(postLikes - 1);
      setUserHasLiked(false);
    } else {
      // Like
      await supabase
        .from('community_likes')
        .insert({
          post_id: postId,
          user_id: currentUser.id,
        });
      
      await supabase
        .from('community_posts')
        .update({ likes: postLikes + 1 })
        .eq('id', postId);
      
      // Award points to post author
      if (postAuthorId !== currentUser.id) {
        await supabase.rpc('increment_points', { 
          user_id: postAuthorId, 
          amount: 2 
        });
      }
      
      setPostLikes(postLikes + 1);
      setUserHasLiked(true);
    }
  };
  
  const handleSubmitComment = async (parentId: string | null = null) => {
    const text = parentId ? replyText : newComment;
    if (!text.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    
    const { data, error } = await supabase
      .from('community_comments')
      .insert({
        post_id: postId,
        user_id: currentUser.id,
        body: text.trim(),
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
      setComments([...comments, data as any]);
      if (parentId) {
        setReplyText('');
        setReplyingTo(null);
      } else {
        setNewComment('');
      }
      
      // Award points
      await supabase.rpc('increment_points', { 
        user_id: currentUser.id, 
        amount: 5 
      });
    }
    
    setIsSubmitting(false);
  };
  
  // Organize comments into threads
  const topLevelComments = comments.filter(c => !c.parent_id);
  const getReplies = (parentId: string) => comments.filter(c => c.parent_id === parentId);
  
  const CommentComponent = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => {
    const replies = getReplies(comment.id);
    const user = Array.isArray(comment.user_profiles) ? comment.user_profiles[0] : comment.user_profiles;
    
    return (
      <div className={`${depth > 0 ? 'ml-8 border-l-2 border-knight-gold-dark pl-4' : ''}`}>
        <div className="bg-knight-hover rounded-lg p-4 mb-2">
          {/* Author */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-knight-gold-dark flex items-center justify-center text-white font-bold text-sm">
              {getAvatar(user)}
            </div>
            <span className="text-white font-bold">{getDisplayName(user)}</span>
            <Badge type="role" role={user?.role || 'free'} />
            {user?.is_prime && (
              <span className="text-xs bg-knight-gold text-black px-2 py-0.5 rounded-full font-bold">⭐</span>
            )}
            <span className="text-gray-500 text-sm">{formatRelativeTime(comment.created_at)}</span>
          </div>
          
          {/* Body */}
          <p className="text-gray-200 mb-3">{comment.body}</p>
          
          {/* Actions */}
          <div className="flex items-center gap-4 text-sm">
            <button className="text-gray-400 hover:text-knight-gold flex items-center gap-1">
              ❤️ {comment.likes}
            </button>
            <button 
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="text-gray-400 hover:text-knight-gold"
            >
              💬 Reply
            </button>
          </div>
          
          {/* Reply input - FIXED */}
          {replyingTo === comment.id && (
            <div className="mt-3">
              <textarea
                value={replyText}
                onChange={handleReplyChange}
                placeholder="Write a reply..."
                className="w-full bg-knight-black border border-knight-gold-dark rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-knight-gold resize-none"
                rows={2}
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleSubmitComment(comment.id)}
                  disabled={!replyText.trim() || isSubmitting}
                  className="btn-knight text-sm px-4 py-1 disabled:opacity-50"
                >
                  {isSubmitting ? 'Posting...' : 'Reply'}
                </button>
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyText('');
                  }}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Nested replies */}
        {replies.map(reply => (
          <CommentComponent key={reply.id} comment={reply} depth={depth + 1} />
        ))}
      </div>
    );
  };
  
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
      
      {/* New Comment - FIXED */}
      <div className="mb-6">
        <textarea
          value={newComment}
          onChange={handleCommentChange}
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
          topLevelComments.map(comment => (
            <CommentComponent key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
}
