'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';

interface Dispute {
  id: string;
  bureau: string;
  account: string;
  reason: string;
  dateSent: string;
  deadline: string;
  status: 'pending' | 'responded' | 'won' | 'lost' | 'escalated';
  notes: string;
}

const BUREAUS = [
  { id: 'transunion', name: 'TransUnion', color: 'bg-blue-600', address: 'P.O. Box 2000, Chester, PA 19016' },
  { id: 'equifax', name: 'Equifax', color: 'bg-red-600', address: 'P.O. Box 740256, Atlanta, GA 30374' },
  { id: 'experian', name: 'Experian', color: 'bg-purple-600', address: 'P.O. Box 4500, Allen, TX 75013' },
  { id: 'creditor', name: 'Direct to Creditor', color: 'bg-green-600', address: 'Varies' },
];

const DISPUTE_REASONS = [
  'Not my account',
  'Incorrect balance',
  'Incorrect payment history',
  'Wrong dates',
  'Account closed/paid',
  'Identity theft',
  'Duplicate account',
  'Metro 2 violation',
  'Outdated information',
  'Other',
];

const STATUS_INFO = {
  pending: { label: 'Pending', color: 'bg-yellow-600', icon: '⏳' },
  responded: { label: 'Responded', color: 'bg-blue-600', icon: '📬' },
  won: { label: 'Victory!', color: 'bg-green-600', icon: '🏆' },
  lost: { label: 'Denied', color: 'bg-red-600', icon: '❌' },
  escalated: { label: 'Escalated', color: 'bg-purple-600', icon: '⚡' },
};

export default function TrackerPage() {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newDispute, setNewDispute] = useState({
    bureau: '',
    account: '',
    reason: '',
    dateSent: new Date().toISOString().split('T')[0],
    notes: '',
  });
  
  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('knight_disputes');
    if (saved) {
      setDisputes(JSON.parse(saved));
    }
  }, []);
  
  // Save to localStorage
  const saveDisputes = (updated: Dispute[]) => {
    setDisputes(updated);
    localStorage.setItem('knight_disputes', JSON.stringify(updated));
  };
  
  const addDispute = () => {
    if (!newDispute.bureau || !newDispute.account) return;
    
    const sentDate = new Date(newDispute.dateSent);
    const deadline = new Date(sentDate);
    deadline.setDate(deadline.getDate() + 30); // 30-day deadline
    
    const dispute: Dispute = {
      id: Date.now().toString(),
      ...newDispute,
      deadline: deadline.toISOString().split('T')[0],
      status: 'pending',
    };
    
    saveDisputes([...disputes, dispute]);
    setNewDispute({ bureau: '', account: '', reason: '', dateSent: new Date().toISOString().split('T')[0], notes: '' });
    setShowForm(false);
  };
  
  const updateStatus = (id: string, status: Dispute['status']) => {
    saveDisputes(disputes.map(d => d.id === id ? { ...d, status } : d));
  };
  
  const deleteDispute = (id: string) => {
    if (confirm('Delete this dispute?')) {
      saveDisputes(disputes.filter(d => d.id !== id));
    }
  };
  
  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diff = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };
  
  const getDeadlineColor = (days: number) => {
    if (days < 0) return 'text-red-500';
    if (days <= 5) return 'text-orange-500';
    if (days <= 10) return 'text-yellow-500';
    return 'text-green-500';
  };
  
  // Stats
  const stats = {
    total: disputes.length,
    pending: disputes.filter(d => d.status === 'pending').length,
    won: disputes.filter(d => d.status === 'won').length,
    winRate: disputes.length > 0 
      ? Math.round((disputes.filter(d => d.status === 'won').length / disputes.filter(d => d.status !== 'pending').length) * 100) || 0
      : 0,
  };
  
  const overdue = disputes.filter(d => d.status === 'pending' && getDaysRemaining(d.deadline) < 0);
  const urgent = disputes.filter(d => d.status === 'pending' && getDaysRemaining(d.deadline) >= 0 && getDaysRemaining(d.deadline) <= 5);
  
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-4">📊 Knight Tracker</h1>
          <p className="text-gray-400">Track Your Disputes & Never Miss a Deadline</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <div className="text-3xl font-bold text-white">{stats.total}</div>
            <div className="text-gray-400 text-sm">Total Disputes</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-yellow-500">{stats.pending}</div>
            <div className="text-gray-400 text-sm">Pending</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-green-500">{stats.won}</div>
            <div className="text-gray-400 text-sm">Victories</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-knight-gold">{stats.winRate}%</div>
            <div className="text-gray-400 text-sm">Win Rate</div>
          </Card>
        </div>
        
        {/* Alerts */}
        {overdue.length > 0 && (
          <Card className="mb-6 border-2 border-red-500 bg-red-500/10">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🚨</span>
              <div>
                <h3 className="text-red-400 font-bold">OVERDUE RESPONSES!</h3>
                <p className="text-gray-300 text-sm">
                  {overdue.length} dispute(s) are past the 30-day deadline. 
                  This may be an FCRA violation! Consider escalating to CFPB.
                </p>
              </div>
            </div>
          </Card>
        )}
        
        {urgent.length > 0 && (
          <Card className="mb-6 border-2 border-orange-500 bg-orange-500/10">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚠️</span>
              <div>
                <h3 className="text-orange-400 font-bold">Deadlines Approaching!</h3>
                <p className="text-gray-300 text-sm">
                  {urgent.length} dispute(s) have deadlines within 5 days. Watch your mailbox!
                </p>
              </div>
            </div>
          </Card>
        )}
        
        {/* Add New Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-knight"
          >
            {showForm ? '✕ Cancel' : '+ Add New Dispute'}
          </button>
        </div>
        
        {/* Add Form */}
        {showForm && (
          <Card className="mb-6">
            <h2 className="text-xl font-bold text-white mb-4">📝 New Dispute</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Bureau</label>
                <select
                  value={newDispute.bureau}
                  onChange={(e) => setNewDispute({ ...newDispute, bureau: e.target.value })}
                  className="w-full bg-knight-hover border border-knight-gold-dark rounded-lg p-3 text-white"
                >
                  <option value="">Select Bureau</option>
                  {BUREAUS.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Account/Creditor Name</label>
                <input
                  type="text"
                  value={newDispute.account}
                  onChange={(e) => setNewDispute({ ...newDispute, account: e.target.value })}
                  placeholder="e.g., Capital One Visa"
                  className="w-full bg-knight-hover border border-knight-gold-dark rounded-lg p-3 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Dispute Reason</label>
                <select
                  value={newDispute.reason}
                  onChange={(e) => setNewDispute({ ...newDispute, reason: e.target.value })}
                  className="w-full bg-knight-hover border border-knight-gold-dark rounded-lg p-3 text-white"
                >
                  <option value="">Select Reason</option>
                  {DISPUTE_REASONS.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Date Sent</label>
                <input
                  type="date"
                  value={newDispute.dateSent}
                  onChange={(e) => setNewDispute({ ...newDispute, dateSent: e.target.value })}
                  className="w-full bg-knight-hover border border-knight-gold-dark rounded-lg p-3 text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-1">Notes (optional)</label>
                <textarea
                  value={newDispute.notes}
                  onChange={(e) => setNewDispute({ ...newDispute, notes: e.target.value })}
                  placeholder="Any additional notes..."
                  className="w-full bg-knight-hover border border-knight-gold-dark rounded-lg p-3 text-white resize-none"
                  rows={2}
                />
              </div>
            </div>
            <button
              onClick={addDispute}
              disabled={!newDispute.bureau || !newDispute.account}
              className="btn-knight mt-4 disabled:opacity-50"
            >
              ✅ Save Dispute
            </button>
          </Card>
        )}
        
        {/* Disputes List */}
        <div className="space-y-4">
          {disputes.length === 0 ? (
            <Card className="text-center py-12">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-white mb-2">No Disputes Yet</h3>
              <p className="text-gray-400 mb-4">Start tracking your dispute letters to never miss a deadline!</p>
              <button onClick={() => setShowForm(true)} className="btn-knight">
                + Add Your First Dispute
              </button>
            </Card>
          ) : (
            disputes.map((dispute) => {
              const days = getDaysRemaining(dispute.deadline);
              const statusInfo = STATUS_INFO[dispute.status];
              const bureau = BUREAUS.find(b => b.name === dispute.bureau);
              
              return (
                <Card key={dispute.id}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Bureau Badge */}
                      <div className={`${bureau?.color || 'bg-gray-600'} w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold`}>
                        {dispute.bureau.charAt(0)}
                      </div>
                      
                      <div>
                        <h3 className="text-white font-bold">{dispute.account}</h3>
                        <p className="text-gray-400 text-sm">{dispute.bureau} • {dispute.reason}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-gray-500">Sent: {dispute.dateSent}</span>
                          {dispute.status === 'pending' && (
                            <span className={getDeadlineColor(days)}>
                              {days < 0 
                                ? `⚠️ ${Math.abs(days)} days OVERDUE!` 
                                : `⏱️ ${days} days remaining`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Status Badge */}
                      <span className={`${statusInfo.color} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                        {statusInfo.icon} {statusInfo.label}
                      </span>
                      
                      {/* Status Dropdown */}
                      <select
                        value={dispute.status}
                        onChange={(e) => updateStatus(dispute.id, e.target.value as Dispute['status'])}
                        className="bg-knight-hover border border-knight-gold-dark rounded-lg px-2 py-1 text-white text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="responded">Responded</option>
                        <option value="won">Won ✓</option>
                        <option value="lost">Denied</option>
                        <option value="escalated">Escalated</option>
                      </select>
                      
                      {/* Delete */}
                      <button
                        onClick={() => deleteDispute(dispute.id)}
                        className="text-red-400 hover:text-red-300 p-2"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  {dispute.notes && (
                    <p className="text-gray-500 text-sm mt-3 pt-3 border-t border-knight-gold-dark">
                      📝 {dispute.notes}
                    </p>
                  )}
                </Card>
              );
            })
          )}
        </div>
        
        {/* Tips */}
        <Card className="mt-8">
          <h2 className="text-xl font-bold text-white mb-4">💡 Tracking Tips</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-knight-hover rounded-lg p-4">
              <h3 className="text-knight-gold font-bold mb-2">📬 Always Use Certified Mail</h3>
              <p className="text-gray-400 text-sm">
                Send disputes via Certified Mail with Return Receipt. 
                This proves they received your dispute and starts the 30-day clock.
              </p>
            </div>
            <div className="bg-knight-hover rounded-lg p-4">
              <h3 className="text-knight-gold font-bold mb-2">📅 The 30-Day Rule</h3>
              <p className="text-gray-400 text-sm">
                Bureaus have 30 days to respond (45 if you included documents). 
                No response = potential FCRA violation!
              </p>
            </div>
            <div className="bg-knight-hover rounded-lg p-4">
              <h3 className="text-knight-gold font-bold mb-2">📁 Save Everything</h3>
              <p className="text-gray-400 text-sm">
                Use Knight Vault to store copies of all letters, responses, and receipts. 
                Documentation is crucial for any legal action.
              </p>
            </div>
            <div className="bg-knight-hover rounded-lg p-4">
              <h3 className="text-knight-gold font-bold mb-2">⚡ Escalate When Needed</h3>
              <p className="text-gray-400 text-sm">
                If bureaus don't respond properly, file a complaint with the CFPB at consumerfinance.gov.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
