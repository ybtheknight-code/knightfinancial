import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }
    
    const supabase = await createServerSupabaseClient();
    
    // Call update_login_streak function
    const { data, error } = await supabase.rpc('update_login_streak', {
      p_user_id: userId
    });
    
    if (error) {
      console.error('Streak update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
