'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { Select, Input } from '@/components/Input';
import { formatBytes, formatRelativeTime } from '@/utils';
import { createClient } from '@/lib/supabase';

interface Document {
  id: string;
  user_id: string;
  document_type: string;
  file_name: string;
  file_size: number;
  file_type: string;
  storage_path: string;
  bureau: string | null;
  description: string | null;
  created_at: string;
  user_profiles?: {
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    state: string;
  };
}

const DOCUMENT_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'credit_report', label: '📊 Credit Reports' },
  { value: 'dispute_letter', label: '📝 Dispute Letters' },
  { value: 'bureau_response', label: '📨 Bureau Responses' },
  { value: 'adverse_action', label: '🚫 Adverse Action' },
  { value: 'denial_letter', label: '📄 Denial Letters' },
  { value: 'id_document', label: '🪪 ID Documents' },
  { value: 'court_doc', label: '⚖️ Court Documents' },
  { value: 'other', label: '📎 Other' },
];

const BUREAUS = [
  { value: '', label: 'All Bureaus' },
  { value: 'transunion', label: 'TransUnion' },
  { value: 'equifax', label: 'Equifax' },
  { value: 'experian', label: 'Experian' },
];

export default function AdminDataClient({ 
  initialDocuments,
  currentUserRole,
}: { 
  initialDocuments: Document[];
  currentUserRole: string;
}) {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [typeFilter, setTypeFilter] = useState('');
  const [bureauFilter, setBureauFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Check if user can access this page (CEO or Executive only)
  const canAccess = ['ceo', 'executive'].includes(currentUserRole);

  if (!canAccess) {
    return (
      <Card className="text-center py-16">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-red-400 mb-2">Access Denied</h2>
        <p className="text-gray-400">Only CEO and Executive roles can access user documents.</p>
      </Card>
    );
  }

  // Filter documents
  const filteredDocs = documents.filter(doc => {
    if (typeFilter && doc.document_type !== typeFilter) return false;
    if (bureauFilter && doc.bureau !== bureauFilter) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const matchesFile = doc.file_name.toLowerCase().includes(search);
      const matchesUser = doc.user_profiles?.email.toLowerCase().includes(search) ||
        `${doc.user_profiles?.first_name} ${doc.user_profiles?.last_name}`.toLowerCase().includes(search);
      if (!matchesFile && !matchesUser) return false;
    }
    return true;
  });

  // Stats
  const totalDocs = documents.length;
  const creditReports = documents.filter(d => d.document_type === 'credit_report').length;
  const disputeLetters = documents.filter(d => d.document_type === 'dispute_letter').length;
  const bureauResponses = documents.filter(d => d.document_type === 'bureau_response').length;
  const totalSize = documents.reduce((sum, d) => sum + (d.file_size || 0), 0);
  const uniqueUsers = new Set(documents.map(d => d.user_id)).size;

  const handleDownload = async (doc: Document) => {
    const supabase = createClient();
    const { data } = await supabase.storage
      .from('user-documents')
      .createSignedUrl(doc.storage_path, 3600);
    
    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank');
    }
  };

  const handleExport = (doc: Document) => {
    // Mark as exported for B2B
    const supabase = createClient();
    supabase.from('uploaded_documents').update({
      exported: true,
      exported_at: new Date().toISOString(),
    }).eq('id', doc.id);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="text-center py-4">
          <div className="text-3xl font-bold text-knight-gold">{totalDocs}</div>
          <div className="text-xs text-gray-400">Total Documents</div>
        </Card>
        <Card className="text-center py-4">
          <div className="text-3xl font-bold text-blue-400">{creditReports}</div>
          <div className="text-xs text-gray-400">Credit Reports</div>
        </Card>
        <Card className="text-center py-4">
          <div className="text-3xl font-bold text-green-400">{disputeLetters}</div>
          <div className="text-xs text-gray-400">Dispute Letters</div>
        </Card>
        <Card className="text-center py-4">
          <div className="text-3xl font-bold text-purple-400">{bureauResponses}</div>
          <div className="text-xs text-gray-400">Bureau Responses</div>
        </Card>
        <Card className="text-center py-4">
          <div className="text-3xl font-bold text-orange-400">{uniqueUsers}</div>
          <div className="text-xs text-gray-400">Unique Users</div>
        </Card>
        <Card className="text-center py-4">
          <div className="text-3xl font-bold text-cyan-400">{formatBytes(totalSize)}</div>
          <div className="text-xs text-gray-400">Total Data</div>
        </Card>
      </div>

      {/* B2B Value Banner */}
      <Card className="bg-gradient-to-r from-green-900/30 to-knight-hover border-green-500">
        <div className="flex items-center gap-4">
          <span className="text-4xl">💎</span>
          <div>
            <h3 className="font-bold text-green-400">THE DATA JACKPOT</h3>
            <p className="text-sm text-gray-400">
              {creditReports} credit reports + {disputeLetters} dispute letters = B2B gold for law firms and data companies
            </p>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search by user email or filename..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            options={DOCUMENT_TYPES}
          />
          <Select
            value={bureauFilter}
            onChange={(e) => setBureauFilter(e.target.value)}
            options={BUREAUS}
          />
        </div>
      </Card>

      {/* Document List */}
      <div className="space-y-3">
        {filteredDocs.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-gray-400">No documents found matching your filters.</p>
          </Card>
        ) : (
          filteredDocs.map((doc) => (
            <Card key={doc.id} hover>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">
                    {doc.document_type === 'credit_report' && '📊'}
                    {doc.document_type === 'dispute_letter' && '📝'}
                    {doc.document_type === 'bureau_response' && '📨'}
                    {doc.document_type === 'adverse_action' && '🚫'}
                    {doc.document_type === 'denial_letter' && '📄'}
                    {doc.document_type === 'id_document' && '🪪'}
                    {doc.document_type === 'court_doc' && '⚖️'}
                    {!['credit_report', 'dispute_letter', 'bureau_response', 'adverse_action', 'denial_letter', 'id_document', 'court_doc'].includes(doc.document_type) && '📎'}
                  </span>
                  <div>
                    <h4 className="font-bold text-white">{doc.file_name}</h4>
                    <p className="text-sm text-gray-400">
                      {doc.document_type.replace('_', ' ')}
                      {doc.bureau && ` • ${doc.bureau}`}
                      {' • '}{formatBytes(doc.file_size)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Uploaded by: <span className="text-knight-gold">{doc.user_profiles?.email || 'Unknown'}</span>
                      {' • '}{doc.user_profiles?.first_name} {doc.user_profiles?.last_name}
                      {doc.user_profiles?.state && ` • ${doc.user_profiles.state}`}
                    </p>
                    <p className="text-xs text-gray-500">{formatRelativeTime(doc.created_at)}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="gold-outline" onClick={() => handleDownload(doc)}>
                    📥 View
                  </Button>
                  <Button size="sm" onClick={() => handleExport(doc)}>
                    📤 Export
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Showing count */}
      <p className="text-center text-gray-500 text-sm">
        Showing {filteredDocs.length} of {documents.length} documents
      </p>
    </div>
  );
}
