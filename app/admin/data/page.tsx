import { requireRole } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase';
import Card from '@/components/Card';
import Button from '@/components/Button';
import AdminDataClient from './AdminDataClient';

export default async function AdminDataPage() {
  // Only CEO and Executive can access
  const user = await requireRole(['executive', 'ceo']);
  const supabase = await createServerSupabaseClient();

  // Get all uploaded documents with user info
  const { data: documents } = await supabase
    .from('uploaded_documents')
    .select(`
      *,
      user_profiles (
        email,
        first_name,
        last_name,
        phone,
        state
      )
    `)
    .order('created_at', { ascending: false })
    .limit(500);

  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">💎 Data Vault</h1>
          <p className="text-gray-400">All user-uploaded credit reports, dispute letters, and documents</p>
          <p className="text-sm text-red-400 mt-2">🔒 CEO & Executive Access Only</p>
        </div>

        <AdminDataClient 
          initialDocuments={documents || []}
          currentUserRole={user.role}
        />

        <div className="mt-8">
          <Button href="/admin" variant="gold-outline">
            ← Back to Admin Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
