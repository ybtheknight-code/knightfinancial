import { requireRole } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase';
import Card from '@/components/Card';
import Link from 'next/link';
import Badge from '@/components/Badge';
import { formatRelativeTime } from '@/utils';

export default async function AdminDashboardPage() {
  const user = await requireRole(['admin', 'executive', 'ceo']);
  const supabase = await createServerSupabaseClient();
  
  // Get platform stats
  const { count: totalUsers } = await supabase
    .from('user_profiles')
    .select('*', { count: 'exact', head: true });
  
  const { count: primeUsers } = await supabase
    .from('user_profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_prime', true);
  
  const { count: todaySignups } = await supabase
    .from('user_profiles')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', new Date(new Date().setHours(0,0,0,0)).toISOString());
  
  const { count: activeDisputes } = await supabase
    .from('dispute_tracking')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');
  
  const { count: pendingModeration } = await supabase
    .from('moderation_queue')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');
  
  const { count: unreadMessages } = await supabase
    .from('user_messages')
    .select('*', { count: 'exact', head: true })
    .eq('read', false)
    .or(`to_user_id.eq.${user.id},message_type.in.(service_purchase,lawyer_request,knight_intel_request)`);
  
  // Get recent activity (Executives + CEO only)
  let recentUsers = null;
  let recentPosts = null;
  let recentMessages = null;
  
  if (['executive', 'ceo'].includes(user.role)) {
    const { data: users } = await supabase
      .from('user_profiles')
      .select('id, first_name, last_name, email, role, is_prime, created_at')
      .order('created_at', { ascending: false })
      .limit(5);
    recentUsers = users;
    
    const { data: posts } = await supabase
      .from('community_posts')
      .select('id, title, user_id, created_at, flagged')
      .order('created_at', { ascending: false })
      .limit(5);
    recentPosts = posts;
  }
  
  // Get flagged messages for all admins
  const { data: messages } = await supabase
    .from('user_messages')
    .select('id, subject, body, message_type, from_user_id, created_at, read')
    .eq('flagged', true)
    .order('created_at', { ascending: false })
    .limit(5);
  recentMessages = messages;
  
  const canSeeAnalytics = ['executive', 'ceo'].includes(user.role);
  const isCEO = user.role === 'ceo';
  
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gradient-gold mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Platform management & analytics</p>
            </div>
            <Badge type="role" role={user.role} />
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card hover>
            <div className="text-2xl mb-2">👥</div>
            <div className="text-2xl font-bold text-knight-gold">{totalUsers?.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Total Users</div>
          </Card>
          
          <Card hover>
            <div className="text-2xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-knight-gold">{primeUsers?.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Prime Members</div>
          </Card>
          
          <Card hover>
            <div className="text-2xl mb-2">🆕</div>
            <div className="text-2xl font-bold text-knight-gold">{todaySignups}</div>
            <div className="text-xs text-gray-400">Today's Signups</div>
          </Card>
          
          <Card hover>
            <div className="text-2xl mb-2">⏳</div>
            <div className="text-2xl font-bold text-knight-gold">{activeDisputes}</div>
            <div className="text-xs text-gray-400">Active Disputes</div>
          </Card>
          
          <Card hover>
            <div className="text-2xl mb-2">🚨</div>
            <div className="text-2xl font-bold text-knight-gold">{pendingModeration || 0}</div>
            <div className="text-xs text-gray-400">Pending Mod</div>
            {pendingModeration && pendingModeration > 0 && (
              <Link href="/admin/moderation" className="text-xs link-knight mt-1 block">
                Review →
              </Link>
            )}
          </Card>
          
          <Card hover>
            <div className="text-2xl mb-2">💬</div>
            <div className="text-2xl font-bold text-knight-gold">{unreadMessages || 0}</div>
            <div className="text-xs text-gray-400">Unread Msgs</div>
            {unreadMessages && unreadMessages > 0 && (
              <Link href="/messages" className="text-xs link-knight mt-1 block">
                View →
              </Link>
            )}
          </Card>
        </div>
        
        {/* Admin Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link href="/admin/users">
            <Card hover>
              <div className="text-3xl mb-2">👥</div>
              <div className="font-bold text-white">User Management</div>
              <div className="text-xs text-gray-400">View & manage users</div>
            </Card>
          </Link>
          
          <Link href="/admin/moderation">
            <Card hover>
              <div className="text-3xl mb-2">🚨</div>
              <div className="font-bold text-white">Moderation</div>
              <div className="text-xs text-gray-400">Review flagged content</div>
            </Card>
          </Link>
          
          {canSeeAnalytics && (
            <Link href="/admin/analytics">
              <Card hover>
                <div className="text-3xl mb-2">📊</div>
                <div className="font-bold text-white">Analytics</div>
                <div className="text-xs text-gray-400">Platform insights</div>
              </Card>
            </Link>
          )}
          
          {isCEO && (
            <Link href="/admin/knight-intel">
              <Card hover>
                <div className="text-3xl mb-2">💎</div>
                <div className="font-bold text-white">Knight Intel</div>
                <div className="text-xs text-gray-400">B2B requests</div>
              </Card>
            </Link>
          )}
          
          {canSeeAnalytics && (
            <Link href="/admin/data">
              <Card hover className="border-2 border-green-500/50">
                <div className="text-3xl mb-2">🗄️</div>
                <div className="font-bold text-green-400">Data Vault</div>
                <div className="text-xs text-gray-400">User documents (THE JACKPOT)</div>
              </Card>
            </Link>
          )}
          
          <Link href="/admin/messages">
            <Card hover className={unreadMessages && unreadMessages > 0 ? 'border-2 border-red-500' : ''}>
              <div className="text-3xl mb-2">📬</div>
              <div className="font-bold text-white">Admin Messages</div>
              <div className="text-xs text-gray-400">
                {unreadMessages && unreadMessages > 0 ? `${unreadMessages} unread` : 'User communications'}
              </div>
            </Card>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users (Executive + CEO only) */}
          {recentUsers && (
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-knight-gold">Recent Signups</h2>
                <Link href="/admin/users" className="link-knight text-sm">View All →</Link>
              </div>
              
              <div className="space-y-3">
                {recentUsers.map((u: any) => (
                  <div key={u.id} className="flex items-center justify-between bg-knight-hover p-3 rounded">
                    <div>
                      <div className="font-bold text-white">
                        {u.first_name} {u.last_name}
                      </div>
                      <div className="text-sm text-gray-400">{u.email}</div>
                      <div className="text-xs text-gray-500">
                        {formatRelativeTime(u.created_at)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge type="role" role={u.role} />
                      {u.is_prime && <span className="text-knight-gold">⭐</span>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
          
          {/* Recent Posts (Executive + CEO only) */}
          {recentPosts && (
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-knight-gold">Recent Community Posts</h2>
                <Link href="/community" className="link-knight text-sm">View All →</Link>
              </div>
              
              <div className="space-y-3">
                {recentPosts.map((p: any) => (
                  <div key={p.id} className="bg-knight-hover p-3 rounded">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <Link href={`/community/post/${p.id}`} className="font-bold text-white hover:text-knight-gold">
                          {p.title}
                        </Link>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatRelativeTime(p.created_at)}
                        </div>
                      </div>
                      {p.flagged && (
                        <span className="text-red-400 text-sm">🚨 Flagged</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
          
          {/* Flagged Messages (All Admins) */}
          {recentMessages && recentMessages.length > 0 && (
            <Card className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-knight-gold">Important Messages</h2>
                <Link href="/messages" className="link-knight text-sm">View All →</Link>
              </div>
              
              <div className="space-y-3">
                {recentMessages.map((m: any) => (
                  <div key={m.id} className="bg-knight-hover p-4 rounded">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-bold px-2 py-1 rounded ${
                            m.message_type === 'service_purchase' ? 'bg-green-600' :
                            m.message_type === 'lawyer_request' ? 'bg-blue-600' :
                            m.message_type === 'knight_intel_request' ? 'bg-purple-600' :
                            'bg-gray-600'
                          }`}>
                            {m.message_type.toUpperCase().replace('_', ' ')}
                          </span>
                          {!m.read && <span className="text-yellow-400 text-xs">● UNREAD</span>}
                        </div>
                        
                        <div className="font-bold text-white mb-1">{m.subject || 'No Subject'}</div>
                        <div className="text-sm text-gray-400 line-clamp-2">{m.body}</div>
                        <div className="text-xs text-gray-500 mt-2">
                          {formatRelativeTime(m.created_at)}
                        </div>
                      </div>
                      
                      <Link href={`/messages/${m.id}`} className="btn-gold-outline text-xs px-3 py-1">
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
        
        {/* CEO Only Section */}
        {isCEO && (
          <Card className="mt-8">
            <h2 className="text-2xl font-bold text-knight-gold mb-4">💎 CEO Controls</h2>
            <p className="text-gray-400 mb-6">
              You have unrestricted access to all platform features and data. Use responsibly.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/admin/users" className="btn-gold-outline text-center">
                Modify Users
              </Link>
              <Link href="/admin/knight-intel" className="btn-gold-outline text-center">
                Approve Intel Users
              </Link>
              <Link href="/admin/analytics" className="btn-gold-outline text-center">
                View All Analytics
              </Link>
              <Link href="/messages?filter=all" className="btn-gold-outline text-center">
                Broadcast Messages
              </Link>
            </div>
          </Card>
        )}
        
        {/* Access Level Info */}
        <Card className="mt-8">
          <h2 className="text-xl font-bold text-knight-gold mb-4">Your Access Level</h2>
          
          <div className="space-y-2 text-sm">
            {user.role === 'admin' && (
              <>
                <p className="text-white">✓ Moderate community (delete posts/comments, ban users)</p>
                <p className="text-white">✓ Respond to messages</p>
                <p className="text-white">✓ View user list (basic info)</p>
                <p className="text-red-400">✗ Cannot see analytics</p>
                <p className="text-red-400">✗ Cannot modify users</p>
              </>
            )}
            
            {user.role === 'executive' && (
              <>
                <p className="text-white">✓ Everything Admins can do</p>
                <p className="text-white">✓ Full data access & analytics</p>
                <p className="text-white">✓ Generate reports</p>
                <p className="text-white">✓ Delete other Admins</p>
                <p className="text-red-400">✗ Cannot modify users (except delete admins)</p>
              </>
            )}
            
            {user.role === 'ceo' && (
              <>
                <p className="text-knight-gold font-bold">✓ EVERYTHING - Full Platform Control</p>
                <p className="text-white">✓ Modify any user</p>
                <p className="text-white">✓ Delete any user (except yourself)</p>
                <p className="text-white">✓ Upgrade users to Prime</p>
                <p className="text-white">✓ Approve Knight Intel users</p>
                <p className="text-white">✓ View all data & analytics</p>
                <p className="text-white">✓ Override all decisions</p>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
