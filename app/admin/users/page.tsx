import { createServerSupabaseClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import AdminUsersClient from './AdminUsersClient';

export default async function AdminUsersPage() {
  const supabase = await createServerSupabaseClient();
  
  // Check auth and role
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  
  const { data: currentProfile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  
  // Only Admin, Executive, CEO can access
  if (!currentProfile || !['admin', 'executive', 'ceo'].includes(currentProfile.role)) {
    redirect('/dashboard');
  }
  
  // Get all users (Admins see limited data, Executives/CEO see all)
  const isAdmin = currentProfile.role === 'admin';
  const isCEO = currentProfile.role === 'ceo';
  const isExecutive = currentProfile.role === 'executive';
  
  // Admin can see basic info only, Executive/CEO can see everything
  const selectFields = isAdmin 
    ? 'id, email, first_name, last_name, role, is_prime, points, created_at'
    : '*';
  
  const { data: users } = await supabase
    .from('user_profiles')
    .select(selectFields)
    .order('created_at', { ascending: false })
    .limit(500);
  
  // Get stats
  const totalUsers = users?.length || 0;
  const primeUsers = users?.filter(u => u.is_prime).length || 0;
  const freeUsers = users?.filter(u => u.role === 'free').length || 0;
  
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">👥 User Management</h1>
          <p className="text-gray-400">Search, filter, and manage platform users</p>
          <div className="mt-4 flex gap-2 flex-wrap">
            <Badge type="role" role={currentProfile.role} />
            {isCEO && <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">FULL ACCESS</span>}
            {isExecutive && <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">VIEW ALL DATA</span>}
            {isAdmin && <span className="text-xs bg-yellow-600 text-black px-2 py-1 rounded">LIMITED ACCESS</span>}
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-knight-gold">{totalUsers}</div>
              <div className="text-gray-400 text-sm">Total Users</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{primeUsers}</div>
              <div className="text-gray-400 text-sm">Prime Members</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-400">{freeUsers}</div>
              <div className="text-gray-400 text-sm">Free Users</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {((primeUsers / totalUsers) * 100 || 0).toFixed(1)}%
              </div>
              <div className="text-gray-400 text-sm">Conversion Rate</div>
            </div>
          </Card>
        </div>
        
        {/* Permission Summary */}
        <Card className="mb-8">
          <h3 className="text-lg font-bold text-knight-gold mb-4">🔐 Your Permissions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-bold text-white mb-2">✅ You CAN:</h4>
              <ul className="text-gray-400 space-y-1">
                <li>• View user list</li>
                <li>• Search users</li>
                {['executive', 'ceo'].includes(currentProfile.role) && <li>• View full user data</li>}
                {isCEO && <li>• Upgrade/downgrade Prime</li>}
                {isCEO && <li>• Change user roles</li>}
                {isCEO && <li>• Delete users</li>}
              </ul>
            </div>
            {!isCEO && (
              <div>
                <h4 className="font-bold text-red-400 mb-2">❌ You CANNOT:</h4>
                <ul className="text-gray-400 space-y-1">
                  {isAdmin && <li>• View sensitive user data</li>}
                  {!isCEO && <li>• Upgrade/downgrade Prime</li>}
                  {!isCEO && <li>• Change user roles</li>}
                  {!isCEO && <li>• Delete users</li>}
                </ul>
              </div>
            )}
            <div>
              <h4 className="font-bold text-blue-400 mb-2">ℹ️ Note:</h4>
              <p className="text-gray-400">
                {isCEO 
                  ? 'As CEO, you have full control over all users.'
                  : isExecutive
                    ? 'Executives can view all data but cannot modify users.'
                    : 'Admins have limited view access for privacy.'
                }
              </p>
            </div>
          </div>
        </Card>
        
        {/* Client component for interactivity */}
        <AdminUsersClient 
          initialUsers={users || []} 
          currentUserRole={currentProfile.role}
          currentUserId={user.id}
          canModify={isCEO}
          canViewFullData={['executive', 'ceo'].includes(currentProfile.role)}
        />
      </div>
    </div>
  );
}
