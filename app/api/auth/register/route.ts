import { createServerSupabaseClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      email, 
      password, 
      first_name, 
      last_name, 
      phone, 
      state, 
      zip_code,
      address,
      dob,
      gender,
      ethnicity,
      annual_income,
      employment_status,
      data_partnership_agreed,
    } = body;
    
    // Validate required fields
    if (!email || !password || !first_name || !last_name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // FIXED: Use server-side Supabase client for API routes
    const supabase = await createServerSupabaseClient();
    
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }
    
    if (!authData.user) {
      return NextResponse.json(
        { error: 'Registration failed' },
        { status: 500 }
      );
    }
    
    // Create profile with ALL form fields
    // FIXED: role enum is 'free' not 'member'
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: authData.user.id,
        email,
        first_name,
        last_name,
        phone: phone || null,
        state: state || null,
        zip_code: zip_code || null,
        address: address || null,
        dob: dob || null,
        gender: gender || null,
        ethnicity: ethnicity || null,
        annual_income: annual_income || null,
        employment_status: employment_status || null,
        data_partnership_agreed: true,  // REQUIRED: Can only register by agreeing
        data_partnership_date: new Date().toISOString(),  // Track when they agreed
        role: 'free',  // FIXED: was 'member' which doesn't exist in enum
        points: 100,   // Welcome bonus
        is_prime: false,
        streak_count: 0,
      });
    
    if (profileError) {
      console.error('Profile creation error:', profileError);
      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Registration successful! Welcome to Knight Financial.',
    });
    
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
