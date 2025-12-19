import { createServerSupabaseClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import CommunityFeed from './CommunityFeed';

export default async function CommunityPage() {
  const supabase = await createServerSupabaseClient();
  
  // Check auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  
  // Get current user profile
  const { data: currentUser } = await supabase
    .from('user_profiles')
    .select('id, username, first_name, last_name, role, is_prime, points, badges, avatar_url')
    .eq('id', user.id)
    .single();
  
  // Get posts with user info and comment count
  const { data: posts } = await supabase
    .from('community_posts')
    .select(`
      id, title, body, tags, likes, created_at, user_id, pinned, deleted,
      user_profiles!community_posts_user_id_fkey (
        id, username, first_name, last_name, role, is_prime, points, badges, avatar_url
      )
    `)
    .eq('deleted', false)
    .order('pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(50);
  
  // Get comment counts for each post
  const postIds = posts?.map(p => p.id) || [];
  const { data: commentCounts } = await supabase
    .from('community_comments')
    .select('post_id')
    .in('post_id', postIds)
    .eq('deleted', false);
  
  // Count comments per post
  const commentCountMap: Record<string, number> = {};
  commentCounts?.forEach(c => {
    commentCountMap[c.post_id] = (commentCountMap[c.post_id] || 0) + 1;
  });
  
  // Add comment counts to posts
  const postsWithCounts = posts?.map(p => ({
    ...p,
    comment_count: commentCountMap[p.id] || 0,
  })) || [];
  
  // Get top 3 comments for each post (preview)
  const { data: topComments } = await supabase
    .from('community_comments')
    .select(`
      id, post_id, body, created_at, likes,
      user_profiles!community_comments_user_id_fkey (
        username, first_name, role, is_prime, points
      )
    `)
    .in('post_id', postIds)
    .eq('deleted', false)
    .order('likes', { ascending: false })
    .limit(100);
  
  // Group comments by post
  const commentsMap: Record<string, any[]> = {};
  topComments?.forEach(c => {
    if (!commentsMap[c.post_id]) commentsMap[c.post_id] = [];
    if (commentsMap[c.post_id].length < 2) {
      commentsMap[c.post_id].push(c);
    }
  });
  
  // Get trending posts (most likes in last 7 days)
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data: trending } = await supabase
    .from('community_posts')
    .select('id, title, likes')
    .eq('deleted', false)
    .gte('created_at', weekAgo)
    .order('likes', { ascending: false })
    .limit(5);
  
  // Get top warriors (leaderboard)
  const { data: topWarriors } = await supabase
    .from('user_profiles')
    .select('id, username, first_name, points, role, is_prime, badges')
    .order('points', { ascending: false })
    .limit(10);
  
  // Get community stats
  const { count: totalPosts } = await supabase
    .from('community_posts')
    .select('*', { count: 'exact', head: true })
    .eq('deleted', false);
  
  const { count: totalComments } = await supabase
    .from('community_comments')
    .select('*', { count: 'exact', head: true })
    .eq('deleted', false);
  
  const { count: totalWarriors } = await supabase
    .from('user_profiles')
    .select('*', { count: 'exact', head: true });

  return (
    <CommunityFeed
      currentUser={currentUser}
      initialPosts={postsWithCounts}
      commentsMap={commentsMap}
      trending={trending || []}
      topWarriors={topWarriors || []}
      stats={{
        totalPosts: totalPosts || 0,
        totalComments: totalComments || 0,
        totalWarriors: totalWarriors || 0,
      }}
    />
  );
}
