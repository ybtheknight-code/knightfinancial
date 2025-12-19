import { createServerSupabaseClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/Card';
import Badge from '@/components/Badge';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function LeaderboardPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/login');
  
  // Get current user profile
  const { data: currentProfile } = await supabase
    .from('user_profiles')
    .select('id, points')
    .eq('id', user.id)
    .single();
  
  // Get top 100 users by points
  const { data: leaderboard } = await supabase
    .from('user_profiles')
    .select('id, username, first_name, last_name, points, role, is_prime, badges, avatar_url, streak_count, disputes_generated, forms_completed')
    .order('points', { ascending: false })
    .limit(100);
  
  // Find current user's rank
  const currentRank = leaderboard?.findIndex(u => u.id === user.id) ?? -1;
  const userRank = currentRank >= 0 ? currentRank + 1 : null;
  
  const getDisplayName = (user: any) => {
    if (user.username) return `u/${user.username}`;
    if (user.first_name) return `${user.first_name} ${user.last_name?.[0] || ''}`.trim();
    return 'Anonymous Knight';
  };
  
  const getAvatar = (user: any) => {
    return user.first_name?.[0]?.toUpperCase() || user.username?.[0]?.toUpperCase() || '?';
  };
  
  const getRankBadge = (rank: number) => {
    if (rank === 1) return { icon: '🥇', color: 'bg-yellow-500' };
    if (rank === 2) return { icon: '🥈', color: 'bg-gray-400' };
    if (rank === 3) return { icon: '🥉', color: 'bg-orange-600' };
    if (rank <= 10) return { icon: '🏆', color: 'bg-knight-gold' };
    if (rank <= 25) return { icon: '⭐', color: 'bg-purple-600' };
    if (rank <= 50) return { icon: '💎', color: 'bg-blue-600' };
    return { icon: '⚔️', color: 'bg-knight-hover' };
  };
  
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-4">🏆 Leaderboard</h1>
          <p className="text-gray-400">Top Credit Warriors Ranked by Points</p>
        </div>
        
        {/* Current User Rank Card */}
        {userRank && (
          <Card className="mb-8 border-2 border-knight-gold">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-knight-gold">#{userRank}</div>
                <div>
                  <div className="text-white font-bold">Your Rank</div>
                  <div className="text-gray-400 text-sm">{currentProfile?.points?.toLocaleString()} points</div>
                </div>
              </div>
              {userRank > 1 && (
                <div className="text-right">
                  <div className="text-gray-400 text-sm">Points to next rank:</div>
                  <div className="text-knight-gold font-bold">
                    {((leaderboard?.[userRank - 2]?.points || 0) - (currentProfile?.points || 0)).toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}
        
        {/* Leaderboard Table */}
        <Card>
          <div className="space-y-2">
            {leaderboard?.map((warrior, index) => {
              const rank = index + 1;
              const rankBadge = getRankBadge(rank);
              const isCurrentUser = warrior.id === user.id;
              
              return (
                <div
                  key={warrior.id}
                  className={`flex items-center gap-4 p-4 rounded-lg transition ${
                    isCurrentUser 
                      ? 'bg-knight-gold/20 border border-knight-gold' 
                      : 'bg-knight-hover hover:bg-knight-gold-dark'
                  }`}
                >
                  {/* Rank */}
                  <div className={`w-12 h-12 ${rankBadge.color} rounded-full flex items-center justify-center font-bold text-white`}>
                    {rank <= 3 ? rankBadge.icon : rank}
                  </div>
                  
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    warrior.is_prime 
                      ? 'bg-gradient-to-r from-knight-gold to-yellow-500 text-black' 
                      : 'bg-knight-gold-dark text-white'
                  }`}>
                    {getAvatar(warrior)}
                  </div>
                  
                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link 
                        href={`/profile/${warrior.id}`}
                        className="text-white font-bold hover:text-knight-gold transition"
                      >
                        {getDisplayName(warrior)}
                      </Link>
                      <Badge type="role" role={warrior.role} />
                      {warrior.is_prime && (
                        <span className="text-xs bg-knight-gold text-black px-2 py-0.5 rounded-full font-bold">
                          ⭐ PRIME
                        </span>
                      )}
                    </div>
                    <div className="text-gray-500 text-xs mt-1 flex items-center gap-3">
                      <span>🔥 {warrior.streak_count || 0} day streak</span>
                      <span>⚔️ {warrior.disputes_generated || 0} disputes</span>
                      <span>📝 {warrior.forms_completed || 0} forms</span>
                    </div>
                  </div>
                  
                  {/* Points */}
                  <div className="text-right">
                    <div className="text-knight-gold font-bold text-lg">
                      {warrior.points?.toLocaleString() || 0}
                    </div>
                    <div className="text-gray-500 text-xs">points</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
        
        {/* How to Earn Points */}
        <Card className="mt-8">
          <h2 className="text-xl font-bold text-white mb-4">💡 How to Climb the Ranks</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-knight-hover rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">📝</div>
              <div className="text-knight-gold font-bold">+25-50 pts</div>
              <div className="text-gray-400 text-sm">Complete Forms</div>
            </div>
            <div className="bg-knight-hover rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">⚔️</div>
              <div className="text-knight-gold font-bold">+20 pts</div>
              <div className="text-gray-400 text-sm">Generate Disputes</div>
            </div>
            <div className="bg-knight-hover rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">📚</div>
              <div className="text-knight-gold font-bold">+25-100 pts</div>
              <div className="text-gray-400 text-sm">Complete Courses</div>
            </div>
            <div className="bg-knight-hover rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">💬</div>
              <div className="text-knight-gold font-bold">+10 pts</div>
              <div className="text-gray-400 text-sm">Post in Community</div>
            </div>
            <div className="bg-knight-hover rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-knight-gold font-bold">+5 pts/day</div>
              <div className="text-gray-400 text-sm">Daily Login Streak</div>
            </div>
            <div className="bg-knight-hover rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-knight-gold font-bold">+100 pts</div>
              <div className="text-gray-400 text-sm">Report a Victory</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <Link href="/points-guide" className="text-knight-gold hover:underline">
              View Complete Points Guide →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
