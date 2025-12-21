'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Select } from '@/components/Input';
import { formatBytes, formatRelativeTime } from '@/utils';
import { createClient } from '@/lib/supabase';

interface UploadedDocument {
  id: string;
  user_id: string;
  document_type: string;
  file_name: string;
  file_size: number;
  file_type: string;
  storage_path: string;
  bureau: string | null;
  report_date: string | null;
  description: string | null;
  created_at: string;
}

const DOCUMENT_TYPES = [
  { value: 'credit_report', label: '📊 Credit Report', points: 50 },
  { value: 'dispute_letter', label: '📝 Dispute Letter (sent)', points: 25 },
  { value: 'bureau_response', label: '📨 Bureau Response', points: 35 },
  { value: 'adverse_action', label: '🚫 Adverse Action Letter', points: 40 },
  { value: 'denial_letter', label: '📄 Denial Letter', points: 30 },
  { value: 'id_document', label: '🪪 ID Document', points: 10 },
  { value: 'bank_statement', label: '🏦 Bank Statement', points: 15 },
  { value: 'court_doc', label: '⚖️ Court Document', points: 20 },
  { value: 'other', label: '📎 Other', points: 5 },
];

const BUREAUS = [
  { value: '', label: 'Not Bureau-Specific' },
  { value: 'transunion', label: 'TransUnion' },
  { value: 'equifax', label: 'Equifax' },
  { value: 'experian', label: 'Experian' },
  { value: 'innovis', label: 'Innovis' },
];

export default function VaultPage() {
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isPrime, setIsPrime] = useState(false);
  
  // Upload form state
  const [showUpload, setShowUpload] = useState(false);
  const [uploadType, setUploadType] = useState('credit_report');
  const [uploadBureau, setUploadBureau] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Filter state
  const [typeFilter, setTypeFilter] = useState('');
  const [bureauFilter, setBureauFilter] = useState('');

  useEffect(() => {
    const supabase = createClient();
    
    // Initial load
    loadData();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
        await loadData();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadData = async () => {
    const supabase = createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();
    
    if (authUser) {
      setUser(authUser);
      
      // Get user profile for Prime status
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('is_prime')
        .eq('id', authUser.id)
        .single();
      
      setIsPrime(profile?.is_prime || false);
      
      // Get user's documents
      const { data: docs } = await supabase
        .from('uploaded_documents')
        .select('*')
        .eq('user_id', authUser.id)
        .order('created_at', { ascending: false });
      
      if (docs) {
        setDocuments(docs);
      }
    }
    setLoading(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (10MB per file for free, unlimited for Prime)
      const maxSize = isPrime ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(isPrime ? 'Max file size is 100MB' : 'Free users limited to 10MB per file. Upgrade to Prime for more!');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;
    
    setUploading(true);
    const supabase = createClient();
    
    try {
      // Generate unique filename
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      
      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('knight-vault')
        .upload(fileName, selectedFile, {
          cacheControl: '3600',
          upsert: false,
        });
      
      if (uploadError) throw uploadError;
      
      // Save metadata to database
      const { data: docData, error: docError } = await supabase
        .from('uploaded_documents')
        .insert({
          user_id: user.id,
          document_type: uploadType,
          file_name: selectedFile.name,
          file_size: selectedFile.size,
          file_type: fileExt,
          storage_path: fileName,
          bureau: uploadBureau || null,
          description: uploadDescription || null,
        })
        .select()
        .single();
      
      if (docError) throw docError;
      
      // Award points based on document type
      const docTypeConfig = DOCUMENT_TYPES.find(t => t.value === uploadType);
      if (docTypeConfig) {
        await supabase.rpc('award_points', {
          p_user_id: user.id,
          p_points: docTypeConfig.points,
          p_reason: `Uploaded ${docTypeConfig.label}`,
        });
      }
      
      // Update state
      setDocuments([docData, ...documents]);
      setShowUpload(false);
      setSelectedFile(null);
      setUploadType('credit_report');
      setUploadBureau('');
      setUploadDescription('');
      
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    }
    
    setUploading(false);
  };

  const handleDelete = async (doc: UploadedDocument) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    
    const supabase = createClient();
    
    // Delete from storage
    await supabase.storage.from('knight-vault').remove([doc.storage_path]);
    
    // Delete from database
    await supabase.from('uploaded_documents').delete().eq('id', doc.id);
    
    setDocuments(documents.filter(d => d.id !== doc.id));
  };

  const getDownloadUrl = async (doc: UploadedDocument) => {
    const supabase = createClient();
    const { data } = await supabase.storage
      .from('knight-vault')
      .createSignedUrl(doc.storage_path, 3600);
    
    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank');
    }
  };

  // Calculate storage usage
  const totalSize = documents.reduce((sum, d) => sum + (d.file_size || 0), 0);
  const limit = isPrime ? Infinity : 100 * 1024 * 1024;
  const usagePercent = isPrime ? 0 : (totalSize / limit) * 100;

  // Filter documents
  const filteredDocs = documents.filter(doc => {
    if (typeFilter && doc.document_type !== typeFilter) return false;
    if (bureauFilter && doc.bureau !== bureauFilter) return false;
    return true;
  });

  // Stats
  const creditReports = documents.filter(d => d.document_type === 'credit_report').length;
  const disputeLetters = documents.filter(d => d.document_type === 'dispute_letter').length;
  const bureauResponses = documents.filter(d => d.document_type === 'bureau_response').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-knight-black py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-pulse mb-4">🗄️</div>
          <p className="text-knight-gold">Loading your vault...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">🗄️ Knight Vault</h1>
          <p className="text-gray-400">Secure storage for all your credit documents</p>
        </div>

        {/* Data Partnership Notice */}
        <Card className="mb-6 border-2 border-knight-gold">
          <div className="flex items-center gap-4">
            <span className="text-4xl">💎</span>
            <div>
              <h3 className="font-bold text-knight-gold">Your Documents = Power Against Bureaus</h3>
              <p className="text-sm text-gray-400">
                Credit reports and dispute letters power litigation against bureaus. 
                <strong className="text-white"> The more you upload, the more points you earn!</strong>
              </p>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="text-center py-4">
            <div className="text-3xl font-bold text-knight-gold">{documents.length}</div>
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
        </div>

        {/* Storage Usage */}
        {!isPrime && (
          <Card className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-white">Storage Used</span>
              <span className="text-knight-gold">{formatBytes(totalSize)} / {formatBytes(limit)}</span>
            </div>
            <div className="h-3 bg-knight-hover rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all ${usagePercent > 80 ? 'bg-red-500' : 'bg-knight-gold'}`}
                style={{ width: `${Math.min(usagePercent, 100)}%` }}
              ></div>
            </div>
          </Card>
        )}

        {isPrime && (
          <Card className="mb-6 bg-gradient-to-r from-knight-gold/10 to-yellow-500/10 border-knight-gold">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⭐</span>
                <span className="font-bold text-knight-gold">Prime Member - Unlimited Storage</span>
              </div>
              <span className="text-white">{formatBytes(totalSize)} used</span>
            </div>
          </Card>
        )}

        {/* Upload Form */}
        {!showUpload ? (
          <Button onClick={() => setShowUpload(true)} size="lg" className="mb-6">
            📤 Upload Document
          </Button>
        ) : (
          <Card className="mb-6 border-2 border-knight-gold">
            <h3 className="text-xl font-bold text-knight-gold mb-4">Upload Document</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Document Type *</label>
                <Select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value)}
                  options={DOCUMENT_TYPES.map(t => ({ value: t.value, label: `${t.label} (+${t.points} pts)` }))}
                />
              </div>

              <div>
                <label className="block text-white mb-2">Bureau (if applicable)</label>
                <Select
                  value={uploadBureau}
                  onChange={(e) => setUploadBureau(e.target.value)}
                  options={BUREAUS}
                />
              </div>

              <div>
                <label className="block text-white mb-2">Description (optional)</label>
                <input
                  type="text"
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  placeholder="e.g., December 2025 report"
                  className="input-knight"
                />
              </div>

              <div>
                <label className="block text-white mb-2">Select File *</label>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  className="block w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-knight-gold file:text-black file:font-bold"
                />
                {selectedFile && (
                  <p className="text-sm text-gray-400 mt-2">
                    Selected: {selectedFile.name} ({formatBytes(selectedFile.size)})
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <Button onClick={handleUpload} loading={uploading} disabled={!selectedFile}>
                  {uploading ? 'Uploading...' : 'Upload'}
                </Button>
                <Button variant="gold-outline" onClick={() => setShowUpload(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            options={[{ value: '', label: 'All Types' }, ...DOCUMENT_TYPES.map(t => ({ value: t.value, label: t.label }))]}
          />
          <Select
            value={bureauFilter}
            onChange={(e) => setBureauFilter(e.target.value)}
            options={BUREAUS}
          />
        </div>

        {/* Document List */}
        {filteredDocs.length === 0 ? (
          <Card className="text-center py-16">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-bold text-knight-gold mb-2">No Documents Yet</h3>
            <p className="text-gray-400 mb-4">Upload your first credit report to get started!</p>
            <Button onClick={() => setShowUpload(true)}>📤 Upload Document</Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredDocs.map((doc) => {
              const typeConfig = DOCUMENT_TYPES.find(t => t.value === doc.document_type);
              return (
                <Card key={doc.id} hover className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{typeConfig?.label.split(' ')[0] || '📎'}</span>
                    <div>
                      <h4 className="font-bold text-white">{doc.file_name}</h4>
                      <p className="text-sm text-gray-400">
                        {doc.document_type.replace('_', ' ')} 
                        {doc.bureau && ` • ${doc.bureau}`}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatBytes(doc.file_size)} • {formatRelativeTime(doc.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="gold-outline" onClick={() => getDownloadUrl(doc)}>
                      📥
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(doc)}>
                      🗑️
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Points Guide */}
        <Card className="mt-8">
          <h3 className="text-xl font-bold text-knight-gold mb-4">📊 Document Upload Points</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {DOCUMENT_TYPES.map((type) => (
              <div key={type.value} className="flex items-center justify-between bg-knight-hover p-3 rounded-lg">
                <span className="text-gray-300 text-sm">{type.label}</span>
                <span className="text-knight-gold font-bold">+{type.points}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
