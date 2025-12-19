// ============================================================================
// KNIGHT FINANCIAL - TYPESCRIPT TYPES
// Complete type definitions for all database tables and entities
// ============================================================================

// Database Enums
export type UserRole = 'free' | 'prime' | 'admin' | 'executive' | 'ceo';
export type MessageType = 'general' | 'service_purchase' | 'lawyer_request' | 'knight_intel_request' | 'bug_report' | 'feature_request' | 'account_issue' | 'community_report';
export type IntelUserType = 'law_firm' | 'data_company' | 'college' | 'journalist' | 'researcher' | 'other';
export type BadgeType = 'first_victory' | 'perfectionist' | 'scholar' | 'warrior' | 'streak_master' | 'community_leader' | 'data_partner' | 'scanner_pro' | 'decoder_expert' | 'elite';

// User Profile
export interface UserProfile {
  id: string;
  email: string;
  password_hash: string;
  role: UserRole;
  is_prime: boolean;
  
  // Personal Info
  first_name?: string;
  last_name?: string;
  phone?: string;
  dob?: string;
  address?: string;
  ssn_last_4?: string;
  
  // Profile
  username?: string;
  avatar_url?: string;
  bio?: string;
  
  // Gamification
  points: number;
  badges: BadgeType[];
  streak_count: number;
  last_login?: string;
  
  // Stats
  forms_completed: number;
  courses_completed: number;
  disputes_generated: number;
  
  // Data Partnership
  data_partnership_agreed: boolean;
  data_partnership_date?: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

// Blocked Entities
export interface BlockedEmail {
  id: string;
  email: string;
  reason?: string;
  blocked_at: string;
  blocked_by?: string;
}

export interface BlockedPhone {
  id: string;
  phone: string;
  reason?: string;
  blocked_at: string;
  blocked_by?: string;
}

// User Document (Vault)
export interface UserDocument {
  id: string;
  user_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  storage_path: string;
  category?: string;
  description?: string;
  uploaded_at: string;
}

// Storage Usage
export interface StorageUsage {
  user_id: string;
  total_bytes: number;
  total_mb: number;
  last_calculated: string;
}

// User Message
export interface UserMessage {
  id: string;
  from_user_id?: string;
  to_user_id?: string;
  subject?: string;
  body: string;
  message_type: MessageType;
  read: boolean;
  read_at?: string;
  flagged: boolean;
  attachment_urls?: string[];
  created_at: string;
}

// Intel Form
export interface IntelForm {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category?: string;
  questions: FormQuestion[];
  points_value: number;
  icon?: string;
  order_index: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FormQuestion {
  id: string;
  type: 'text' | 'email' | 'phone' | 'number' | 'date' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'signature';
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: string;
}

// Intel Submission
export interface IntelSubmission {
  id: string;
  user_id: string;
  form_id: string;
  form_slug: string;
  answers: Record<string, any>;
  signature?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

// Academy Course
export interface AcademyCourse {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category?: string;
  premium: boolean;
  icon?: string;
  estimated_duration?: number;
  difficulty?: string;
  points_value: number;
  order_index: number;
  active: boolean;
  total_lessons: number;
  total_enrollments: number;
  created_at: string;
  updated_at: string;
}

// Academy Lesson
export interface AcademyLesson {
  id: string;
  course_id: string;
  slug: string;
  title: string;
  content: string;
  video_url?: string;
  video_duration?: number;
  points_value: number;
  order_index: number;
  created_at: string;
  updated_at: string;
}

// Academy Progress
export interface AcademyProgress {
  id: string;
  user_id: string;
  course_id?: string;
  lesson_id?: string;
  completed: boolean;
  progress_percent: number;
  started_at: string;
  completed_at?: string;
}

// Resource Document
export interface ResourceDocument {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category?: string;
  file_url?: string;
  storage_path?: string;
  file_type?: string;
  file_size?: number;
  premium: boolean;
  icon?: string;
  order_index: number;
  active: boolean;
  download_count: number;
  created_at: string;
  updated_at: string;
}

// Resource Download
export interface ResourceDownload {
  id: string;
  user_id?: string;
  resource_id: string;
  downloaded_at: string;
}

// Scanner Report
export interface ScannerReport {
  id: string;
  user_id: string;
  report_file_id?: string;
  violations_found: Violation[];
  health_score: number;
  created_at: string;
}

export interface Violation {
  type: string;
  severity: 'low' | 'medium' | 'high';
  creditor: string;
  account_number?: string;
  description: string;
  impact: number;
  recommendation: string;
}

// Dispute Letter
export interface DisputeLetter {
  id: string;
  user_id: string;
  bureau: string;
  template_used: string;
  items_disputed: DisputeItem[];
  letter_content: string;
  sent: boolean;
  sent_date?: string;
  created_at: string;
}

export interface DisputeItem {
  creditor: string;
  account_number?: string;
  issue_type: string;
  details?: string;
}

// Dispute Tracking
export interface DisputeTracking {
  id: string;
  user_id: string;
  letter_id?: string;
  bureau: string;
  items?: string;
  date_filed: string;
  method: string;
  status: string;
  deadline?: string;
  response_date?: string;
  outcome?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Decoder Analysis
export interface DecoderAnalysis {
  id: string;
  user_id: string;
  response_text: string;
  bureau?: string;
  terms_found: DecodedTerm[];
  recommendations: string[];
  created_at: string;
}

export interface DecodedTerm {
  term: string;
  meaning: string;
  action: string;
  category: 'good' | 'neutral' | 'bad';
}

// Community Post
export interface CommunityPost {
  id: string;
  user_id: string;
  title: string;
  body: string;
  tags: string[];
  image_urls?: string[];
  likes_count: number;
  comments_count: number;
  views_count: number;
  flagged: boolean;
  flagged_reason?: string;
  deleted: boolean;
  deleted_by?: string;
  created_at: string;
  updated_at: string;
  
  // Joined data
  user?: UserProfile;
}

// Community Comment
export interface CommunityComment {
  id: string;
  post_id: string;
  user_id: string;
  parent_comment_id?: string;
  body: string;
  likes_count: number;
  flagged: boolean;
  deleted: boolean;
  created_at: string;
  updated_at: string;
  
  // Joined data
  user?: UserProfile;
  replies?: CommunityComment[];
}

// Community Like
export interface CommunityLike {
  id: string;
  user_id: string;
  post_id?: string;
  comment_id?: string;
  created_at: string;
}

// Knight Intel User
export interface KnightIntelUser {
  id: string;
  user_id?: string;
  company_name: string;
  company_type: IntelUserType;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  approved: boolean;
  approved_by?: string;
  approved_at?: string;
  full_access: boolean;
  full_access_granted_at?: string;
  nda_signed: boolean;
  nda_signed_at?: string;
  created_at: string;
}

// Points History
export interface PointsHistory {
  id: string;
  user_id: string;
  points: number;
  reason: string;
  reference_type?: string;
  reference_id?: string;
  created_at: string;
}

// Leaderboard Entry
export interface LeaderboardEntry {
  id: string;
  username?: string;
  avatar_url?: string;
  role: UserRole;
  points: number;
  badges: BadgeType[];
  rank: number;
}

// Admin Action
export interface AdminAction {
  id: string;
  admin_id: string;
  action_type: string;
  target_type?: string;
  target_id?: string;
  reason?: string;
  details?: Record<string, any>;
  created_at: string;
}

// Moderation Queue
export interface ModerationQueueItem {
  id: string;
  item_type: string;
  item_id: string;
  reported_by?: string;
  reason: string;
  details?: string;
  status: string;
  reviewed_by?: string;
  reviewed_at?: string;
  action_taken?: string;
  created_at: string;
}

// User Stats
export interface UserStats {
  total_points: number;
  total_badges: number;
  forms_completed: number;
  courses_completed: number;
  posts_created: number;
  comments_created: number;
  disputes_generated: number;
  rank: number;
}

// Badge Info
export interface BadgeInfo {
  type: BadgeType;
  name: string;
  description: string;
  icon: string;
  requirement: string;
}

// Role Info
export interface RoleInfo {
  role: UserRole;
  name: string;
  icon: string;
  color: string;
  description: string;
  permissions: string[];
}

// Helper Functions
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

export function getBadgeInfo(type: BadgeType): BadgeInfo {
  const badges: Record<BadgeType, BadgeInfo> = {
    first_victory: {
      type: 'first_victory',
      name: 'First Victory',
      description: 'Successfully deleted your first account',
      icon: '🏆',
      requirement: 'Delete 1 inaccurate account',
    },
    perfectionist: {
      type: 'perfectionist',
      name: 'Perfectionist',
      description: 'Achieved 100% course completion rate',
      icon: '💯',
      requirement: 'Complete all enrolled courses',
    },
    scholar: {
      type: 'scholar',
      name: 'Scholar',
      description: 'Completed 10 or more courses',
      icon: '🎓',
      requirement: 'Complete 10 courses',
    },
    warrior: {
      type: 'warrior',
      name: 'Warrior',
      description: 'Generated 10 or more dispute letters',
      icon: '⚔️',
      requirement: 'Generate 10 disputes',
    },
    streak_master: {
      type: 'streak_master',
      name: 'Streak Master',
      description: 'Maintained a 30-day login streak',
      icon: '🔥',
      requirement: 'Login 30 days in a row',
    },
    community_leader: {
      type: 'community_leader',
      name: 'Community Leader',
      description: 'Created 100 or more community posts',
      icon: '🌟',
      requirement: 'Create 100 posts',
    },
    data_partner: {
      type: 'data_partner',
      name: 'Data Partner',
      description: 'Completed all Knight Intel forms',
      icon: '💎',
      requirement: 'Complete all Intel forms',
    },
    scanner_pro: {
      type: 'scanner_pro',
      name: 'Scanner Pro',
      description: 'Scanned 50 or more credit reports',
      icon: '📊',
      requirement: 'Scan 50 reports',
    },
    decoder_expert: {
      type: 'decoder_expert',
      name: 'Decoder Expert',
      description: 'Decoded 20 or more bureau responses',
      icon: '🔍',
      requirement: 'Decode 20 responses',
    },
    elite: {
      type: 'elite',
      name: 'Elite',
      description: 'Reached 10,000+ points',
      icon: '👑',
      requirement: 'Earn 10,000 points',
    },
  };
  return badges[type];
}

export function formatPoints(points: number): string {
  if (points >= 1000000) {
    return `${(points / 1000000).toFixed(1)}M`;
  } else if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}K`;
  }
  return points.toString();
}

export function canAccessPremium(user: UserProfile | null): boolean {
  if (!user) return false;
  return user.is_prime || ['admin', 'executive', 'ceo'].includes(user.role);
}

export function canModerate(user: UserProfile | null): boolean {
  if (!user) return false;
  return ['admin', 'executive', 'ceo'].includes(user.role);
}

export function canSeeAnalytics(user: UserProfile | null): boolean {
  if (!user) return false;
  return ['executive', 'ceo'].includes(user.role);
}

export function canModifyUsers(user: UserProfile | null): boolean {
  if (!user) return false;
  return user.role === 'ceo';
}

export function isCEO(user: UserProfile | null): boolean {
  return user?.role === 'ceo';
}

// Knight Intel Analytics (for B2B dashboard)
export interface KnightIntelAnalytics {
  total_users: number;
  total_violations: number;
  violations_by_bureau: {
    transunion: number;
    equifax: number;
    experian: number;
  };
  common_violations: Array<{
    type: string;
    count: number;
  }>;
  success_rate: number;
  emotional_impact: {
    avg_distress_score: number;
    anxiety_rate: number;
    depression_rate: number;
    relationship_strain: number;
    job_impact: number;
  };
  financial_harm: {
    avg_score_drop: number;
    total_denials: number;
    total_interest_paid: number;
    bankruptcies: number;
    foreclosures: number;
  };
  geographic_data: Array<{
    state: string;
    violation_count: number;
  }>;
  response_patterns: {
    avg_response_time: number;
    verified_rate: number;
    deleted_rate: number;
    modified_rate: number;
    no_response_rate: number;
  };
}
