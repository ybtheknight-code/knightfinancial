import { createServerSupabaseClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST() {
  const supabase = await createServerSupabaseClient();
  
  await supabase.auth.signOut();
  
  // Redirect to home page after logout
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
}

export async function GET() {
  // Also support GET for simple links
  return POST();
}
