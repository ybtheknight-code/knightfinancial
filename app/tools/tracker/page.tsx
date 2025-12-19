'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Input, Select, Textarea } from '@/components/Input';
import { createClient } from '@/lib/supabase';
import { formatDate } from '@/utils';

interface Dispute {
  id: string;
  bureau: string;
  creditor: string;
  account_number?: string;
  dispute_type: string;
  method: string;
  date_sent: string;
  deadline: string;
  status: 'pending' | 'responded' | 'resolved' | 'escalated' | 'overdue';
  tracking_number?: string;
  notes?: string;
  response_date?: string;
  response_summary?: string;
  created_at: string;
}

export default function TrackerPage() {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [isPrime, setIsPrime] = useState(false);
  
  const [newDispute, setNewDispute] = useState({
    bureau: 'TransUnion',
    creditor: '',
    account_number: '',
    dispute_type: 'inaccurate_info',
    method: 'mail',
    date_sent: new Date().toISOString().split('T')[0],
    tracking_number: '',
    notes: '',
  });

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('is_prime, role')
          .eq('id', user.id)
          .single();
          
        if (profile) {
          setIsPrime(profile.is_prime || ['admin', 'executive', 'ceo'].includes(profile.role));
        }
        
        // Load disputes
        const { data: disputeData } = await supabase
          .from('dispute_tracking')
          .select('*')
          .eq('user_id', user.id)
          .order('deadline', { ascending: true });
        
        if (disputeData) {
          // Check for overdue disputes
          const now = new Date();
          const updated = disputeData.map(d => {
            if (d.status === 'pending' && new Date(d.deadline) < now) {
              return { ...d, status: 'overdue' as const };
            }
            return d;
          });
          setDisputes(updated);
        }
      }
      setLoading(false);
    };
    
    loadData();
  }, []);

  const handleAddDispute = async () => {
    if (!newDispute.creditor) return;
    
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return;
    
    const dateSent = new Date(newDispute.date_sent);
    const deadline = new Date(dateSent);
    deadline.setDate(deadline.getDate() + 30);
    
    const dispute: Omit<Dispute, 'id' | 'created_at'> = {
      bureau: newDispute.bureau,
      creditor: newDispute.creditor,
      account_number: newDispute.account_number || undefined,
      dispute_type: newDispute.dispute_type,
      method: newDispute.method,
      date_sent: newDispute.date_sent,
      deadline: deadline.toISOString().split('T')[0],
      status: 'pending',
      tracking_number: newDispute.tracking_number || undefined,
      notes: newDispute.notes || undefined,
    };
    
    const { data, error } = await supabase
      .from('dispute_tracking')
      .insert({ ...dispute, user_id: user.id })
      .select()
      .single();
    
    if (data) {
      setDisputes([data, ...disputes]);
      setShowAddForm(false);
      setNewDispute({
        bureau: 'TransUnion',
        creditor: '',
        account_number: '',
        dispute_type: 'inaccurate_info',
        method: 'mail',
        date_sent: new Date().toISOString().split('T')[0],
        tracking_number: '',
        notes: '',
      });
      
      // Award points
      await supabase.rpc('award_points', {
        p_user_id: user.id,
        p_points: 10,
        p_reason: 'Logged dispute in tracker',
      });
    }
  };

  const updateDisputeStatus = async (id: string, status: Dispute['status'], responseSummary?: string) => {
    const supabase = createClient();
    
    const updates: any = { status };
    if (status === 'responded' || status === 'resolved') {
      updates.response_date = new Date().toISOString().split('T')[0];
    }
    if (responseSummary) {
      updates.response_summary = responseSummary;
    }
    
    await supabase
      .from('dispute_tracking')
      .update(updates)
      .eq('id', id);
    
    setDisputes(disputes.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const now = new Date();
    const dead = new Date(deadline);
    const diff = Math.ceil((dead.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getStatusColor = (status: Dispute['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-400';
      case 'responded': return 'text-blue-400';
      case 'resolved': return 'text-green-400';
      case 'escalated': return 'text-orange-400';
      case 'overdue': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const filteredDisputes = filter === 'all' 
    ? disputes 
    : disputes.filter(d => d.status === filter);

  const pendingCount = disputes.filter(d => d.status === 'pending').length;
  const overdueCount = disputes.filter(d => d.status === 'overdue').length;
  const resolvedCount = disputes.filter(d => d.status === 'resolved').length;

  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">📅 Knight Tracker</h1>
          <p className="text-gray-400">Track your disputes and never miss a deadline</p>
          <div className="mt-4 flex gap-2 flex-wrap">
            <div className="badge-gold">30-Day Deadlines</div>
            <div className="badge-gold">Auto-Reminders</div>
            <div className="badge-gold">FCRA Compliant</div>
            {isPrime && <div className="premium-badge">⭐ Unlimited Tracking</div>}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-knight-gold">{disputes.length}</div>
              <div className="text-gray-400 text-sm">Total Disputes</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{pendingCount}</div>
              <div className="text-gray-400 text-sm">Pending</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">{overdueCount}</div>
              <div className="text-gray-400 text-sm">Overdue</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{resolvedCount}</div>
              <div className="text-gray-400 text-sm">Resolved</div>
            </div>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Button onClick={() => setShowAddForm(!showAddForm)} size="lg">
            {showAddForm ? '✖️ Cancel' : '➕ Add Dispute'}
          </Button>
          
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Disputes' },
              { value: 'pending', label: '🟡 Pending' },
              { value: 'overdue', label: '🔴 Overdue' },
              { value: 'responded', label: '🔵 Responded' },
              { value: 'resolved', label: '🟢 Resolved' },
              { value: 'escalated', label: '🟠 Escalated' },
            ]}
          />
        </div>

        {/* Add Form */}
        {showAddForm && (
          <Card className="mb-8">
            <h2 className="text-2xl font-bold text-knight-gold mb-6">Log New Dispute</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Bureau"
                value={newDispute.bureau}
                onChange={(e) => setNewDispute({...newDispute, bureau: e.target.value})}
                options={[
                  { value: 'TransUnion', label: 'TransUnion' },
                  { value: 'Equifax', label: 'Equifax' },
                  { value: 'Experian', label: 'Experian' },
                ]}
              />
              
              <Input
                label="Creditor/Furnisher"
                value={newDispute.creditor}
                onChange={(e) => setNewDispute({...newDispute, creditor: e.target.value})}
                placeholder="e.g., Navient, Capital One"
                required
              />
              
              <Input
                label="Account Number (last 4)"
                value={newDispute.account_number}
                onChange={(e) => setNewDispute({...newDispute, account_number: e.target.value})}
                placeholder="Optional"
              />
              
              <Select
                label="Dispute Type"
                value={newDispute.dispute_type}
                onChange={(e) => setNewDispute({...newDispute, dispute_type: e.target.value})}
                options={[
                  { value: 'inaccurate_info', label: 'Inaccurate Information' },
                  { value: 'not_mine', label: 'Not My Account' },
                  { value: 'wrong_balance', label: 'Wrong Balance' },
                  { value: 'wrong_status', label: 'Wrong Payment Status' },
                  { value: 'outdated', label: 'Outdated (7+ years)' },
                  { value: 'metro2', label: 'Metro 2 Violation' },
                  { value: 'deferment', label: 'Missing Deferment Code' },
                  { value: 'inquiry', label: 'Unauthorized Inquiry' },
                  { value: 'other', label: 'Other' },
                ]}
              />
              
              <Select
                label="Method Sent"
                value={newDispute.method}
                onChange={(e) => setNewDispute({...newDispute, method: e.target.value})}
                options={[
                  { value: 'mail', label: '📮 Certified Mail' },
                  { value: 'online', label: '💻 Online Portal' },
                  { value: 'phone', label: '📞 Phone' },
                  { value: 'fax', label: '📠 Fax' },
                ]}
              />
              
              <Input
                label="Date Sent"
                type="date"
                value={newDispute.date_sent}
                onChange={(e) => setNewDispute({...newDispute, date_sent: e.target.value})}
              />
              
              <Input
                label="Tracking Number"
                value={newDispute.tracking_number}
                onChange={(e) => setNewDispute({...newDispute, tracking_number: e.target.value})}
                placeholder="USPS tracking #"
              />
            </div>
            
            <Textarea
              label="Notes"
              value={newDispute.notes}
              onChange={(e) => setNewDispute({...newDispute, notes: e.target.value})}
              rows={3}
              placeholder="Any additional details..."
              className="mt-4"
            />
            
            <Button
              onClick={handleAddDispute}
              disabled={!newDispute.creditor}
              fullWidth
              size="lg"
              className="mt-6"
            >
              ➕ Add Dispute (+10 pts)
            </Button>
          </Card>
        )}

        {/* Disputes List */}
        {loading ? (
          <Card className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-400">Loading your disputes...</p>
          </Card>
        ) : filteredDisputes.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-knight-gold mb-2">No Disputes Tracked</h3>
            <p className="text-gray-400 mb-6">
              Start tracking your disputes to never miss a deadline
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              Add Your First Dispute
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredDisputes.map((dispute) => {
              const daysLeft = getDaysUntilDeadline(dispute.deadline);
              const isUrgent = daysLeft <= 5 && daysLeft > 0;
              
              return (
                <Card 
                  key={dispute.id} 
                  className={`${
                    dispute.status === 'overdue' ? 'border-2 border-red-500' :
                    isUrgent ? 'border-2 border-yellow-500' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl font-bold text-white">{dispute.bureau}</span>
                        <span className={`text-sm font-bold uppercase ${getStatusColor(dispute.status)}`}>
                          {dispute.status}
                        </span>
                        {dispute.status === 'overdue' && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded animate-pulse">
                            ⚠️ FCRA VIOLATION!
                          </span>
                        )}
                        {isUrgent && dispute.status === 'pending' && (
                          <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                            ⏰ {daysLeft} days left!
                          </span>
                        )}
                      </div>
                      
                      <div className="text-gray-400 text-sm space-y-1">
                        <p><strong className="text-gray-300">Creditor:</strong> {dispute.creditor}</p>
                        {dispute.account_number && (
                          <p><strong className="text-gray-300">Account:</strong> ****{dispute.account_number}</p>
                        )}
                        <p><strong className="text-gray-300">Sent:</strong> {formatDate(dispute.date_sent)} via {dispute.method}</p>
                        <p>
                          <strong className="text-gray-300">Deadline:</strong>{' '}
                          <span className={daysLeft < 0 ? 'text-red-400' : daysLeft <= 5 ? 'text-yellow-400' : 'text-white'}>
                            {formatDate(dispute.deadline)} ({daysLeft < 0 ? `${Math.abs(daysLeft)} days overdue` : `${daysLeft} days left`})
                          </span>
                        </p>
                        {dispute.tracking_number && (
                          <p><strong className="text-gray-300">Tracking:</strong> {dispute.tracking_number}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      {dispute.status === 'pending' && (
                        <>
                          <Button
                            onClick={() => updateDisputeStatus(dispute.id, 'responded')}
                            variant="gold-outline"
                            size="sm"
                          >
                            📩 Got Response
                          </Button>
                          <Button
                            onClick={() => updateDisputeStatus(dispute.id, 'resolved')}
                            size="sm"
                          >
                            ✅ Resolved
                          </Button>
                        </>
                      )}
                      {dispute.status === 'responded' && (
                        <>
                          <Button
                            onClick={() => updateDisputeStatus(dispute.id, 'resolved')}
                            size="sm"
                          >
                            ✅ Mark Resolved
                          </Button>
                          <Button
                            onClick={() => updateDisputeStatus(dispute.id, 'escalated')}
                            variant="gold-outline"
                            size="sm"
                          >
                            ⬆️ Escalate
                          </Button>
                        </>
                      )}
                      {dispute.status === 'overdue' && (
                        <Button href="/tools/dispute" size="sm">
                          📝 Generate FCRA Letter
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {dispute.notes && (
                    <div className="mt-4 pt-4 border-t border-knight-gold-dark">
                      <p className="text-sm text-gray-400"><strong>Notes:</strong> {dispute.notes}</p>
                    </div>
                  )}
                  
                  {dispute.response_summary && (
                    <div className="mt-4 pt-4 border-t border-knight-gold-dark">
                      <p className="text-sm text-gray-400"><strong>Response:</strong> {dispute.response_summary}</p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
        
        {/* Help Section */}
        <Card className="mt-8">
          <h3 className="text-xl font-bold text-knight-gold mb-4">📚 Understanding the 30-Day Rule</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400">
            <div>
              <h4 className="font-bold text-white mb-2">FCRA § 1681i Timeline</h4>
              <ul className="space-y-1">
                <li>• Bureau has <strong className="text-white">30 days</strong> to investigate</li>
                <li>• Can extend to 45 days if you send additional info</li>
                <li>• Must notify you of results within 5 days of completion</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">If They Miss the Deadline</h4>
              <ul className="space-y-1">
                <li>• This is an <strong className="text-red-400">FCRA violation</strong></li>
                <li>• They must delete the disputed item</li>
                <li>• You may be entitled to damages</li>
                <li>• File CFPB complaint immediately</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
