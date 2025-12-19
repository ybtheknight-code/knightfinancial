'use client';

import { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Input } from '@/components/Input';
import { createClient } from '@/lib/supabase';

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const supabase = createClient();
      
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (resetError) throw resetError;
      
      setSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };
  
  if (sent) {
    return (
      <div className="min-h-screen py-12 bg-knight-black flex items-center">
        <div className="container-knight max-w-md">
          <Card className="text-center">
            <div className="text-6xl mb-4">✉️</div>
            <h1 className="text-3xl font-bold text-gradient-gold mb-4">Check Your Email</h1>
            <p className="text-gray-400 mb-6">
              We've sent a password reset link to <strong className="text-white">{email}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Didn't receive it? Check your spam folder or try again in a few minutes.
            </p>
            <Button href="/login" fullWidth>
              ← Back to Login
            </Button>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-12 bg-knight-black flex items-center">
      <div className="container-knight max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔑</div>
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">Forgot Password</h1>
          <p className="text-gray-400">Enter your email to reset your password</p>
        </div>
        
        <Card>
          {error && (
            <div className="alert-warning mb-6">
              <p className="text-white">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              autoComplete="email"
            />
            
            <Button type="submit" fullWidth size="lg" loading={loading}>
              Send Reset Link
            </Button>
          </form>
          
          <div className="divider-knight"></div>
          
          <p className="text-center text-sm text-gray-400">
            Remember your password?{' '}
            <Link href="/login" className="link-knight font-bold">
              Log in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
