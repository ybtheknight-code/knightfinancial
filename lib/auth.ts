// ============================================================================
// KNIGHT FINANCIAL - AUTH UTILITIES
// Authentication and authorization helpers
// ============================================================================

import { createServerSupabaseClient } from './supabase';
import { UserProfile, UserRole } from '@/types';
import { redirect } from 'next/navigation';

/**
 * Get current user from server component
 */
export async function getServerUser(): Promise<UserProfile | null> {
  const supabase = await createServerSupabaseClient();
  
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
 * Require authentication - redirect if not logged in
 */
export async function requireAuth() {
  const user = await getServerUser();
  if (!user) {
    redirect('/login');
  }
  return user;
}

/**
 * Require specific role - redirect if insufficient permissions
 */
export async function requireRole(allowedRoles: UserRole[]) {
  const user = await requireAuth();
  
  if (!allowedRoles.includes(user.role)) {
    redirect('/dashboard');
  }
  
  return user;
}

/**
 * Require Prime membership
 */
export async function requirePrime() {
  const user = await requireAuth();
  
  const isPrime = user.is_prime || ['admin', 'executive', 'ceo'].includes(user.role);
  
  if (!isPrime) {
    redirect('/pricing');
  }
  
  return user;
}

/**
 * Check if user can access premium content
 */
export function canAccessPremium(user: UserProfile): boolean {
  return user.is_prime || ['admin', 'executive', 'ceo'].includes(user.role);
}

/**
 * Check if user can moderate
 */
export function canModerate(user: UserProfile): boolean {
  return ['admin', 'executive', 'ceo'].includes(user.role);
}

/**
 * Check if user can see analytics
 */
export function canSeeAnalytics(user: UserProfile): boolean {
  return ['executive', 'ceo'].includes(user.role);
}

/**
 * Check if user can modify other users
 */
export function canModifyUsers(user: UserProfile): boolean {
  return user.role === 'ceo';
}

/**
 * Check if user can delete specific user
 */
export function canDeleteUser(currentUser: UserProfile, targetUser: UserProfile): boolean {
  // CEO can delete anyone except themselves
  if (currentUser.role === 'ceo') {
    return targetUser.email !== process.env.NEXT_PUBLIC_CEO_EMAIL;
  }
  
  // Executives can delete admins
  if (currentUser.role === 'executive') {
    return targetUser.role === 'admin';
  }
  
  return false;
}

/**
 * Check if user is CEO
 */
export function isCEO(user: UserProfile): boolean {
  return user.role === 'ceo';
}

/**
 * Get role permissions
 */
export function getRolePermissions(role: UserRole): string[] {
  const permissions: Record<UserRole, string[]> = {
    ceo: [
      'view_all_data',
      'modify_users',
      'delete_users',
      'approve_intel_users',
      'moderate_content',
      'view_analytics',
      'access_premium',
      'send_broadcasts',
    ],
    executive: [
      'view_all_data',
      'delete_admins',
      'moderate_content',
      'view_analytics',
      'access_premium',
    ],
    admin: [
      'moderate_content',
      'respond_to_messages',
      'view_user_list',
      'access_premium',
    ],
    prime: [
      'access_premium',
    ],
    free: [],
  };
  
  return permissions[role];
}

/**
 * Check if user has specific permission
 */
export function hasPermission(user: UserProfile, permission: string): boolean {
  const permissions = getRolePermissions(user.role);
  return permissions.includes(permission);
}
