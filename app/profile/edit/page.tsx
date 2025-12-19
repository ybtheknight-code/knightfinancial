'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Input, Textarea } from '@/components/Input';
import { createClient } from '@/lib/supabase';

export default function ProfileEditPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    username: '',
    bio: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };
  
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }
      
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          first_name: formData.first_name || undefined,
          last_name: formData.last_name || undefined,
          phone: formData.phone || undefined,
          username: formData.username || undefined,
          bio: formData.bio || undefined,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
      
      if (updateError) throw updateError;
      
      setSuccess('Profile updated successfully!');
      setTimeout(() => router.push('/profile'), 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = async () => {
    setLogoutLoading(true);
    
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to log out');
      setLogoutLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">⚙️ Edit Profile</h1>
          <p className="text-gray-400">Update your account information</p>
        </div>
        
        <Card>
          {error && (
            <div className="alert-warning mb-6">
              <p className="text-white">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="alert-success mb-6">
              <p className="text-white">{success}</p>
            </div>
          )}
          
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="John"
              />
              <Input
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Doe"
              />
            </div>
            
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(334) 555-1234"
            />
            
            <Input
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="u/yourname"
            />
            
            <Textarea
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about yourself..."
            />
            
            <div className="flex gap-4">
              <Button type="submit" loading={loading} fullWidth>
                💾 Save Changes
              </Button>
              <Button href="/profile" variant="gold-outline" fullWidth>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
        
        {/* Danger Zone */}
        <Card className="mt-8">
          <h2 className="text-xl font-bold text-red-400 mb-4">⚠️ Account Actions</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-knight-hover rounded-lg">
              <div>
                <h3 className="font-bold text-white">Log Out</h3>
                <p className="text-sm text-gray-400">Sign out of your account</p>
              </div>
              <Button 
                onClick={handleLogout} 
                variant="gold-outline"
                loading={logoutLoading}
              >
                Log Out
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-knight-hover rounded-lg border border-red-500/30">
              <div>
                <h3 className="font-bold text-red-400">Delete Account</h3>
                <p className="text-sm text-gray-400">Permanently delete your account and data</p>
              </div>
              <Button variant="danger" disabled>
                Delete Account
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Account deletion is currently disabled. Contact support@knightfin.org to request account deletion.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
