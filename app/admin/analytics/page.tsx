import { requireRole } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default async function AnalyticsPage() {
  const user = await requireRole(['executive', 'ceo']);
  const supabase = await createServerSupabaseClient();
  
  // Get platform stats
  const { count: totalUsers } = await supabase
    .from('user_profiles')
    .select('*', { count: 'exact', head: true });
  
  const { count: primeUsers } = await supabase
    .from('user_profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_prime', true);
  
  const { count: totalPosts } = await supabase
    .from('community_posts')
    .select('*', { count: 'exact', head: true })
    .eq('deleted', false);
  
  const { count: totalDisputes } = await supabase
    .from('dispute_letters')
    .select('*', { count: 'exact', head: true });
  
  const { count: totalScans } = await supabase
    .from('scanner_reports')
    .select('*', { count: 'exact', head: true });
  
  const { count: totalFormSubmissions } = await supabase
    .from('intel_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('completed', true);
  
  // Get recent signups (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const { count: recentSignups } = await supabase
    .from('user_profiles')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo.toISOString());
  
  // Calculate conversion rate
  const conversionRate = totalUsers && primeUsers 
    ? ((primeUsers / totalUsers) * 100).toFixed(1) 
    : '0';
  
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">📊 Platform Analytics</h1>
          <p className="text-gray-400">Executive insights and metrics</p>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="text-3xl mb-2">👥</div>
            <div className="text-3xl font-bold text-knight-gold">{totalUsers?.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Total Users</div>
          </Card>
          
          <Card>
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-3xl font-bold text-knight-gold">{primeUsers?.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Prime Members</div>
          </Card>
          
          <Card>
            <div className="text-3xl mb-2">📈</div>
            <div className="text-3xl font-bold text-knight-gold">{conversionRate}%</div>
            <div className="text-sm text-gray-400">Conversion Rate</div>
          </Card>
          
          <Card>
            <div className="text-3xl mb-2">🆕</div>
            <div className="text-3xl font-bold text-knight-gold">{recentSignups?.toLocaleString()}</div>
            <div className="text-sm text-gray-400">New (7 days)</div>
          </Card>
        </div>
        
        {/* Engagement Metrics */}
        <h2 className="text-2xl font-bold text-knight-gold mb-4">Engagement</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="text-3xl mb-2">📝</div>
            <div className="text-3xl font-bold text-knight-gold">{totalPosts?.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Community Posts</div>
          </Card>
          
          <Card>
            <div className="text-3xl mb-2">✍️</div>
            <div className="text-3xl font-bold text-knight-gold">{totalDisputes?.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Disputes Generated</div>
          </Card>
          
          <Card>
            <div className="text-3xl mb-2">🔍</div>
            <div className="text-3xl font-bold text-knight-gold">{totalScans?.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Reports Scanned</div>
          </Card>
          
          <Card>
            <div className="text-3xl mb-2">📋</div>
            <div className="text-3xl font-bold text-knight-gold">{totalFormSubmissions?.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Forms Completed</div>
          </Card>
        </div>
        
        {/* Revenue Placeholder */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-knight-gold mb-4">💰 Revenue (Coming Soon)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-knight-hover rounded-lg">
              <div className="text-3xl font-bold text-knight-gold">$0</div>
              <div className="text-sm text-gray-400">MRR</div>
            </div>
            <div className="text-center p-6 bg-knight-hover rounded-lg">
              <div className="text-3xl font-bold text-knight-gold">$0</div>
              <div className="text-sm text-gray-400">Services Revenue</div>
            </div>
            <div className="text-center p-6 bg-knight-hover rounded-lg">
              <div className="text-3xl font-bold text-knight-gold">$0</div>
              <div className="text-sm text-gray-400">Knight Intel Revenue</div>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Stripe integration coming soon. Revenue tracking will be automated.
          </p>
        </Card>
        
        {/* Data Quality */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-knight-gold mb-4">📊 Data Quality</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Form Completion Rate</span>
                <span className="text-white">--</span>
              </div>
              <div className="w-full bg-knight-hover rounded-full h-2">
                <div className="bg-knight-gold h-2 rounded-full" style={{ width: '0%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Profile Completion Rate</span>
                <span className="text-white">--</span>
              </div>
              <div className="w-full bg-knight-hover rounded-full h-2">
                <div className="bg-knight-gold h-2 rounded-full" style={{ width: '0%' }} />
              </div>
            </div>
          </div>
        </Card>
        
        <Button href="/admin" variant="gold-outline">
          ← Back to Admin Dashboard
        </Button>
      </div>
    </div>
  );
}
