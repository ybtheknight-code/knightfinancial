'use client';

import { useState } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { Input, Select } from '@/components/Input';
import { formatRelativeTime } from '@/utils';
import { createClient } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_prime: boolean;
  points: number;
  created_at: string;
  phone?: string;
  state?: string;
  data_partnership_agreed?: boolean;
}

interface AdminUsersClientProps {
  initialUsers: User[];
  currentUserRole: string;
  currentUserId: string;
  canModify: boolean;  // CEO only
  canViewFullData: boolean;  // Executive + CEO
}

export default function AdminUsersClient({
  initialUsers,
  currentUserRole,
  currentUserId,
  canModify,
  canViewFullData,
}: AdminUsersClientProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [primeFilter, setPrimeFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const filteredUsers = users.filter(u => {
    const matchesSearch = !search || 
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      `${u.first_name} ${u.last_name}`.toLowerCase().includes(search.toLowerCase());
    const matchesRole = !roleFilter || u.role === roleFilter;
    const matchesPrime = !primeFilter || 
      (primeFilter === 'prime' && u.is_prime) || 
      (primeFilter === 'free' && !u.is_prime);
    return matchesSearch && matchesRole && matchesPrime;
  });

  const handleTogglePrime = async (userId: string, currentPrime: boolean) => {
    if (!canModify) return;
    
    setActionLoading(true);
    const supabase = createClient();
    
    const newPrime = !currentPrime;
    const newRole = newPrime ? 'prime' : 'free';
    
    const { error } = await supabase
      .from('user_profiles')
      .update({ is_prime: newPrime, role: newRole })
      .eq('id', userId);
    
    if (!error) {
      setUsers(users.map(u => 
        u.id === userId ? { ...u, is_prime: newPrime, role: newRole } : u
      ));
    }
    setActionLoading(false);
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    if (!canModify) return;
    
    // Prevent changing CEO role
    const user = users.find(u => u.id === userId);
    if (user?.role === 'ceo') {
      alert('Cannot change CEO role');
      return;
    }
    
    setActionLoading(true);
    const supabase = createClient();
    
    const isPrime = ['prime', 'admin', 'executive', 'ceo'].includes(newRole);
    
    const { error } = await supabase
      .from('user_profiles')
      .update({ role: newRole, is_prime: isPrime })
      .eq('id', userId);
    
    if (!error) {
      setUsers(users.map(u => 
        u.id === userId ? { ...u, role: newRole, is_prime: isPrime } : u
      ));
    }
    setActionLoading(false);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!canModify) return;
    
    const user = users.find(u => u.id === userId);
    
    // Prevent self-delete or CEO delete
    if (userId === currentUserId) {
      alert('Cannot delete yourself');
      return;
    }
    if (user?.role === 'ceo') {
      alert('Cannot delete CEO');
      return;
    }
    
    if (!confirm(`DELETE USER: ${user?.first_name} ${user?.last_name} (${user?.email})?\n\nThis CANNOT be undone!`)) {
      return;
    }
    
    setActionLoading(true);
    const supabase = createClient();
    
    // Delete from user_profiles (cascades to other tables)
    const { error } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', userId);
    
    if (!error) {
      setUsers(users.filter(u => u.id !== userId));
      setSelectedUser(null);
    } else {
      alert('Delete failed: ' + error.message);
    }
    setActionLoading(false);
  };

  return (
    <>
      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            options={[
              { value: '', label: 'All Roles' },
              { value: 'ceo', label: '💎 CEO' },
              { value: 'executive', label: '👑 Executive' },
              { value: 'admin', label: '🔴 Admin' },
              { value: 'prime', label: '⭐ Prime' },
              { value: 'free', label: '👤 Free' },
            ]}
          />
          <Select
            value={primeFilter}
            onChange={(e) => setPrimeFilter(e.target.value)}
            options={[
              { value: '', label: 'All Status' },
              { value: 'prime', label: '⭐ Prime Only' },
              { value: 'free', label: '👤 Free Only' },
            ]}
          />
        </div>
        <div className="mt-4 text-sm text-gray-400">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </Card>

      {/* User List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card 
            key={user.id} 
            hover
            className={`${user.is_prime ? 'border-l-4 border-knight-gold' : ''} ${
              user.role === 'ceo' ? 'border-2 border-purple-500' : ''
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                {/* User Header */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-lg font-bold text-white">
                    {user.first_name} {user.last_name}
                  </span>
                  <Badge type="role" role={user.role as any} />
                  {user.is_prime && (
                    <span className="text-xs bg-knight-gold text-black px-2 py-0.5 rounded font-bold">
                      ⭐ PRIME
                    </span>
                  )}
                  {user.id === currentUserId && (
                    <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                      YOU
                    </span>
                  )}
                </div>
                
                {/* User Details */}
                <div className="text-sm text-gray-400 space-y-1">
                  <p><strong>Email:</strong> {user.email}</p>
                  {canViewFullData && user.phone && (
                    <p><strong>Phone:</strong> {user.phone}</p>
                  )}
                  <p>
                    <strong>Points:</strong> {user.points?.toLocaleString() || 0} | 
                    <strong> Joined:</strong> {formatRelativeTime(user.created_at)}
                  </p>
                  {canViewFullData && user.data_partnership_agreed !== undefined && (
                    <p>
                      <strong>Data Partnership:</strong>{' '}
                      {user.data_partnership_agreed ? '✅ Agreed' : '❌ Not Agreed'}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Actions - CEO ONLY */}
              {canModify && user.role !== 'ceo' && user.id !== currentUserId && (
                <div className="flex flex-col gap-2 min-w-[150px]">
                  <Button
                    onClick={() => handleTogglePrime(user.id, user.is_prime)}
                    disabled={actionLoading}
                    size="sm"
                    variant={user.is_prime ? 'gold-outline' : 'gold'}
                  >
                    {user.is_prime ? '⬇️ Remove Prime' : '⬆️ Upgrade Prime'}
                  </Button>
                  
                  <Select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    options={[
                      { value: 'free', label: '👤 Free' },
                      { value: 'prime', label: '⭐ Prime' },
                      { value: 'admin', label: '🔴 Admin' },
                      { value: 'executive', label: '👑 Executive' },
                    ]}
                  />
                  
                  <Button
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={actionLoading}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    🗑️ Delete
                  </Button>
                </div>
              )}
              
              {/* View-only badge for non-CEO */}
              {!canModify && (
                <div className="text-xs text-gray-500">
                  VIEW ONLY
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-knight-gold">No Users Found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </Card>
      )}
    </>
  );
}
