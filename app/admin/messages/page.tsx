import { createServerSupabaseClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { formatRelativeTime } from '@/utils';
import AdminMessagesClient from './AdminMessagesClient';

export default async function AdminMessagesPage() {
  const supabase = await createServerSupabaseClient();
  
  // Check auth and role
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  
  // Only Admin, Executive, CEO can access
  if (!profile || !['admin', 'executive', 'ceo'].includes(profile.role)) {
    redirect('/dashboard');
  }
  
  // Get ALL messages sent to support (to_user_id is null = support messages)
  const { data: messages } = await supabase
    .from('user_messages')
    .select(`
      id,
      from_user_id,
      to_user_id,
      subject,
      body,
      message_type,
      read,
      created_at,
      reply_body,
      replied_at,
      replied_by,
      user_profiles!user_messages_from_user_id_fkey (
        email,
        first_name,
        last_name,
        phone,
        role,
        is_prime
      )
    `)
    .is('to_user_id', null)  // Messages sent to support
    .order('created_at', { ascending: false })
    .limit(100);
  
  // Get stats
  const unreadCount = messages?.filter(m => !m.read).length || 0;
  const lawyerRequests = messages?.filter(m => m.message_type === 'lawyer_request').length || 0;
  const servicePurchases = messages?.filter(m => m.message_type === 'service_purchase').length || 0;
  
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">📬 Admin Messages</h1>
          <p className="text-gray-400">View and respond to all user messages</p>
          <div className="mt-4 flex gap-2 flex-wrap">
            <Badge type="role" role={profile.role} />
            {unreadCount > 0 && (
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {unreadCount} Unread
              </span>
            )}
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-knight-gold">{messages?.length || 0}</div>
              <div className="text-gray-400 text-sm">Total Messages</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">{unreadCount}</div>
              <div className="text-gray-400 text-sm">Unread</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{lawyerRequests}</div>
              <div className="text-gray-400 text-sm">Lawyer Requests</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{servicePurchases}</div>
              <div className="text-gray-400 text-sm">Service Purchases</div>
            </div>
          </Card>
        </div>
        
        {/* Client component for interactivity */}
        <AdminMessagesClient 
          initialMessages={messages || []} 
          currentUserRole={profile.role}
          currentUserId={user.id}
        />
      </div>
    </div>
  );
}
