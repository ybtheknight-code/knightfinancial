// ============================================================================
// KNIGHT FINANCIAL - UTILITY FUNCTIONS
// Common helpers used throughout the application
// ============================================================================

import { BadgeType, UserRole } from '@/types';

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

/**
 * Format points with K/M suffix
 */
export function formatPoints(points: number): string {
  if (points >= 1000000) {
    return `${(points / 1000000).toFixed(1)}M`;
  } else if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}K`;
  }
  return points.toString();
}

/**
 * Format bytes to human readable
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const then = typeof date === 'string' ? new Date(date) : date;
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };
  
  for (const [name, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value);
    if (count >= 1) {
      return `${count} ${name}${count !== 1 ? 's' : ''} ago`;
    }
  }
  
  return 'Just now';
}

/**
 * Format date to short format
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format date to full format
 */
export function formatDateFull(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format phone number
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone;
}

/**
 * Truncate text
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// ============================================================================
// ROLE & BADGE UTILITIES
// ============================================================================

/**
 * Get role badge info
 */
export function getRoleBadge(role: UserRole): { icon: string; label: string; className: string } {
  const badges: Record<UserRole, { icon: string; label: string; className: string }> = {
    ceo: { icon: '💎', label: 'CEO', className: 'role-ceo' },
    executive: { icon: '👑', label: 'EXECUTIVE', className: 'role-executive' },
    admin: { icon: '🔴', label: 'ADMIN', className: 'role-admin' },
    prime: { icon: '⭐', label: 'PRIME', className: 'role-prime' },
    free: { icon: '⚔️', label: 'ALPHA', className: 'role-free' },
  };
  return badges[role];
}

/**
 * Get badge info
 */
export function getBadgeInfo(type: BadgeType) {
  const badges: Record<BadgeType, { name: string; icon: string; description: string }> = {
    first_victory: { name: 'First Victory', icon: '🏆', description: 'Deleted first account' },
    perfectionist: { name: 'Perfectionist', icon: '💯', description: '100% course completion' },
    scholar: { name: 'Scholar', icon: '🎓', description: 'Completed 10 courses' },
    warrior: { name: 'Warrior', icon: '⚔️', description: 'Generated 10 disputes' },
    streak_master: { name: 'Streak Master', icon: '🔥', description: '30-day login streak' },
    community_leader: { name: 'Community Leader', icon: '🌟', description: '100 posts created' },
    data_partner: { name: 'Data Partner', icon: '💎', description: 'All forms completed' },
    scanner_pro: { name: 'Scanner Pro', icon: '📊', description: 'Scanned 50 reports' },
    decoder_expert: { name: 'Decoder Expert', icon: '🔍', description: 'Decoded 20 responses' },
    elite: { name: 'Elite', icon: '👑', description: '10,000+ points earned' },
  };
  return badges[type] || { name: 'Unknown', icon: '?', description: '' };
}

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return regex.test(email);
}

/**
 * Validate phone
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || (cleaned.length === 11 && cleaned[0] === '1');
}

/**
 * Validate SSN (last 4 digits)
 */
export function isValidSSN(ssn: string): boolean {
  const cleaned = ssn.replace(/\D/g, '');
  return cleaned.length === 4;
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 7) {
    errors.push('Password must be at least 7 characters');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const KNIGHT_CONSTANTS = {
  // Site Info
  SITE_NAME: 'Knight Financial',
  SITE_TAGLINE: "The World's First FOR THE PEOPLE Credit Reporting Platform",
  SITE_URL: 'https://knightfinancialofficial.vercel.app',
  
  // Contact - THE ONLY COMPANY WHERE YOU CAN REACH THE CEO DIRECTLY!
  CEO_NAME: 'Raheem Sanders',
  CEO_EMAIL: 'raheem@knightfin.org',
  CEO_PHONE: '334-938-9171',  // TEXT THE CEO DIRECTLY!
  SUPPORT_EMAIL: 'support@knightfin.org',
  SUPPORT_PHONE: '855-516-8003',
  
  // Address
  COMPANY_ADDRESS: '404 Brown Street, Tuskegee, AL 36083',
  
  // Storage Limits
  FREE_STORAGE_LIMIT: 104857600, // 100MB
  MAX_FILE_SIZE: 52428800, // 50MB
  
  // Points Values
  POINTS: {
    // Daily Actions
    LOGIN: 5,
    DAILY_STREAK_BONUS: 10,
    PROFILE_COMPLETE: 25,
    
    // Forms (varies by form)
    FORM_COMPLETE_MIN: 15,
    FORM_COMPLETE_MAX: 200,
    
    // Academy
    LESSON_COMPLETE: 10,
    COURSE_COMPLETE: 50,
    ACADEMY_STREAK_3: 25,
    ACADEMY_STREAK_7: 100,
    
    // Tools
    SCAN_REPORT: 25,
    GENERATE_DISPUTE: 15,
    TRACK_DISPUTE: 10,
    DECODE_RESPONSE: 10,
    UPLOAD_DOCUMENT: 5,
    
    // Community
    POST_CREATE: 5,
    POST_QUALITY_BONUS: 25, // Awarded by mods
    COMMENT_CREATE: 2,
    LIKE_RECEIVE: 1,
    COMMENT_RECEIVE: 2,
    HELPFUL_VOTE: 5,
    
    // Engagement
    SHARE_POST: 3,
    DOWNLOAD_RESOURCE: 2,
    DOWNLOAD_TEMPLATE: 3,
    VIEW_TUTORIAL: 5,
    
    // Milestones
    VICTORY: 100,
    LAWSUIT_FILED: 150,
    LAWSUIT_WON: 300,
    SETTLEMENT_REACHED: 200,
    ITEMS_DELETED: 50,
    
    // Social
    REFERRAL: 200,
    INVITE_SENT: 10,
    FRIEND_JOINS: 100,
    
    // Special
    MILLER_CASE_QUALIFY: 500,
    TESTIMONIAL_APPROVED: 150,
    BETA_TESTER: 250,
  },
  
  // Prime Pricing
  PRIME_MONTHLY: 19.99,
  PRIME_ANNUAL: 199.99,
  
  // JotForm Links
  JOTFORM_STANDARD: 'https://form.jotform.com/253493603801051',
  JOTFORM_PROFESSIONAL: 'https://form.jotform.com/253493613919062',
  JOTFORM_EXECUTIVE: 'https://form.jotform.com/253493757778074',
  
  // Paid Service Prices
  SERVICE_STANDARD: 250,
  SERVICE_PROFESSIONAL: 500,
  SERVICE_EXECUTIVE: 2500,
  
  // Bureaus
  BUREAUS: ['TransUnion', 'Equifax', 'Experian', 'Innovis'],
  
  // Message Types
  MESSAGE_TYPES: {
    GENERAL: 'general',
    SERVICE_PURCHASE: 'service_purchase',
    LAWYER_REQUEST: 'lawyer_request',
    KNIGHT_INTEL_REQUEST: 'knight_intel_request',
    BUG_REPORT: 'bug_report',
    FEATURE_REQUEST: 'feature_request',
    ACCOUNT_ISSUE: 'account_issue',
    COMMUNITY_REPORT: 'community_report',
  },
  
  // Community Tags
  COMMUNITY_TAGS: ['Victory', 'Question', 'Help', 'Legal', 'Resources', 'Discussion'],
  
  // Dispute Methods
  DISPUTE_METHODS: ['mail', 'online', 'phone'],
  
  // Response Time
  SUPPORT_RESPONSE_TIME: '72 hours',
  DISPUTE_DEADLINE_DAYS: 30,
};

// ============================================================================
// URL UTILITIES
// ============================================================================

/**
 * Get base URL
 */
export function getBaseURL(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

/**
 * Build URL with query params
 */
export function buildURL(path: string, params?: Record<string, string>): string {
  const base = getBaseURL();
  const url = new URL(path, base);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  
  return url.toString();
}

// ============================================================================
// STORAGE UTILITIES
// ============================================================================

/**
 * Get storage color based on usage percentage
 */
export function getStorageColor(usedBytes: number, limitBytes: number): string {
  const percent = (usedBytes / limitBytes) * 100;
  
  if (percent >= 90) return 'text-red-400';
  if (percent >= 70) return 'text-yellow-400';
  return 'text-green-400';
}

/**
 * Get storage progress color for progress bar
 */
export function getStorageProgressColor(usedBytes: number, limitBytes: number): string {
  const percent = (usedBytes / limitBytes) * 100;
  
  if (percent >= 90) return 'bg-red-500';
  if (percent >= 70) return 'bg-yellow-500';
  return 'bg-green-500';
}

// ============================================================================
// ARRAY UTILITIES
// ============================================================================

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Shuffle array
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Group array by key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const value = String(item[key]);
    if (!groups[value]) {
      groups[value] = [];
    }
    groups[value].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

// ============================================================================
// ERROR UTILITIES
// ============================================================================

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: any): string {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.error?.message) return error.error.message;
  return 'An unexpected error occurred';
}

/**
 * Handle Supabase error
 */
export function handleSupabaseError(error: any): string {
  const message = getErrorMessage(error);
  
  // Map common Supabase errors to friendly messages
  if (message.includes('unique constraint')) {
    return 'This email or username is already taken';
  }
  if (message.includes('invalid email')) {
    return 'Please enter a valid email address';
  }
  if (message.includes('password')) {
    return 'Password is too weak or invalid';
  }
  
  return message;
}

// ============================================================================
// MISC UTILITIES
// ============================================================================

/**
 * Generate random ID
 */
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Sleep/delay function
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
