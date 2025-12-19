import { requireRole } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { formatRelativeTime } from '@/utils';

export default async function KnightIntelAdminPage() {
  const user = await requireRole(['ceo']);
  const supabase = await createServerSupabaseClient();
  
  // Get pending intel requests
  const { data: pendingRequests } = await supabase
    .from('knight_intel_users')
    .select('*')
    .eq('approved', false)
    .order('created_at', { ascending: false });
  
  // Get approved intel users
  const { data: approvedUsers } = await supabase
    .from('knight_intel_users')
    .select('*')
    .eq('approved', true)
    .order('approved_at', { ascending: false })
    .limit(20);
  
  // Get stats
  const { count: totalRequests } = await supabase
    .from('knight_intel_users')
    .select('*', { count: 'exact', head: true });
  
  const { count: totalApproved } = await supabase
    .from('knight_intel_users')
    .select('*', { count: 'exact', head: true })
    .eq('approved', true);
  
  const { count: fullAccess } = await supabase
    .from('knight_intel_users')
    .select('*', { count: 'exact', head: true })
    .eq('full_access', true);
  
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">💎 Knight Intel Admin</h1>
          <p className="text-gray-400">Manage B2B data access requests</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="text-3xl mb-2">📋</div>
            <div className="text-2xl font-bold text-knight-gold">{totalRequests || 0}</div>
            <div className="text-sm text-gray-400">Total Requests</div>
          </Card>
          
          <Card>
            <div className="text-3xl mb-2">⏳</div>
            <div className="text-2xl font-bold text-knight-gold">{pendingRequests?.length || 0}</div>
            <div className="text-sm text-gray-400">Pending Review</div>
          </Card>
          
          <Card>
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold text-knight-gold">{totalApproved || 0}</div>
            <div className="text-sm text-gray-400">Approved</div>
          </Card>
          
          <Card>
            <div className="text-3xl mb-2">🔓</div>
            <div className="text-2xl font-bold text-knight-gold">{fullAccess || 0}</div>
            <div className="text-sm text-gray-400">Full Access</div>
          </Card>
        </div>
        
        {/* Pending Requests */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-knight-gold mb-4">⏳ Pending Requests</h2>
          
          {pendingRequests && pendingRequests.length > 0 ? (
            <div className="space-y-4">
              {pendingRequests.map((request: any) => (
                <div key={request.id} className="bg-knight-hover p-6 rounded-lg border border-knight-gold-dark">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-white text-lg">{request.company_name}</h3>
                        <span className="text-xs font-bold px-2 py-1 bg-knight-gold-dark text-white rounded">
                          {request.company_type?.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">
                        <strong>Contact:</strong> {request.contact_name} ({request.contact_email})
                      </p>
                      {request.contact_phone && (
                        <p className="text-gray-400 text-sm mb-2">
                          <strong>Phone:</strong> {request.contact_phone}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Submitted {formatRelativeTime(request.created_at)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm">Approve</Button>
                      <Button size="sm" variant="danger">Reject</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📭</div>
              <p className="text-gray-400">No pending requests</p>
            </div>
          )}
        </Card>
        
        {/* Approved Users */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-knight-gold mb-4">✅ Approved Users</h2>
          
          {approvedUsers && approvedUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-knight-gold-dark">
                    <th className="pb-3">Company</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Contact</th>
                    <th className="pb-3">Access</th>
                    <th className="pb-3">NDA</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {approvedUsers.map((user: any) => (
                    <tr key={user.id} className="border-b border-knight-gold-dark/30">
                      <td className="py-3 font-bold text-white">{user.company_name}</td>
                      <td className="py-3 text-gray-400">{user.company_type}</td>
                      <td className="py-3 text-gray-400">{user.contact_email}</td>
                      <td className="py-3">
                        {user.full_access ? (
                          <span className="text-green-400">Full</span>
                        ) : (
                          <span className="text-yellow-400">Limited</span>
                        )}
                      </td>
                      <td className="py-3">
                        {user.nda_signed ? (
                          <span className="text-green-400">✓ Signed</span>
                        ) : (
                          <span className="text-red-400">Pending</span>
                        )}
                      </td>
                      <td className="py-3">
                        <Button size="sm" variant="gold-outline">Manage</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">👥</div>
              <p className="text-gray-400">No approved users yet</p>
            </div>
          )}
        </Card>
        
        <Button href="/admin" variant="gold-outline">
          ← Back to Admin Dashboard
        </Button>
      </div>
    </div>
  );
}
