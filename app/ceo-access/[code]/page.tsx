'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

// CEO ACCESS CODE - Change this to anything you want
const CEO_ACCESS_CODE = 'KNIGHT2025';

// CEO Account Details
const CEO_EMAIL = 'raheem@knightfin.org';
const CEO_PASSWORD = 'KnightCEO2025!';

export default function CEOAccessPage() {
  const params = useParams();
  const router = useRouter();
  const [status, setStatus] = useState('Verifying access code...');
  const [error, setError] = useState('');

  useEffect(() => {
    const attemptCEOLogin = async () => {
      const code = params.code as string;
      
      // Verify access code
      if (code !== CEO_ACCESS_CODE) {
        setError('Invalid access code');
        setStatus('');
        return;
      }

      setStatus('Access code verified. Logging in as CEO...');
      
      const supabase = createClient();
      
      try {
        // Try to sign in with CEO credentials
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: CEO_EMAIL,
          password: CEO_PASSWORD,
        });

        if (signInError) {
          // If sign in fails, try to create the CEO account
          setStatus('Creating CEO account...');
          
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: CEO_EMAIL,
            password: CEO_PASSWORD,
          });

          if (signUpError) {
            setError('Could not access CEO account: ' + signUpError.message);
            setStatus('');
            return;
          }

          // Now sign in
          const { error: retryError } = await supabase.auth.signInWithPassword({
            email: CEO_EMAIL,
            password: CEO_PASSWORD,
          });

          if (retryError) {
            setError('Login failed: ' + retryError.message);
            setStatus('');
            return;
          }
        }

        // Get the user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Update or create the user profile with CEO role
          const { error: upsertError } = await supabase
            .from('user_profiles')
            .upsert({
              id: user.id,
              email: CEO_EMAIL,
              first_name: 'Raheem',
              last_name: 'Sanders',
              role: 'ceo',
              is_prime: true,
              points: 999999,
              badges: ['founder', 'ceo', 'prime', 'scholar', 'warrior', 'champion', 'legend'],
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }, {
              onConflict: 'id'
            });

          if (upsertError) {
            console.error('Profile upsert error:', upsertError);
          }
          
          setStatus('Success! Redirecting to dashboard...');
          
          // Redirect to dashboard
          setTimeout(() => {
            router.push('/dashboard');
          }, 1000);
        }
      } catch (err: any) {
        setError('An error occurred: ' + err.message);
        setStatus('');
      }
    };

    attemptCEOLogin();
  }, [params.code, router]);

  return (
    <div className="min-h-screen bg-knight-black flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-6">🏰</div>
        <h1 className="text-3xl font-bold text-gradient-gold mb-4">CEO Access Portal</h1>
        
        {status && (
          <div className="text-knight-gold animate-pulse mb-4">
            {status}
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}
        
        <div className="mt-8 text-gray-500 text-sm">
          <p>Knight Financial CEO Access</p>
          <p>Raheem Sanders</p>
        </div>
      </div>
    </div>
  );
}
