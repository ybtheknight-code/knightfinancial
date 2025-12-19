import { requireAuth } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { formatPoints, formatRelativeTime, formatBytes } from '@/utils';

export default async function ProfilePage() {
  const user = await requireAuth();
  const supabase = await createServerSupabaseClient();
  
  // Get stats
  const { data: stats } = await supabase.rpc('get_user_stats', { p_user_id: user.id }).single();
  
  // Get storage usage
  const { data: storage } = await supabase
    .from('storage_usage')
    .select('*')
    .eq('user_id', user.id)
    .single();
  
  // Get recent activity
  const { data: recentPoints } = await supabase
    .from('points_history')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10);
  
  const isPrime = user.is_prime || ['admin', 'executive', 'ceo'].includes(user.role);
  
  // Prime visual upgrades
  const containerClass = isPrime ? 'animate-fade-in' : '';
  const cardClass = isPrime ? 'shadow-gold-lg' : '';
  
  return (
    <div className={`min-h-screen bg-knight-black py-8 ${containerClass}`}>
      <div className="container-knight max-w-6xl">
        {/* Header with Prime styling */}
        <div className={`mb-8 ${isPrime ? 'relative' : ''}`}>
          {isPrime && (
            <div className="absolute inset-0 bg-gold-gradient opacity-5 rounded-lg blur-xl"></div>
          )}
          <div className="relative">
            <div className="flex items-start gap-6 flex-col md:flex-row">
              <div className={`w-32 h-32 rounded-full bg-knight-gold flex items-center justify-center text-6xl font-bold text-black ${isPrime ? 'shadow-gold-lg' : ''}`}>
                {user.first_name?.[0] || user.email[0].toUpperCase()}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className={`text-4xl font-bold ${isPrime ? 'text-gradient-gold' : 'text-white'}`}>
                    {user.first_name} {user.last_name}
                  </h1>
                  <Badge type="role" role={user.role} />
                </div>
                
                <p className="text-gray-400 mb-3">{user.username}</p>
                
                <div className="flex items-center gap-4 flex-wrap">
                  <Badge type="points" points={user.points} />
                  
                  {user.streak_count > 0 && (
                    <div className="flex items-center gap-2 bg-knight-hover px-3 py-1 rounded-full">
                      <span>🔥</span>
                      <span className="text-white font-bold">{user.streak_count} day streak</span>
                    </div>
                  )}
                  
                  {(stats as any) && (
                    <div className="flex items-center gap-2 bg-knight-hover px-3 py-1 rounded-full">
                      <span>🏆</span>
                      {(stats as any).rank}
                    </div>
                  )}
                </div>
                
                {user.badges && user.badges.length > 0 && (
                  <div className="mt-4 flex gap-2 flex-wrap">
                    {user.badges.map((badge) => (
                      <Badge key={badge} type="achievement" badgeType={badge} />
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-2">
                <Button href="/profile/edit" variant="gold-outline">
                  ⚙️ Edit Profile
                </Button>
                {!isPrime && (
                  <Button href="/pricing" className="shimmer">
                    ⭐ Upgrade to Prime
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Prime Benefits Banner */}
        {isPrime && (
          <Card premium className={`mb-8 ${cardClass}`}>
            <div className="text-center">
              <div className="text-5xl mb-3">⭐</div>
              <h2 className="text-2xl font-bold text-gradient-gold mb-2">Knight Prime Active</h2>
              <p className="text-gray-300">
                You're experiencing the premium Knight Financial platform with enhanced visuals, 
                unlimited features, and priority support.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-bold text-knight-gold">200+</div>
                  <div className="text-xs text-gray-400">Templates</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-knight-gold">300+</div>
                  <div className="text-xs text-gray-400">Courses</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-knight-gold">∞</div>
                  <div className="text-xs text-gray-400">Storage</div>
                </div>
              </div>
            </div>
          </Card>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Overview */}
            <Card className={cardClass}>
              <h2 className="text-2xl font-bold text-knight-gold mb-6">Your Statistics</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <div className="text-2xl font-bold text-knight-gold">{stats?.forms_completed || 0}</div>
                  <div className="text-sm text-gray-400">Forms Done</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl mb-2">🎓</div>
                  <div className="text-2xl font-bold text-knight-gold">{stats?.courses_completed || 0}</div>
                  <div className="text-sm text-gray-400">Courses Done</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl mb-2">✍️</div>
                  <div className="text-2xl font-bold text-knight-gold">{stats?.disputes_generated || 0}</div>
                  <div className="text-sm text-gray-400">Disputes Made</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl mb-2">💬</div>
                  <div className="text-2xl font-bold text-knight-gold">{stats?.posts_created || 0}</div>
                  <div className="text-sm text-gray-400">Posts Made</div>
                </div>
              </div>
            </Card>
            
            {/* Storage */}
            {storage && (
              <Card className={cardClass}>
                <h2 className="text-2xl font-bold text-knight-gold mb-4">Storage Usage</h2>
                
                {isPrime ? (
                  <div className="text-center py-6">
                    <div className="text-6xl mb-4">∞</div>
                    <div className="text-2xl font-bold text-knight-gold mb-2">Unlimited Storage</div>
                    <p className="text-gray-400">Prime members get unlimited document storage</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Currently using: {formatBytes(storage.total_bytes)}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">
                          {formatBytes(storage.total_bytes)} of 100MB used
                        </span>
                        <span className="text-white">
                          {((storage.total_bytes / 104857600) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-knight-hover rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all ${
                            storage.total_bytes / 104857600 >= 0.9 ? 'bg-red-500' :
                            storage.total_bytes / 104857600 >= 0.7 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${(storage.total_bytes / 104857600) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <Button href="/pricing" variant="gold-outline" fullWidth>
                      Upgrade for Unlimited Storage
                    </Button>
                  </>
                )}
              </Card>
            )}
            
            {/* Recent Activity */}
            {recentPoints && recentPoints.length > 0 && (
              <Card className={cardClass}>
                <h2 className="text-2xl font-bold text-knight-gold mb-4">Recent Activity</h2>
                
                <div className="space-y-3">
                  {recentPoints.map((point) => (
                    <div key={point.id} className="flex items-center justify-between bg-knight-hover p-3 rounded">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">
                          {point.points > 0 ? '⬆️' : '⬇️'}
                        </div>
                        <div>
                          <div className="text-white font-bold">{point.reason}</div>
                          <div className="text-xs text-gray-500">
                            {formatRelativeTime(point.created_at)}
                          </div>
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${point.points > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {point.points > 0 ? '+' : ''}{formatPoints(point.points)}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Info */}
            <Card className={cardClass}>
              <h2 className="text-xl font-bold text-knight-gold mb-4">Account Info</h2>
              
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-400">Email</div>
                  <div className="text-white">{user.email}</div>
                </div>
                
                {user.phone && (
                  <div>
                    <div className="text-gray-400">Phone</div>
                    <div className="text-white">{user.phone}</div>
                  </div>
                )}
                
                <div>
                  <div className="text-gray-400">Member Since</div>
                  <div className="text-white">{new Date(user.created_at).toLocaleDateString()}</div>
                </div>
                
                <div>
                  <div className="text-gray-400">Last Login</div>
                  <div className="text-white">
                    {user.last_login ? formatRelativeTime(user.last_login) : 'First time!'}
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Quick Actions */}
            <Card className={cardClass}>
              <h2 className="text-xl font-bold text-knight-gold mb-4">Quick Actions</h2>
              
              <div className="space-y-2">
                <Button href="/tools/scanner" variant="gold-outline" fullWidth>
                  🔍 Scan Report
                </Button>
                <Button href="/tools/dispute" variant="gold-outline" fullWidth>
                  ✍️ Generate Dispute
                </Button>
                <Button href="/academy" variant="gold-outline" fullWidth>
                  📚 Take Course
                </Button>
                <Button href="/community" variant="gold-outline" fullWidth>
                  👥 Visit Community
                </Button>
              </div>
            </Card>
            
            {/* Support */}
            <Card className={cardClass}>
              <h2 className="text-xl font-bold text-knight-gold mb-4">Need Help?</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Text the CEO:</div>
                  <a href="sms:3349389171" className="btn-gold text-sm w-full text-center block">
                    📱 334-938-9171
                  </a>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400 mb-2">Email Support:</div>
                  <a href="mailto:support@knightfin.org" className="link-knight text-sm">
                    support@knightfin.org
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
