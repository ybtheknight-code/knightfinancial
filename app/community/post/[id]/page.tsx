import { createServerSupabaseClient } from '@/lib/supabase';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { formatRelativeTime } from '@/utils';
import PostComments from './PostComments';

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const supabase = await createServerSupabaseClient();
  
  // Check auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  
  // Get current user
  const { data: currentUser } = await supabase
    .from('user_profiles')
    .select('id, username, first_name, last_name, role, is_prime, points')
    .eq('id', user.id)
    .single();
  
  // Get post with author info
  const { data: post } = await supabase
    .from('community_posts')
    .select(`
      id, title, body, tags, likes, created_at, user_id, pinned, deleted,
      user_profiles!community_posts_user_id_fkey (
        id, username, first_name, last_name, role, is_prime, points, badges, avatar_url
      )
    `)
    .eq('id', id)
    .eq('deleted', false)
    .single();
  
  if (!post) notFound();
  
  // Get all comments with author info
  const { data: comments } = await supabase
    .from('community_comments')
    .select(`
      id, body, likes, created_at, user_id, parent_id,
      user_profiles!community_comments_user_id_fkey (
        id, username, first_name, last_name, role, is_prime, points, avatar_url
      )
    `)
    .eq('post_id', params.id)
    .eq('deleted', false)
    .order('created_at', { ascending: true });
  
  // Check if current user liked this post
  const { data: userLike } = await supabase
    .from('community_likes')
    .select('id')
    .eq('post_id', params.id)
    .eq('user_id', user.id)
    .single();
  
  const getDisplayName = (user: any) => {
    if (user?.username) return `u/${user.username}`;
    if (user?.first_name) return user.first_name;
    return 'Anonymous';
  };
  
  const getAvatar = (user: any) => {
    const initial = user?.first_name?.[0] || user?.username?.[0] || '?';
    return initial.toUpperCase();
  };
  
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

  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight max-w-4xl">
        {/* Back Link */}
        <Link href="/community" className="inline-flex items-center gap-2 text-knight-gold hover:underline mb-6">
          ← Back to Community
        </Link>
        
        {/* Main Post */}
        <Card className={`mb-8 ${post.pinned ? 'border-2 border-knight-gold' : ''}`}>
          {post.pinned && (
            <div className="text-xs text-knight-gold font-bold mb-4">📌 PINNED POST</div>
          )}
          
          {/* Author Header */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-knight-gold-dark">
            <div className="w-14 h-14 rounded-full bg-knight-gold flex items-center justify-center text-black font-bold text-2xl">
              {getAvatar(post.user_profiles)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <Link 
                  href={`/profile/${post.user_profiles?.id}`}
                  className="text-xl font-bold text-white hover:text-knight-gold"
                >
                  {getDisplayName(post.user_profiles)}
                </Link>
                <Badge type="role" role={post.user_profiles?.role as any || 'free'} />
                {post.user_profiles?.is_prime && (
                  <span className="text-xs bg-knight-gold text-black px-2 py-0.5 rounded-full font-bold">⭐ PRIME</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>{post.user_profiles?.points?.toLocaleString() || 0} points</span>
                <span>•</span>
                <span>{formatRelativeTime(post.created_at)}</span>
              </div>
            </div>
          </div>
          
          {/* Post Title */}
          <h1 className="text-3xl font-bold text-white mb-4">{post.title}</h1>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tagName: string) => {
                const tag = TAGS.find(t => t.name === tagName);
                return (
                  <span
                    key={tagName}
                    className={`text-sm font-bold px-3 py-1 rounded-full ${tag?.color || 'bg-gray-600'} text-white`}
                  >
                    {tag?.emoji} {tagName}
                  </span>
                );
              })}
            </div>
          )}
          
          {/* Post Body */}
          <div className="text-gray-200 text-lg whitespace-pre-wrap break-words mb-6">
            {post.body}
          </div>
          
          {/* Post Actions */}
          <PostComments
            postId={post.id}
            postLikes={post.likes}
            postAuthorId={post.user_id}
            currentUser={currentUser}
            initialComments={comments || []}
            userHasLiked={!!userLike}
          />
        </Card>
      </div>
    </div>
  );
}
