'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import { Input } from '@/components/Input';
import Card from '@/components/Card';
import { createClient } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const supabase = createClient();
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      
      if (authError) throw authError;
      if (!data.user) throw new Error('Login failed');
      
      // Update login streak
      await fetch('/api/update-streak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: data.user.id }),
      });
      
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password');
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen py-12 bg-knight-black flex items-center">
      <div className="container-knight max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">⚔️</div>
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">Welcome Back</h1>
          <p className="text-gray-400">Log in to Knight Financial</p>
        </div>
        
        <Card>
          {error && (
            <div className="alert-warning mb-6">
              <p className="text-white">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              autoComplete="email"
            />
            
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-400">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <Link href="/forgot-password" className="link-knight">
                Forgot password?
              </Link>
            </div>
            
            <Button type="submit" fullWidth size="lg" loading={loading}>
              Log In
            </Button>
          </form>
          
          <div className="divider-knight"></div>
          
          <p className="text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link href="/register" className="link-knight font-bold">
              Sign up free
            </Link>
          </p>
        </Card>
        
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            🔒 Your data is encrypted and secure
          </p>
        </div>
      </div>
    </div>
  );
}
