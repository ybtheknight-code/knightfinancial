// ============================================================================
// KNIGHT FINANCIAL - SUPABASE CLIENT UTILITIES
// Client and Server-side Supabase utilities for Next.js 15 App Router
// ============================================================================

import { createBrowserClient, createServerClient } from '@supabase/ssr';
// Note: Database types removed - using implicit types

// ============================================================================
// CLIENT-SIDE SUPABASE (for use in Client Components)
// ============================================================================

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// ============================================================================
// SERVER-SIDE SUPABASE (for use in Server Components & API Routes)
// ============================================================================

export async function createServerSupabaseClient() {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle cookie setting errors
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Handle cookie removal errors
          }
        },
      },
    }
  );
}

// ============================================================================
// ADMIN SUPABASE CLIENT (with service role key)
// ============================================================================

export function createAdminClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if email or phone is blocked
 */
export async function isBlocked(email: string, phone?: string) {
  const supabase = createClient();
  
  const { data: blockedEmails } = await supabase
    .from('blocked_emails')
    .select('email')
    .eq('email', email.toLowerCase())
    .single();
  
  if (blockedEmails) {
    return { blocked: true, reason: 'Email is blocked' };
  }
  
  if (phone) {
    const { data: blockedPhones } = await supabase
      .from('blocked_phones')
      .select('phone')
      .eq('phone', phone)
      .single();
    
    if (blockedPhones) {
      return { blocked: true, reason: 'Phone number is blocked' };
    }
  }
  
  return { blocked: false };
}

/**
 * Get current user session
 */
export async function getSession() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

/**
 * Get current user profile
 */
export async function getCurrentUser() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) return null;
  
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
  
  return profile;
}

/**
 * Award points to user
 */
export async function awardPoints(
  userId: string,
  points: number,
  reason: string,
  referenceType?: string,
  referenceId?: string
) {
  const supabase = createClient();
  
  // Add to points history
  await supabase.from('points_history').insert({
    user_id: userId,
    points,
    reason,
    reference_type: referenceType,
    reference_id: referenceId,
  });
  
  // Update user's total points
  const { data: user } = await supabase
    .from('user_profiles')
    .select('points')
    .eq('id', userId)
    .single();
  
  if (user) {
    await supabase
      .from('user_profiles')
      .update({ points: user.points + points })
      .eq('id', userId);
  }
}

/**
 * Check and award badges
 */
export async function checkAndAwardBadges(userId: string) {
  const supabase = createClient();
  
  const { data: user } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (!user) return;
  
  const newBadges: string[] = [...(user.badges || [])];
  
  // First Victory
  if (!newBadges.includes('first_victory')) {
    const { count } = await supabase
      .from('scanner_reports')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);
    
    if (count && count >= 1) {
      newBadges.push('first_victory');
    }
  }
  
  // Scholar (10 courses)
  if (!newBadges.includes('scholar') && user.courses_completed >= 10) {
    newBadges.push('scholar');
  }
  
  // Warrior (10 disputes)
  if (!newBadges.includes('warrior') && user.disputes_generated >= 10) {
    newBadges.push('warrior');
  }
  
  // Streak Master (30 days)
  if (!newBadges.includes('streak_master') && user.streak_count >= 30) {
    newBadges.push('streak_master');
  }
  
  // Elite (10,000 points)
  if (!newBadges.includes('elite') && user.points >= 10000) {
    newBadges.push('elite');
  }
  
  // Data Partner (all forms completed)
  if (!newBadges.includes('data_partner') && user.forms_completed >= 30) {
    newBadges.push('data_partner');
  }
  
  // Update badges if new ones earned
  if (newBadges.length > (user.badges || []).length) {
    await supabase
      .from('user_profiles')
      .update({ badges: newBadges })
      .eq('id', userId);
  }
}

/**
 * Update login streak
 */
export async function updateLoginStreak(userId: string) {
  const supabase = createClient();
  
  const { data: user } = await supabase
    .from('user_profiles')
    .select('last_login, streak_count')
    .eq('id', userId)
    .single();
  
  if (!user) return;
  
  const now = new Date();
  const lastLogin = user.last_login ? new Date(user.last_login) : null;
  
  let newStreak = user.streak_count || 0;
  
  if (lastLogin) {
    const daysSince = Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSince === 1) {
      // Consecutive day - increment streak
      newStreak += 1;
    } else if (daysSince > 1) {
      // Missed a day - reset streak
      newStreak = 1;
    }
    // Same day - don't change streak
  } else {
    // First login
    newStreak = 1;
  }
  
  await supabase
    .from('user_profiles')
    .update({
      last_login: now.toISOString(),
      streak_count: newStreak,
    })
    .eq('id', userId);
  
  // Award points for login
  if (lastLogin) {
    const daysSince = Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSince >= 1) {
      await awardPoints(userId, 5, 'Daily login');
    }
  } else {
    await awardPoints(userId, 5, 'First login');
  }
}

/**
 * Calculate storage usage for user
 */
export async function calculateStorageUsage(userId: string) {
  const supabase = createClient();
  
  const { data: documents } = await supabase
    .from('user_documents')
    .select('file_size')
    .eq('user_id', userId);
  
  if (!documents) return 0;
  
  const totalBytes = documents.reduce((sum, doc) => sum + (doc.file_size || 0), 0);
  
  // Update storage_usage table
  await supabase
    .from('storage_usage')
    .upsert({
      user_id: userId,
      total_bytes: totalBytes,
      last_calculated: new Date().toISOString(),
    });
  
  return totalBytes;
}

/**
 * Check if user has storage space available
 */
export async function hasStorageSpace(userId: string, fileSize: number) {
  const supabase = createClient();
  
  const { data: user } = await supabase
    .from('user_profiles')
    .select('is_prime, role')
    .eq('id', userId)
    .single();
  
  if (!user) return false;
  
  // Prime/Admin/Executive/CEO get unlimited storage
  if (user.is_prime || ['admin', 'executive', 'ceo'].includes(user.role)) {
    return true;
  }
  
  // Free users: 100MB limit
  const currentUsage = await calculateStorageUsage(userId);
  const maxStorage = 104857600; // 100MB in bytes
  
  return (currentUsage + fileSize) <= maxStorage;
}

/**
 * Send internal message
 */
export async function sendInternalMessage(
  fromUserId: string | null,
  toUserId: string,
  subject: string,
  body: string,
  messageType: string = 'general'
) {
  const supabase = createClient();
  
  await supabase.from('user_messages').insert({
    from_user_id: fromUserId,
    to_user_id: toUserId,
    subject,
    body,
    message_type: messageType,
  });
}

/**
 * Get unread message count
 */
export async function getUnreadMessageCount(userId: string) {
  const supabase = createClient();
  
  const { count } = await supabase
    .from('user_messages')
    .select('*', { count: 'exact', head: true })
    .eq('to_user_id', userId)
    .eq('read', false);
  
  return count || 0;
}

/**
 * Mark message as read
 */
export async function markMessageAsRead(messageId: string) {
  const supabase = createClient();
  
  await supabase
    .from('user_messages')
    .update({
      read: true,
      read_at: new Date().toISOString(),
    })
    .eq('id', messageId);
}
