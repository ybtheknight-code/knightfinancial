'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { formatRelativeTime } from '@/utils';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  body: string;
  user_id: string;
  flagged: boolean;
  flagged_reason: string | null;
  created_at: string;
  user_profiles?: {
    email: string;
    first_name: string;
    last_name: string;
  };
}

interface Comment {
  id: string;
  body: string;
  user_id: string;
  post_id: string;
  flagged: boolean;
  created_at: string;
  user_profiles?: {
    email: string;
    first_name: string;
    last_name: string;
  };
}

export default function ModerationPage() {
  const [flaggedPosts, setFlaggedPosts] = useState<Post[]>([]);
  const [flaggedComments, setFlaggedComments] = useState<Comment[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'flagged' | 'all_posts' | 'all_comments'>('flagged');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const supabase = createClient();
    
    // Get current user role
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      setUserRole(profile?.role || '');
    }

    // Get flagged posts
    const { data: posts } = await supabase
      .from('community_posts')
      .select(`
        *,
        user_profiles (email, first_name, last_name)
      `)
      .eq('flagged', true)
      .eq('deleted', false)
      .order('created_at', { ascending: false });
    
    if (posts) setFlaggedPosts(posts);

    // Get flagged comments
    const { data: comments } = await supabase
      .from('community_comments')
      .select(`
        *,
        user_profiles (email, first_name, last_name)
      `)
      .eq('flagged', true)
      .eq('deleted', false)
      .order('created_at', { ascending: false });
    
    if (comments) setFlaggedComments(comments);

    // Get all posts (for "all posts" tab)
    const { data: allPostsData } = await supabase
      .from('community_posts')
      .select(`
        *,
        user_profiles (email, first_name, last_name)
      `)
      .eq('deleted', false)
      .order('created_at', { ascending: false })
      .limit(100);
    
    if (allPostsData) setAllPosts(allPostsData);

    // Get all comments
    const { data: allCommentsData } = await supabase
      .from('community_comments')
      .select(`
        *,
        user_profiles (email, first_name, last_name)
      `)
      .eq('deleted', false)
      .order('created_at', { ascending: false })
      .limit(100);
    
    if (allCommentsData) setAllComments(allCommentsData);

    setLoading(false);
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post? This will hide it from all users.')) return;
    
    setActionLoading(postId);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase
      .from('community_posts')
      .update({ 
        deleted: true, 
        deleted_by: user?.id,
        flagged: false 
      })
      .eq('id', postId);
    
    if (!error) {
      setFlaggedPosts(flaggedPosts.filter(p => p.id !== postId));
      setAllPosts(allPosts.filter(p => p.id !== postId));
      
      // Log admin action
      await supabase.from('admin_actions').insert({
        admin_id: user?.id,
        action_type: 'delete_post',
        target_id: postId,
        details: { reason: 'Moderation' },
      });
    }
    setActionLoading(null);
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    
    setActionLoading(commentId);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase
      .from('community_comments')
      .update({ 
        deleted: true,
        flagged: false 
      })
      .eq('id', commentId);
    
    if (!error) {
      setFlaggedComments(flaggedComments.filter(c => c.id !== commentId));
      setAllComments(allComments.filter(c => c.id !== commentId));
      
      // Log admin action
      await supabase.from('admin_actions').insert({
        admin_id: user?.id,
        action_type: 'delete_comment',
        target_id: commentId,
        details: { reason: 'Moderation' },
      });
    }
    setActionLoading(null);
  };

  const handleApprovePost = async (postId: string) => {
    setActionLoading(postId);
    const supabase = createClient();
    
    await supabase
      .from('community_posts')
      .update({ flagged: false, flagged_reason: null })
      .eq('id', postId);
    
    setFlaggedPosts(flaggedPosts.filter(p => p.id !== postId));
    setActionLoading(null);
  };

  const handleApproveComment = async (commentId: string) => {
    setActionLoading(commentId);
    const supabase = createClient();
    
    await supabase
      .from('community_comments')
      .update({ flagged: false })
      .eq('id', commentId);
    
    setFlaggedComments(flaggedComments.filter(c => c.id !== commentId));
    setActionLoading(null);
  };

  // Check if user has moderation access
  const canModerate = ['admin', 'executive', 'ceo'].includes(userRole);

  if (loading) {
    return (
      <div className="min-h-screen bg-knight-black py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-pulse mb-4">🚨</div>
          <p className="text-knight-gold">Loading moderation queue...</p>
        </div>
      </div>
    );
  }

  if (!canModerate) {
    return (
      <div className="min-h-screen bg-knight-black py-8">
        <div className="container-knight">
          <Card className="text-center py-16">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-red-400 mb-2">Access Denied</h2>
            <p className="text-gray-400">You don't have permission to access moderation.</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">🚨 Moderation Center</h1>
          <p className="text-gray-400">Review and manage community content</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center py-4">
            <div className="text-3xl font-bold text-red-400">{flaggedPosts.length}</div>
            <div className="text-xs text-gray-400">Flagged Posts</div>
          </Card>
          <Card className="text-center py-4">
            <div className="text-3xl font-bold text-orange-400">{flaggedComments.length}</div>
            <div className="text-xs text-gray-400">Flagged Comments</div>
          </Card>
          <Card className="text-center py-4">
            <div className="text-3xl font-bold text-blue-400">{allPosts.length}</div>
            <div className="text-xs text-gray-400">Total Posts</div>
          </Card>
          <Card className="text-center py-4">
            <div className="text-3xl font-bold text-green-400">{allComments.length}</div>
            <div className="text-xs text-gray-400">Total Comments</div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('flagged')}
            className={`px-4 py-2 rounded-lg font-bold transition ${
              activeTab === 'flagged'
                ? 'bg-red-600 text-white'
                : 'bg-knight-hover text-gray-400 hover:text-white'
            }`}
          >
            🚨 Flagged ({flaggedPosts.length + flaggedComments.length})
          </button>
          <button
            onClick={() => setActiveTab('all_posts')}
            className={`px-4 py-2 rounded-lg font-bold transition ${
              activeTab === 'all_posts'
                ? 'bg-blue-600 text-white'
                : 'bg-knight-hover text-gray-400 hover:text-white'
            }`}
          >
            📰 All Posts ({allPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('all_comments')}
            className={`px-4 py-2 rounded-lg font-bold transition ${
              activeTab === 'all_comments'
                ? 'bg-green-600 text-white'
                : 'bg-knight-hover text-gray-400 hover:text-white'
            }`}
          >
            💬 All Comments ({allComments.length})
          </button>
        </div>

        {/* Flagged Content Tab */}
        {activeTab === 'flagged' && (
          <div className="space-y-6">
            {flaggedPosts.length === 0 && flaggedComments.length === 0 ? (
              <Card className="text-center py-16">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">All Clear!</h3>
                <p className="text-gray-400">No flagged content needs review.</p>
              </Card>
            ) : (
              <>
                {/* Flagged Posts */}
                {flaggedPosts.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-red-400 mb-4">Flagged Posts</h2>
                    <div className="space-y-4">
                      {flaggedPosts.map((post) => (
                        <Card key={post.id} className="border-2 border-red-500/30">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <h3 className="font-bold text-white mb-1">{post.title}</h3>
                              <p className="text-gray-400 text-sm mb-2 line-clamp-3">{post.body}</p>
                              <p className="text-xs text-gray-500">
                                By: {post.user_profiles?.first_name} {post.user_profiles?.last_name} ({post.user_profiles?.email})
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatRelativeTime(post.created_at)}
                                {post.flagged_reason && ` • Reason: ${post.flagged_reason}`}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="danger"
                                loading={actionLoading === post.id}
                                onClick={() => handleDeletePost(post.id)}
                              >
                                🗑️ Delete
                              </Button>
                              <Button 
                                size="sm" 
                                variant="gold-outline"
                                onClick={() => handleApprovePost(post.id)}
                              >
                                ✓ Approve
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Flagged Comments */}
                {flaggedComments.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-orange-400 mb-4">Flagged Comments</h2>
                    <div className="space-y-4">
                      {flaggedComments.map((comment) => (
                        <Card key={comment.id} className="border-2 border-orange-500/30">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <p className="text-gray-300 mb-2">{comment.body}</p>
                              <p className="text-xs text-gray-500">
                                By: {comment.user_profiles?.first_name} {comment.user_profiles?.last_name}
                                {' • '}{formatRelativeTime(comment.created_at)}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="danger"
                                loading={actionLoading === comment.id}
                                onClick={() => handleDeleteComment(comment.id)}
                              >
                                🗑️ Delete
                              </Button>
                              <Button 
                                size="sm" 
                                variant="gold-outline"
                                onClick={() => handleApproveComment(comment.id)}
                              >
                                ✓ Approve
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* All Posts Tab */}
        {activeTab === 'all_posts' && (
          <div className="space-y-4">
            {allPosts.map((post) => (
              <Card key={post.id} hover>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">{post.title}</h3>
                    <p className="text-gray-400 text-sm mb-2 line-clamp-2">{post.body}</p>
                    <p className="text-xs text-gray-500">
                      By: {post.user_profiles?.email} • {formatRelativeTime(post.created_at)}
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="danger"
                    loading={actionLoading === post.id}
                    onClick={() => handleDeletePost(post.id)}
                  >
                    🗑️ Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* All Comments Tab */}
        {activeTab === 'all_comments' && (
          <div className="space-y-4">
            {allComments.map((comment) => (
              <Card key={comment.id} hover>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-gray-300 mb-2">{comment.body}</p>
                    <p className="text-xs text-gray-500">
                      By: {comment.user_profiles?.email} • {formatRelativeTime(comment.created_at)}
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="danger"
                    loading={actionLoading === comment.id}
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    🗑️ Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link href="/admin">
            <Button variant="gold-outline">← Back to Admin Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
