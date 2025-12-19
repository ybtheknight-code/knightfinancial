import { createServerSupabaseClient } from '@/lib/supabase';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/Card';
import Badge from '@/components/Badge';

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/login');
  
  // Get profile being viewed
  const { data: profile, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', params.id)
    .single();
  
  if (error || !profile) {
    notFound();
  }
  
  const isOwnProfile = user.id === params.id;
  
  // Get user's posts
  const { data: posts } = await supabase
    .from('community_posts')
    .select('id, title, likes, created_at, category')
    .eq('user_id', params.id)
    .order('created_at', { ascending: false })
    .limit(5);
  
  // Get user's rank
  const { data: allUsers } = await supabase
    .from('user_profiles')
    .select('id, points')
    .order('points', { ascending: false });
  
  const rank = allUsers?.findIndex(u => u.id === params.id) ?? -1;
  const userRank = rank >= 0 ? rank + 1 : null;
  
  const getDisplayName = () => {
    if (profile.username) return `u/${profile.username}`;
    if (profile.first_name) return `${profile.first_name} ${profile.last_name || ''}`.trim();
    return 'Anonymous Knight';
  };
  
  const getAvatar = () => {
    return profile.first_name?.[0]?.toUpperCase() || profile.username?.[0]?.toUpperCase() || '?';
  };
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold ${
              profile.is_prime 
                ? 'bg-gradient-to-r from-knight-gold to-yellow-500 text-black' 
                : 'bg-knight-gold-dark text-white'
            }`}>
              {getAvatar()}
            </div>
            
            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{getDisplayName()}</h1>
                <Badge type="role" role={profile.role} />
                {profile.is_prime && (
                  <span className="bg-gradient-to-r from-knight-gold to-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                    ⭐ PRIME
                  </span>
                )}
              </div>
              
              {profile.bio && (
                <p className="text-gray-400 mb-4">{profile.bio}</p>
              )}
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
                <span>📅 Joined {formatDate(profile.created_at)}</span>
                {userRank && <span>🏆 Rank #{userRank}</span>}
                <span>🔥 {profile.streak_count || 0} day streak</span>
              </div>
            </div>
            
            {/* Edit Button */}
            {isOwnProfile && (
              <Link href="/settings" className="btn-knight-outline">
                ⚙️ Edit Profile
              </Link>
            )}
          </div>
        </Card>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <div className="text-3xl font-bold text-knight-gold">{profile.points?.toLocaleString() || 0}</div>
            <div className="text-gray-400 text-sm">Points</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-green-400">{profile.disputes_generated || 0}</div>
            <div className="text-gray-400 text-sm">Disputes</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-blue-400">{profile.courses_completed || 0}</div>
            <div className="text-gray-400 text-sm">Courses</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-purple-400">{profile.forms_completed || 0}</div>
            <div className="text-gray-400 text-sm">Forms</div>
          </Card>
        </div>
        
        {/* Badges */}
        {profile.badges && profile.badges.length > 0 && (
          <Card className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">🎖️ Badges</h2>
            <div className="flex flex-wrap gap-3">
              {profile.badges.map((badge: string, i: number) => (
                <span key={i} className="bg-knight-hover px-4 py-2 rounded-full text-white">
                  {badge}
                </span>
              ))}
            </div>
          </Card>
        )}
        
        {/* Recent Activity */}
        <Card>
          <h2 className="text-xl font-bold text-white mb-4">📝 Recent Posts</h2>
          {posts && posts.length > 0 ? (
            <div className="space-y-3">
              {posts.map((post) => (
                <Link 
                  key={post.id} 
                  href={`/community/post/${post.id}`}
                  className="block bg-knight-hover rounded-lg p-4 hover:bg-knight-gold-dark transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-bold">{post.title}</h3>
                      <span className="text-gray-500 text-sm">{post.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-knight-gold">❤️ {post.likes}</div>
                      <div className="text-gray-500 text-xs">{formatDate(post.created_at)}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">No posts yet</p>
          )}
          
          {posts && posts.length > 0 && (
            <div className="text-center mt-4">
              <Link href={`/community?author=${params.id}`} className="text-knight-gold hover:underline">
                View all posts →
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
