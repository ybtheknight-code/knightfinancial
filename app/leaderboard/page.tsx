import { createServerSupabaseClient } from '@/lib/supabase';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import Link from 'next/link';
import { formatPoints } from '@/utils';

export default async function LeaderboardPage() {
  const supabase = await createServerSupabaseClient();
  
  // Get top 100 users by points
  const { data: topUsers } = await supabase
    .from('user_profiles')
    .select('id, username, first_name, last_name, points, role, is_prime, badges, streak_count, forms_completed, disputes_generated')
    .order('points', { ascending: false })
    .limit(100);
  
  // Get total user count
  const { count: totalUsers } = await supabase
    .from('user_profiles')
    .select('*', { count: 'exact', head: true });
  
  // Get total points in system
  const { data: pointsData } = await supabase
    .from('user_profiles')
    .select('points');
  
  const totalPoints = pointsData?.reduce((sum, u) => sum + (u.points || 0), 0) || 0;
  
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight">
        <div className="mb-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">Knight Leaderboard</h1>
          <p className="text-gray-400">Top credit warriors ranked by points</p>
          <div className="mt-4 flex gap-3 justify-center flex-wrap">
            <div className="badge-gold">{totalUsers?.toLocaleString()} Warriors</div>
            <div className="badge-gold">{totalPoints.toLocaleString()} Total Points</div>
          </div>
        </div>
        
        {/* Top 3 Podium */}
        {topUsers && topUsers.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
            {/* 2nd Place */}
            <div className="mt-8">
              <Card className="text-center">
                <div className="text-4xl mb-2">🥈</div>
                <div className="text-3xl font-bold text-knight-silver mb-2">2nd</div>
                <div className="w-16 h-16 mx-auto rounded-full bg-knight-silver flex items-center justify-center text-2xl font-bold text-black mb-2">
                  {topUsers[1].first_name?.[0] || '?'}
                </div>
                <div className="font-bold text-white">{topUsers[1].username || `${topUsers[1].first_name}`}</div>
                <div className="text-knight-gold font-bold text-lg">{formatPoints(topUsers[1].points)}</div>
                <Badge type="role" role={topUsers[1].role} className="mt-2" />
              </Card>
            </div>
            
            {/* 1st Place */}
            <div>
              <Card premium className="text-center">
                <div className="text-5xl mb-2">👑</div>
                <div className="text-4xl font-bold text-gradient-gold mb-2">1st</div>
                <div className="w-20 h-20 mx-auto rounded-full bg-knight-gold flex items-center justify-center text-3xl font-bold text-black mb-2">
                  {topUsers[0].first_name?.[0] || '?'}
                </div>
                <div className="font-bold text-white text-lg">{topUsers[0].username || `${topUsers[0].first_name}`}</div>
                <div className="text-knight-gold font-bold text-2xl">{formatPoints(topUsers[0].points)}</div>
                <Badge type="role" role={topUsers[0].role} className="mt-2" />
                {topUsers[0].streak_count > 0 && (
                  <div className="text-sm text-gray-400 mt-2">🔥 {topUsers[0].streak_count} day streak</div>
                )}
              </Card>
            </div>
            
            {/* 3rd Place */}
            <div className="mt-8">
              <Card className="text-center">
                <div className="text-4xl mb-2">🥉</div>
                <div className="text-3xl font-bold text-knight-bronze mb-2">3rd</div>
                <div className="w-16 h-16 mx-auto rounded-full bg-knight-bronze flex items-center justify-center text-2xl font-bold text-white mb-2">
                  {topUsers[2].first_name?.[0] || '?'}
                </div>
                <div className="font-bold text-white">{topUsers[2].username || `${topUsers[2].first_name}`}</div>
                <div className="text-knight-gold font-bold text-lg">{formatPoints(topUsers[2].points)}</div>
                <Badge type="role" role={topUsers[2].role} className="mt-2" />
              </Card>
            </div>
          </div>
        )}
        
        {/* Full Leaderboard */}
        <Card>
          <h2 className="text-2xl font-bold text-knight-gold mb-6">Top 100 Warriors</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 border-b border-knight-gold-dark">
                  <th className="pb-3 w-16">Rank</th>
                  <th className="pb-3">Warrior</th>
                  <th className="pb-3 text-right">Points</th>
                  <th className="pb-3 text-right hidden md:table-cell">Streak</th>
                  <th className="pb-3 text-right hidden lg:table-cell">Forms</th>
                  <th className="pb-3 text-right hidden lg:table-cell">Disputes</th>
                </tr>
              </thead>
              <tbody>
                {topUsers?.map((user, index) => (
                  <tr 
                    key={user.id} 
                    className={`border-b border-knight-gold-dark/30 ${
                      index < 3 ? 'bg-knight-gold/5' : ''
                    }`}
                  >
                    <td className="py-4">
                      <span className={`text-xl font-bold ${
                        index === 0 ? 'text-knight-gold' :
                        index === 1 ? 'text-knight-silver' :
                        index === 2 ? 'text-knight-bronze' :
                        'text-gray-400'
                      }`}>
                        {index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                          user.is_prime ? 'bg-knight-gold text-black' : 'bg-knight-hover text-white'
                        }`}>
                          {user.first_name?.[0] || '?'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">
                              {user.username || `${user.first_name} ${user.last_name?.[0] || ''}.`}
                            </span>
                            <Badge type="role" role={user.role} />
                          </div>
                          {user.badges && user.badges.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {user.badges.slice(0, 3).map((badge: string) => (
                                <Badge key={badge} type="achievement" badgeType={badge as any} />
                              ))}
                              {user.badges.length > 3 && (
                                <span className="text-xs text-gray-500">+{user.badges.length - 3}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <span className="text-knight-gold font-bold text-lg">
                        {formatPoints(user.points)}
                      </span>
                    </td>
                    <td className="py-4 text-right hidden md:table-cell">
                      {user.streak_count > 0 ? (
                        <span className="text-orange-400">🔥 {user.streak_count}</span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="py-4 text-right hidden lg:table-cell text-gray-400">
                      {user.forms_completed || 0}
                    </td>
                    <td className="py-4 text-right hidden lg:table-cell text-gray-400">
                      {user.disputes_generated || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {(!topUsers || topUsers.length === 0) && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-knight-gold mb-2">No Warriors Yet</h3>
              <p className="text-gray-400 mb-6">Be the first to claim your spot!</p>
              <Link href="/register" className="btn-gold">
                Join Knight Financial
              </Link>
            </div>
          )}
        </Card>
        
        {/* How to Earn Points */}
        <Card className="mt-8">
          <h2 className="text-2xl font-bold text-knight-gold mb-4">📈 How to Climb the Ranks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-white mb-2">🔥 Daily Actions</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Login daily: +5 pts</li>
                <li>• Streak bonus: +10 pts</li>
                <li>• Complete profile: +25 pts</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">📋 Forms & Tools</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Complete forms: 15-200 pts</li>
                <li>• Scan report: +25 pts</li>
                <li>• Generate dispute: +15 pts</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">🏆 Milestones</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Items deleted: +50 pts</li>
                <li>• Victory: +100 pts</li>
                <li>• Lawsuit won: +300 pts</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link href="/points-guide" className="link-knight">
              View Full Points Guide →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
