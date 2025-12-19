'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Select, Input, Textarea } from '@/components/Input';
import { formatRelativeTime, KNIGHT_CONSTANTS } from '@/utils';
import { createClient } from '@/lib/supabase';

interface Message {
  id: string;
  from_user_id: string | null;
  to_user_id: string | null;
  subject: string;
  body: string;
  message_type: string;
  read: boolean;
  created_at: string;
  reply_body?: string;
  replied_at?: string;
  replied_by?: string;
}

const MESSAGE_TYPES = [
  { value: 'general', label: '💬 General Inquiry' },
  { value: 'service_purchase', label: '💳 Service Purchase' },
  { value: 'lawyer_request', label: '⚖️ I WANT A LAWYER' },
  { value: 'knight_intel_request', label: '💎 Knight Intel Access' },
  { value: 'bug_report', label: '🐛 Bug Report' },
  { value: 'feature_request', label: '💡 Feature Request' },
  { value: 'account_issue', label: '🔐 Account Issue' },
  { value: 'community_report', label: '🚨 Report User/Content' },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCompose, setShowCompose] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [typeFilter, setTypeFilter] = useState('');
  const [sending, setSending] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  const [newMessage, setNewMessage] = useState({
    message_type: 'general',
    subject: '',
    body: '',
  });

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      setUserId(user.id);
      
      // Get user's messages (both sent and received)
      const { data } = await supabase
        .from('user_messages')
        .select('*')
        .or(`from_user_id.eq.${user.id},to_user_id.eq.${user.id}`)
        .order('created_at', { ascending: false });
      
      if (data) {
        setMessages(data);
      }
    }
    setLoading(false);
  };

  const handleSendMessage = async () => {
    if (!newMessage.subject || !newMessage.body || !userId) return;
    
    setSending(true);
    const supabase = createClient();
    
    // Create message - to_user_id is null means it goes to support team
    const { data, error } = await supabase
      .from('user_messages')
      .insert({
        from_user_id: userId,
        to_user_id: null, // null = goes to support/admin team
        subject: newMessage.subject,
        body: newMessage.body,
        message_type: newMessage.message_type,
        read: false,
      })
      .select()
      .single();
    
    if (data) {
      setMessages([data, ...messages]);
      setShowCompose(false);
      setNewMessage({ message_type: 'general', subject: '', body: '' });
      
      // Award points for sending message
      await supabase.rpc('award_points', {
        p_user_id: userId,
        p_points: 2,
        p_reason: 'Sent support message',
      });
    }
    
    setSending(false);
  };

  const handleLawyerRequest = () => {
    setShowCompose(true);
    setNewMessage({
      message_type: 'lawyer_request',
      subject: 'I Want a Lawyer - FCRA Case Review',
      body: `Please review my case for potential FCRA litigation.

MY SITUATION:
[Describe your credit reporting issue]

BUREAUS INVOLVED:
☐ TransUnion
☐ Equifax  
☐ Experian
☐ Innovis

WHAT I'VE DONE SO FAR:
[List disputes filed, responses received, etc.]

HARM SUFFERED:
[Describe how this has affected you - denied credit, higher rates, emotional distress, etc.]

I understand Knight Financial will connect me with FCRA attorneys in their network. I am interested in:
☐ Contingency representation (no upfront cost)
☐ Paid consultation
☐ Class action participation`,
    });
  };

  const filteredMessages = typeFilter
    ? messages.filter(m => m.message_type === typeFilter)
    : messages;

  const unreadCount = messages.filter(m => !m.read && m.to_user_id === userId).length;

  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gradient-gold mb-2">💬 Messages</h1>
              <p className="text-gray-400">Contact the Knight Financial team directly</p>
            </div>
            {unreadCount > 0 && (
              <div className="bg-red-600 text-white px-4 py-2 rounded-full font-bold">
                {unreadCount} Unread
              </div>
            )}
          </div>
        </div>
        
        {/* CEO Direct Line Banner */}
        <Card premium className="mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gradient-gold">📞 Reach the CEO Directly!</h2>
              <p className="text-gray-300">We're the ONLY company where you can text the CEO personally.</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <a href={`tel:${KNIGHT_CONSTANTS.CEO_PHONE}`} className="text-2xl font-bold text-knight-gold hover:underline">
                📱 {KNIGHT_CONSTANTS.CEO_PHONE}
              </a>
              <span className="text-sm text-gray-400">Text or Call - {KNIGHT_CONSTANTS.CEO_NAME}</span>
            </div>
          </div>
        </Card>
        
        {/* I WANT A LAWYER - Prominent Button */}
        <Card className="mb-8 border-2 border-blue-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-blue-400 flex items-center gap-2">
                ⚖️ Need Legal Help?
              </h2>
              <p className="text-gray-300">We connect you with FCRA attorneys who fight for consumers.</p>
            </div>
            <Button onClick={handleLawyerRequest} size="lg" className="bg-blue-600 hover:bg-blue-700">
              ⚖️ I WANT A LAWYER
            </Button>
          </div>
        </Card>
        
        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Button onClick={() => setShowCompose(!showCompose)} size="lg">
            {showCompose ? '✖️ Cancel' : '✍️ New Message'}
          </Button>
          
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            options={[{ value: '', label: 'All Messages' }, ...MESSAGE_TYPES]}
          />
        </div>
        
        {/* Compose Form */}
        {showCompose && (
          <Card className="mb-8">
            <h2 className="text-2xl font-bold text-knight-gold mb-6">Compose Message</h2>
            
            <div className="space-y-4">
              <Select
                label="Message Type"
                value={newMessage.message_type}
                onChange={(e) => setNewMessage({...newMessage, message_type: e.target.value})}
                options={MESSAGE_TYPES}
              />
              
              {/* Type-specific info */}
              <div className="bg-knight-hover p-4 rounded text-sm">
                {newMessage.message_type === 'lawyer_request' && (
                  <div className="text-blue-300">
                    <strong>⚖️ Lawyer Request:</strong> We'll review your case and connect you with FCRA attorneys. 
                    Most cases are taken on contingency (no upfront cost - they only get paid if you win).
                  </div>
                )}
                {newMessage.message_type === 'service_purchase' && (
                  <div className="text-green-300">
                    <strong>💳 Service Purchase:</strong> Include your payment confirmation number and which service 
                    (Standard $250, Professional $500, or Executive $2,500). We'll manually upgrade you to Prime.
                  </div>
                )}
                {newMessage.message_type === 'knight_intel_request' && (
                  <div className="text-purple-300">
                    <strong>💎 Knight Intel:</strong> B2B data access requires CEO approval. Include your company, 
                    intended use, and contact information.
                  </div>
                )}
              </div>
              
              <Input
                label="Subject"
                value={newMessage.subject}
                onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                placeholder="Brief description"
                required
              />
              
              <Textarea
                label="Message"
                value={newMessage.body}
                onChange={(e) => setNewMessage({...newMessage, body: e.target.value})}
                rows={10}
                placeholder="Provide as much detail as possible..."
                required
              />
              
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.subject || !newMessage.body}
                loading={sending}
                fullWidth
                size="lg"
              >
                Send Message
              </Button>
            </div>
          </Card>
        )}
        
        {/* Message List */}
        {loading ? (
          <Card className="text-center py-12">
            <p className="text-gray-400">Loading messages...</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <Card
                key={message.id}
                hover
                onClick={() => setSelectedMessage(message)}
                className={`${!message.read && message.to_user_id === userId ? 'border-l-4 border-knight-gold' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {!message.read && message.to_user_id === userId && (
                        <span className="text-yellow-400">● NEW</span>
                      )}
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        message.message_type === 'lawyer_request' ? 'bg-blue-600' :
                        message.message_type === 'service_purchase' ? 'bg-green-600' :
                        message.message_type === 'knight_intel_request' ? 'bg-purple-600' :
                        'bg-knight-gold-dark'
                      }`}>
                        {message.message_type.replace(/_/g, ' ').toUpperCase()}
                      </span>
                      <span className="text-gray-400 text-sm">{formatRelativeTime(message.created_at)}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2">{message.subject}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{message.body}</p>
                    
                    {message.reply_body && (
                      <div className="mt-3 pt-3 border-t border-knight-gold-dark">
                        <span className="text-xs text-knight-gold font-bold">REPLY:</span>
                        <p className="text-gray-300 text-sm mt-1">{message.reply_body}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    {message.from_user_id === userId ? (
                      <span className="text-xs text-gray-500">SENT</span>
                    ) : (
                      <span className="text-xs text-knight-gold">RECEIVED</span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        
        {!loading && filteredMessages.length === 0 && (
          <Card className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-knight-gold mb-2">No Messages</h3>
            <p className="text-gray-400 mb-6">Start a conversation with us!</p>
            <Button onClick={() => setShowCompose(true)}>Send First Message</Button>
          </Card>
        )}
        
        {/* Quick Actions */}
        <Card className="mt-8">
          <h2 className="text-xl font-bold text-knight-gold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="gold-outline" onClick={handleLawyerRequest} fullWidth>
              ⚖️ I Want a Lawyer
            </Button>
            <Button variant="gold-outline" onClick={() => { setShowCompose(true); setNewMessage({...newMessage, message_type: 'service_purchase'}); }} fullWidth>
              💳 I Bought a Service
            </Button>
            <Button variant="gold-outline" onClick={() => { setShowCompose(true); setNewMessage({...newMessage, message_type: 'bug_report'}); }} fullWidth>
              🐛 Report a Bug
            </Button>
            <Button variant="gold-outline" onClick={() => { setShowCompose(true); setNewMessage({...newMessage, message_type: 'general'}); }} fullWidth>
              💬 General Question
            </Button>
          </div>
          
          {/* Contact Info */}
          <div className="mt-6 pt-6 border-t border-knight-gold-dark grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-bold text-knight-gold mb-2">📞 CEO Direct Line</h3>
              <p className="text-white">{KNIGHT_CONSTANTS.CEO_NAME}</p>
              <p className="text-gray-400">{KNIGHT_CONSTANTS.CEO_EMAIL}</p>
              <p className="text-knight-gold font-bold">{KNIGHT_CONSTANTS.CEO_PHONE}</p>
            </div>
            <div>
              <h3 className="font-bold text-knight-gold mb-2">🆘 Support</h3>
              <p className="text-gray-400">{KNIGHT_CONSTANTS.SUPPORT_EMAIL}</p>
              <p className="text-gray-400">{KNIGHT_CONSTANTS.SUPPORT_PHONE}</p>
              <p className="text-gray-500 text-xs mt-1">Response within 24-72 hours</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
