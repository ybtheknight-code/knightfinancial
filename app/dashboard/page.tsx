import { requireAuth } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import Link from 'next/link';
import { formatPoints, formatRelativeTime } from '@/utils';

export default async function DashboardPage() {
  const user = await requireAuth();
  const supabase = await createServerSupabaseClient();
  
  // Get user stats
  const { data: stats } = await supabase.rpc('get_user_stats', { p_user_id: user.id }).single() as { data: { rank: number; streak: number; badges_earned: number } | null };
  
  // Get recent activity
  const { data: recentPosts } = await supabase
    .from('community_posts')
    .select('id, title, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(3);
  
  const { data: recentDisputes } = await supabase
    .from('dispute_tracking')
    .select('id, bureau, date_filed, status, deadline')
    .eq('user_id', user.id)
    .order('date_filed', { ascending: false })
    .limit(5);
  
  // Get unread messages
  const { count: unreadCount } = await supabase
    .from('user_messages')
    .select('*', { count: 'exact', head: true })
    .eq('to_user_id', user.id)
    .eq('read', false);
  
  // Admin/Executive/CEO stats
  let adminStats = null;
  if (['admin', 'executive', 'ceo'].includes(user.role)) {
    const { count: totalUsers } = await supabase
      .from('user_profiles')
      .select('*', { count: 'exact', head: true });
    
    const { count: primeUsers } = await supabase
      .from('user_profiles')
      .select('*', { count: 'exact', head: true })
      .eq('is_prime', true);
    
    const { count: pendingMod } = await supabase
      .from('moderation_queue')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');
    
    adminStats = { totalUsers, primeUsers, pendingMod };
  }
  
  const isPrime = user.is_prime || ['admin', 'executive', 'ceo'].includes(user.role);
  
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gradient-gold mb-2">
                Welcome back, {user.first_name || 'Knight'}!
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge type="role" role={user.role} />
                {user.points > 0 && <Badge type="points" points={user.points} />}
                {user.badges && user.badges.length > 0 && (
                  <>
                    {user.badges.slice(0, 3).map((badge) => (
                      <Badge key={badge} type="achievement" badgeType={badge} />
                    ))}
                    {user.badges.length > 3 && (
                      <span className="text-gray-400 text-sm">+{user.badges.length - 3} more</span>
                    )}
                  </>
                )}
              </div>
            </div>
            
            {!isPrime && (
              <Button href="/pricing" size="lg" className="shimmer">
                ⭐ Upgrade to Prime
              </Button>
            )}
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card hover>
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-knight-gold">{formatPoints(user.points)}</div>
            <div className="text-sm text-gray-400">Total Points</div>
            {stats ? (
              <div className="text-xs text-gray-500 mt-1">Rank #{stats.rank}</div>
            ) : null}
          </Card>
          
          <Card hover>
            <div className="text-3xl mb-2">📚</div>
            <div className="text-2xl font-bold text-knight-gold">{(stats as any)?.courses_completed || 0}</div>
            <div className="text-sm text-gray-400">Courses Completed</div>
          </Card>
          
          <Card hover>
            <div className="text-3xl mb-2">✍️</div>
            <div className="text-2xl font-bold text-knight-gold">{(stats as any)?.disputes_generated || 0}</div>
            <div className="text-sm text-gray-400">Disputes Generated</div>
          </Card>
          
          <Card hover>
            <div className="text-3xl mb-2">💬</div>
            <div className="text-2xl font-bold text-knight-gold">{stats?.posts_created || 0}</div>
            <div className="text-sm text-gray-400">Community Posts</div>
            {unreadCount && unreadCount > 0 && (
              <div className="text-xs text-yellow-400 mt-1">{unreadCount} new messages</div>
            )}
          </Card>
        </div>
        
        {/* Admin Stats */}
        {adminStats && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-knight-gold mb-4">Platform Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <div className="text-3xl mb-2">👥</div>
                <div className="text-2xl font-bold text-knight-gold">{adminStats.totalUsers?.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Users</div>
              </Card>
              
              <Card>
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-knight-gold">{adminStats.primeUsers?.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Prime Members</div>
              </Card>
              
              <Card hover>
                <div className="text-3xl mb-2">🚨</div>
                <div className="text-2xl font-bold text-knight-gold">{adminStats.pendingMod}</div>
                <div className="text-sm text-gray-400">Pending Moderation</div>
                {adminStats.pendingMod > 0 && (
                  <Link href="/admin/moderation" className="text-xs link-knight mt-2 block">
                    Review now →
                  </Link>
                )}
              </Card>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Knight Tools */}
            <Card>
              <h2 className="text-2xl font-bold text-knight-gold mb-4">Knight Tools</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/tools/scanner" className="card-knight p-4 hover:scale-105 transition">
                  <div className="text-2xl mb-2">🔍</div>
                  <div className="font-bold text-white">Scanner</div>
                  <div className="text-xs text-gray-400">Analyze reports</div>
                </Link>
                
                <Link href="/tools/dispute" className="card-knight p-4 hover:scale-105 transition">
                  <div className="text-2xl mb-2">✍️</div>
                  <div className="font-bold text-white">Dispute</div>
                  <div className="text-xs text-gray-400">Generate letters</div>
                </Link>
                
                <Link href="/tools/tracker" className="card-knight p-4 hover:scale-105 transition">
                  <div className="text-2xl mb-2">📅</div>
                  <div className="font-bold text-white">Tracker</div>
                  <div className="text-xs text-gray-400">Track deadlines</div>
                </Link>
                
                <Link href="/tools/decoder" className="card-knight p-4 hover:scale-105 transition">
                  <div className="text-2xl mb-2">🔓</div>
                  <div className="font-bold text-white">Decoder</div>
                  <div className="text-xs text-gray-400">Translate responses</div>
                </Link>
                
                <Link href="/tools/vault" className="card-knight p-4 hover:scale-105 transition">
                  <div className="text-2xl mb-2">🗄️</div>
                  <div className="font-bold text-white">Vault</div>
                  <div className="text-xs text-gray-400">Store documents</div>
                </Link>
                
                <Link href="/community" className="card-knight p-4 hover:scale-105 transition">
                  <div className="text-2xl mb-2">👥</div>
                  <div className="font-bold text-white">Community</div>
                  <div className="text-xs text-gray-400">Connect & share</div>
                </Link>
              </div>
            </Card>
            
            {/* Recent Disputes */}
            {recentDisputes && recentDisputes.length > 0 && (
              <Card>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-knight-gold">Recent Disputes</h2>
                  <Link href="/tools/tracker" className="link-knight text-sm">
                    View All →
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentDisputes.map((dispute) => (
                    <div key={dispute.id} className="bg-knight-hover p-4 rounded border border-knight-gold-dark">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-white">{dispute.bureau}</div>
                          <div className="text-sm text-gray-400">
                            Filed {formatRelativeTime(dispute.date_filed)}
                          </div>
                        </div>
                        <div className={`text-xs font-bold px-2 py-1 rounded ${
                          dispute.status === 'pending' ? 'bg-yellow-600' :
                          dispute.status === 'resolved' ? 'bg-green-600' :
                          'bg-gray-600'
                        }`}>
                          {dispute.status.toUpperCase()}
                        </div>
                      </div>
                      {dispute.deadline && (
                        <div className="text-xs text-gray-500 mt-2">
                          Deadline: {new Date(dispute.deadline).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}
            
            {/* Recent Community Posts */}
            {recentPosts && recentPosts.length > 0 && (
              <Card>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-knight-gold">Your Recent Posts</h2>
                  <Link href="/community" className="link-knight text-sm">
                    View All →
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentPosts.map((post) => (
                    <Link 
                      key={post.id} 
                      href={`/community/post/${post.id}`}
                      className="block bg-knight-hover p-4 rounded border border-knight-gold-dark hover:border-knight-gold transition"
                    >
                      <div className="font-bold text-white mb-1">{post.title}</div>
                      <div className="text-sm text-gray-400">
                        {formatRelativeTime(post.created_at)}
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <h2 className="text-xl font-bold text-knight-gold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Button href="/tools/scanner" variant="gold-outline" fullWidth>
                  🔍 Scan Credit Report
                </Button>
                <Button href="/tools/dispute" variant="gold-outline" fullWidth>
                  ✍️ Generate Dispute
                </Button>
                <Button href="/academy" variant="gold-outline" fullWidth>
                  📚 Browse Courses
                </Button>
                <Button href="/community" variant="gold-outline" fullWidth>
                  👥 Join Discussion
                </Button>
              </div>
            </Card>
            
            {/* Streak */}
            {user.streak_count > 0 && (
              <Card>
                <div className="text-center">
                  <div className="text-5xl mb-2">🔥</div>
                  <div className="text-3xl font-bold text-knight-gold">{user.streak_count}</div>
                  <div className="text-sm text-gray-400">Day Streak</div>
                  <div className="text-xs text-gray-500 mt-2">
                    Keep it going! Login daily to maintain your streak
                  </div>
                </div>
              </Card>
            )}
            
            {/* Progress */}
            <Card>
              <h2 className="text-xl font-bold text-knight-gold mb-4">Your Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Forms Completed</span>
                    <span className="text-white">{user.forms_completed}/30</span>
                  </div>
                  <div className="w-full bg-knight-hover rounded-full h-2">
                    <div 
                      className="bg-knight-gold h-2 rounded-full transition-all"
                      style={{ width: `${(user.forms_completed / 30) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Courses Completed</span>
                    <span className="text-white">{stats?.courses_completed || 0}/100</span>
                  </div>
                  <div className="w-full bg-knight-hover rounded-full h-2">
                    <div 
                      className="bg-knight-gold h-2 rounded-full transition-all"
                      style={{ width: `${((stats?.courses_completed || 0) / 100) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
            
            {/* CEO Contact */}
            <Card className="text-center">
              <div className="text-4xl mb-2">💎</div>
              <h3 className="font-bold text-knight-gold mb-2">Text the CEO</h3>
              <p className="text-sm text-gray-400 mb-4">
                Only major US company where you can text the CEO directly
              </p>
              <a 
                href="sms:3349389171" 
                className="btn-gold text-sm py-2 px-4 inline-block"
              >
                📱 Text Raheem Sanders
              </a>
              <p className="text-xs text-gray-500 mt-2">334-938-9171</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
