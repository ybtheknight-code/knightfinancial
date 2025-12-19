'use client';

import { useState } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { Select, Textarea } from '@/components/Input';
import { formatRelativeTime } from '@/utils';
import { createClient } from '@/lib/supabase';

interface Message {
  id: string;
  from_user_id: string;
  subject: string;
  body: string;
  message_type: string;
  read: boolean;
  created_at: string;
  reply_body?: string;
  replied_at?: string;
  replied_by?: string;
  user_profiles?: {
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    role: string;
    is_prime: boolean;
  } | {
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    role: string;
    is_prime: boolean;
  }[];
}

interface AdminMessagesClientProps {
  initialMessages: Message[];
  currentUserRole: string;
  currentUserId: string;
}

export default function AdminMessagesClient({ 
  initialMessages, 
  currentUserRole,
  currentUserId 
}: AdminMessagesClientProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  const filteredMessages = messages.filter(m => {
    if (typeFilter && m.message_type !== typeFilter) return false;
    if (statusFilter === 'unread' && m.read) return false;
    if (statusFilter === 'read' && !m.read) return false;
    if (statusFilter === 'replied' && !m.reply_body) return false;
    if (statusFilter === 'pending' && m.reply_body) return false;
    return true;
  });

  const handleMarkRead = async (messageId: string) => {
    const supabase = createClient();
    await supabase
      .from('user_messages')
      .update({ read: true })
      .eq('id', messageId);
    
    setMessages(messages.map(m => m.id === messageId ? { ...m, read: true } : m));
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;
    
    setSending(true);
    const supabase = createClient();
    
    // Update the message with reply
    await supabase
      .from('user_messages')
      .update({
        reply_body: replyText,
        replied_at: new Date().toISOString(),
        replied_by: currentUserId,
        read: true,
      })
      .eq('id', selectedMessage.id);
    
    // Also create a new message TO the user so they see it in their inbox
    await supabase
      .from('user_messages')
      .insert({
        from_user_id: null, // From support
        to_user_id: selectedMessage.from_user_id,
        subject: `RE: ${selectedMessage.subject}`,
        body: replyText,
        message_type: selectedMessage.message_type,
        read: false,
      });
    
    // Update local state
    setMessages(messages.map(m => 
      m.id === selectedMessage.id 
        ? { ...m, reply_body: replyText, replied_at: new Date().toISOString(), read: true }
        : m
    ));
    
    setSelectedMessage(null);
    setReplyText('');
    setSending(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lawyer_request': return 'bg-blue-600';
      case 'service_purchase': return 'bg-green-600';
      case 'knight_intel_request': return 'bg-purple-600';
      case 'bug_report': return 'bg-red-600';
      case 'community_report': return 'bg-orange-600';
      default: return 'bg-knight-gold-dark';
    }
  };

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          options={[
            { value: '', label: 'All Types' },
            { value: 'lawyer_request', label: '⚖️ Lawyer Requests' },
            { value: 'service_purchase', label: '💳 Service Purchases' },
            { value: 'knight_intel_request', label: '💎 Intel Requests' },
            { value: 'bug_report', label: '🐛 Bug Reports' },
            { value: 'general', label: '💬 General' },
            { value: 'account_issue', label: '🔐 Account Issues' },
            { value: 'community_report', label: '🚨 Community Reports' },
          ]}
        />
        
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: '', label: 'All Status' },
            { value: 'unread', label: '🔴 Unread' },
            { value: 'pending', label: '🟡 Needs Reply' },
            { value: 'replied', label: '🟢 Replied' },
          ]}
        />
      </div>

      {/* Message List */}
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <Card
            key={message.id}
            hover
            className={`${!message.read ? 'border-l-4 border-red-500' : ''} ${
              message.message_type === 'lawyer_request' ? 'border-l-4 border-blue-500' : ''
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {!message.read && <span className="text-red-400 font-bold">● NEW</span>}
                  <span className={`text-xs font-bold px-2 py-1 rounded ${getTypeColor(message.message_type)}`}>
                    {message.message_type.replace(/_/g, ' ').toUpperCase()}
                  </span>
                  {message.reply_body ? (
                    <span className="text-xs text-green-400">✓ REPLIED</span>
                  ) : (
                    <span className="text-xs text-yellow-400">⏳ PENDING</span>
                  )}
                  <span className="text-gray-400 text-sm">{formatRelativeTime(message.created_at)}</span>
                </div>
                
                {/* User Info */}
                {message.user_profiles && (
                  <div className="flex items-center gap-2 mb-2 text-sm">
                    <span className="text-white font-bold">
                      {message.user_profiles.first_name} {message.user_profiles.last_name}
                    </span>
                    <Badge type="role" role={message.user_profiles.role as any} />
                    {message.user_profiles.is_prime && (
                      <span className="text-xs bg-knight-gold text-black px-2 py-0.5 rounded">PRIME</span>
                    )}
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-400">{message.user_profiles.email}</span>
                    {message.user_profiles.phone && (
                      <>
                        <span className="text-gray-500">|</span>
                        <span className="text-gray-400">{message.user_profiles.phone}</span>
                      </>
                    )}
                  </div>
                )}
                
                {/* Subject & Body */}
                <h3 className="text-lg font-bold text-white mb-2">{message.subject}</h3>
                <p className="text-gray-300 text-sm whitespace-pre-wrap">{message.body}</p>
                
                {/* Reply if exists */}
                {message.reply_body && (
                  <div className="mt-4 p-4 bg-green-900/20 rounded border border-green-600">
                    <div className="text-xs text-green-400 mb-2">
                      REPLIED {message.replied_at && formatRelativeTime(message.replied_at)}
                    </div>
                    <p className="text-gray-300 text-sm whitespace-pre-wrap">{message.reply_body}</p>
                  </div>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex flex-col gap-2 min-w-[120px]">
                {!message.read && (
                  <Button 
                    onClick={() => handleMarkRead(message.id)} 
                    variant="gold-outline" 
                    size="sm"
                  >
                    Mark Read
                  </Button>
                )}
                {!message.reply_body && (
                  <Button 
                    onClick={() => setSelectedMessage(message)} 
                    size="sm"
                  >
                    Reply
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-knight-gold">No Messages</h3>
          <p className="text-gray-400">No messages match your filters</p>
        </Card>
      )}

      {/* Reply Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-knight-gold">Reply to Message</h2>
                <p className="text-gray-400 text-sm">
                  From: {selectedMessage.user_profiles?.first_name} {selectedMessage.user_profiles?.last_name}
                </p>
              </div>
              <Button onClick={() => setSelectedMessage(null)} variant="gold-outline" size="sm">
                ✕
              </Button>
            </div>
            
            {/* Original Message */}
            <div className="bg-knight-hover p-4 rounded mb-6">
              <h3 className="font-bold text-white mb-2">{selectedMessage.subject}</h3>
              <p className="text-gray-300 text-sm whitespace-pre-wrap">{selectedMessage.body}</p>
            </div>
            
            {/* Reply Form */}
            <Textarea
              label="Your Reply"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={8}
              placeholder="Type your response..."
            />
            
            <div className="flex gap-4 mt-4">
              <Button onClick={() => setSelectedMessage(null)} variant="gold-outline" fullWidth>
                Cancel
              </Button>
              <Button 
                onClick={handleReply} 
                disabled={!replyText.trim()} 
                loading={sending}
                fullWidth
              >
                Send Reply
              </Button>
            </div>
          </Card>
        </div>
      )}
      
      {/* Role Permissions Note */}
      <Card className="mt-8">
        <h3 className="text-lg font-bold text-knight-gold mb-4">🔐 Your Permissions ({currentUserRole.toUpperCase()})</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-bold text-white mb-2">✅ Can Do:</h4>
            <ul className="text-gray-400 space-y-1">
              <li>• View all messages</li>
              <li>• Reply to messages</li>
              <li>• Moderate content</li>
              {['executive', 'ceo'].includes(currentUserRole) && <li>• Access user data</li>}
              {currentUserRole === 'ceo' && <li>• Add/delete users</li>}
              {currentUserRole === 'ceo' && <li>• Upgrade/downgrade Prime</li>}
            </ul>
          </div>
          {currentUserRole === 'admin' && (
            <div>
              <h4 className="font-bold text-red-400 mb-2">❌ Cannot Do:</h4>
              <ul className="text-gray-400 space-y-1">
                <li>• Access raw user data</li>
                <li>• Add/delete users</li>
                <li>• Upgrade/downgrade Prime</li>
              </ul>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
