-- ============================================================================
-- KNIGHT FINANCIAL - COMPLETE DATABASE SCHEMA
-- The World's First FOR THE PEOPLE Credit Reporting Platform
-- ============================================================================
-- CEO: Raheem Sanders (raheem@knightfin.org)
-- Built: December 2025
-- Purpose: Ethical FinTech SaaS + Data Analytics + Social Media Platform
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE user_role AS ENUM ('free', 'prime', 'admin', 'executive', 'ceo');
CREATE TYPE message_type AS ENUM ('general', 'service_purchase', 'lawyer_request', 'knight_intel_request', 'bug_report', 'feature_request', 'account_issue', 'community_report');
CREATE TYPE intel_user_type AS ENUM ('law_firm', 'data_company', 'college', 'journalist', 'researcher', 'other');
CREATE TYPE badge_type AS ENUM ('first_victory', 'perfectionist', 'scholar', 'warrior', 'streak_master', 'community_leader', 'data_partner', 'scanner_pro', 'decoder_expert', 'elite');

-- ============================================================================
-- CORE USER TABLES
-- ============================================================================

-- User Profiles (main user table)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,  -- NULLABLE: Supabase Auth handles passwords in auth.users table
    role user_role NOT NULL DEFAULT 'free',
    is_prime BOOLEAN DEFAULT FALSE,
    
    -- Personal Info
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    dob DATE,
    address TEXT,
    ssn_last_4 TEXT,
    
    -- Unique User ID (like u/yahbrel123)
    username TEXT UNIQUE,
    
    -- Profile
    avatar_url TEXT,
    bio TEXT,
    
    -- Gamification
    points INTEGER DEFAULT 0,
    badges badge_type[] DEFAULT '{}',
    streak_count INTEGER DEFAULT 0,
    last_login TIMESTAMP,
    
    -- Stats
    forms_completed INTEGER DEFAULT 0,
    courses_completed INTEGER DEFAULT 0,
    disputes_generated INTEGER DEFAULT 0,
    
    -- Data Partnership
    data_partnership_agreed BOOLEAN DEFAULT FALSE,
    data_partnership_date TIMESTAMP,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Blocked Emails (scam prevention)
CREATE TABLE blocked_emails (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    reason TEXT,
    blocked_at TIMESTAMP DEFAULT NOW(),
    blocked_by UUID REFERENCES user_profiles(id)
);

-- Blocked Phones (scam prevention)
CREATE TABLE blocked_phones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone TEXT UNIQUE NOT NULL,
    reason TEXT,
    blocked_at TIMESTAMP DEFAULT NOW(),
    blocked_by UUID REFERENCES user_profiles(id)
);

-- ============================================================================
-- KNIGHT VAULT (STORAGE)
-- ============================================================================

CREATE TABLE user_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- File Info
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT NOT NULL, -- bytes
    storage_path TEXT NOT NULL,
    
    -- Categorization
    category TEXT, -- 'credit_report', 'denial_letter', 'id_document', 'court_doc', etc.
    description TEXT,
    
    -- Timestamps
    uploaded_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT valid_file_size CHECK (file_size <= 52428800) -- 50MB per file
);

-- Storage usage tracking
CREATE TABLE storage_usage (
    user_id UUID PRIMARY KEY REFERENCES user_profiles(id) ON DELETE CASCADE,
    total_bytes BIGINT DEFAULT 0,
    total_mb DECIMAL(10,2) GENERATED ALWAYS AS (total_bytes / 1048576.0) STORED,
    last_calculated TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- MESSAGING SYSTEM (INTERNAL ONLY)
-- ============================================================================

CREATE TABLE user_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- From/To
    from_user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    to_user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- Message
    subject TEXT,
    body TEXT NOT NULL,
    message_type message_type DEFAULT 'general',
    
    -- Status
    read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    flagged BOOLEAN DEFAULT FALSE,
    
    -- Reply (for admin responses)
    reply_body TEXT,
    replied_at TIMESTAMP,
    replied_by UUID REFERENCES user_profiles(id),
    
    -- Attachments
    attachment_urls TEXT[],
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW()
);

-- Index for unread messages
CREATE INDEX idx_messages_unread ON user_messages(to_user_id, read) WHERE NOT read;
CREATE INDEX idx_messages_from ON user_messages(from_user_id);
CREATE INDEX idx_messages_to ON user_messages(to_user_id);
CREATE INDEX idx_messages_type ON user_messages(message_type);

-- ============================================================================
-- KNIGHT INTEL (FORMS SYSTEM)
-- ============================================================================

-- Form Definitions
CREATE TABLE intel_forms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT, -- 'core', 'emotional', 'financial', 'legal', 'victory'
    
    -- Form Structure (JSON)
    questions JSONB NOT NULL, -- Array of question objects
    
    -- Gamification
    points_value INTEGER DEFAULT 10,
    
    -- Display
    icon TEXT,
    order_index INTEGER DEFAULT 0,
    
    -- Status
    active BOOLEAN DEFAULT TRUE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Form Submissions
CREATE TABLE intel_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    form_id UUID NOT NULL REFERENCES intel_forms(id) ON DELETE CASCADE,
    form_slug TEXT NOT NULL,
    
    -- Submission Data
    answers JSONB NOT NULL, -- Key-value pairs of answers
    signature TEXT, -- Base64 signature if applicable
    
    -- Status
    completed BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


-- ============================================================================
-- KNIGHT ACADEMY (EDUCATION)
-- ============================================================================

-- Courses
CREATE TABLE academy_courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT, -- 'fcra', 'credit', 'legal', 'business', etc.
    
    -- Access
    premium BOOLEAN DEFAULT FALSE, -- TRUE = Prime only
    
    -- Content
    icon TEXT,
    estimated_duration INTEGER, -- minutes
    difficulty TEXT, -- 'beginner', 'intermediate', 'advanced'
    
    -- Gamification
    points_value INTEGER DEFAULT 50,
    
    -- Display
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    
    -- Stats
    total_lessons INTEGER DEFAULT 0,
    total_enrollments INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Lessons
CREATE TABLE academy_lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES academy_courses(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    
    -- Content (HTML)
    content TEXT NOT NULL,
    
    -- Optional Video (you'll add later with HeyGen)
    video_url TEXT,
    video_duration INTEGER, -- seconds
    
    -- Gamification
    points_value INTEGER DEFAULT 10,
    
    -- Display
    order_index INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(course_id, slug)
);

-- Progress Tracking
CREATE TABLE academy_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    course_id UUID REFERENCES academy_courses(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES academy_lessons(id) ON DELETE CASCADE,
    
    -- Progress
    completed BOOLEAN DEFAULT FALSE,
    progress_percent INTEGER DEFAULT 0,
    
    -- Timestamps
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    
    UNIQUE(user_id, lesson_id)
);

-- ============================================================================
-- RESOURCES LIBRARY
-- ============================================================================

CREATE TABLE resource_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT, -- 'credit', 'legal', 'financial', 'business', 'templates'
    
    -- File
    file_url TEXT, -- URL if external
    storage_path TEXT, -- Storage path if internal
    file_type TEXT, -- 'pdf', 'docx', 'xlsx', 'txt'
    file_size BIGINT,
    
    -- Access
    premium BOOLEAN DEFAULT FALSE,
    
    -- Display
    icon TEXT,
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    
    -- Stats
    download_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Download Tracking
CREATE TABLE resource_downloads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    resource_id UUID NOT NULL REFERENCES resource_documents(id) ON DELETE CASCADE,
    
    -- Tracking
    downloaded_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- KNIGHT TOOLS (SCANNER, DISPUTE, TRACKER, DECODER)
-- ============================================================================

-- Scanner Reports
CREATE TABLE scanner_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- Report Data
    report_file_id UUID REFERENCES user_documents(id),
    violations_found JSONB, -- Array of violation objects
    health_score INTEGER, -- 0-100
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW()
);

-- Dispute Letters
CREATE TABLE dispute_letters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- Letter Data
    bureau TEXT NOT NULL, -- 'TransUnion', 'Equifax', 'Experian'
    template_used TEXT NOT NULL,
    items_disputed JSONB, -- Array of disputed items
    letter_content TEXT NOT NULL,
    
    -- Status
    sent BOOLEAN DEFAULT FALSE,
    sent_date DATE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW()
);

-- Dispute Tracking
CREATE TABLE dispute_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    letter_id UUID REFERENCES dispute_letters(id) ON DELETE CASCADE,
    
    -- Tracking
    bureau TEXT NOT NULL,
    items TEXT,
    date_filed DATE NOT NULL,
    method TEXT, -- 'mail', 'online', 'phone'
    
    -- Status
    status TEXT DEFAULT 'pending', -- 'pending', 'response_received', 'resolved', 'overdue'
    deadline DATE, -- Auto-calculated: date_filed + 30 days
    response_date DATE,
    outcome TEXT, -- 'deleted', 'verified', 'updated', etc.
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE decoder_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- Input
    response_text TEXT NOT NULL,
    bureau TEXT,
    
    -- Analysis Results
    terms_found JSONB, -- Array of term objects with meanings
    recommendations JSONB, -- Array of recommended actions
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- COMMUNITY (SOCIAL PLATFORM)
-- ============================================================================

-- Posts
CREATE TABLE community_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- Content
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    tags TEXT[], -- ['Victory', 'Question', 'Help', 'Legal', 'Resources']
    
    -- Media
    image_urls TEXT[],
    
    -- Stats
    likes INTEGER DEFAULT 0,  -- Simple like count
    likes_count INTEGER DEFAULT 0,  -- Alias for compatibility
    comments_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    
    -- Status
    pinned BOOLEAN DEFAULT FALSE,  -- Pinned by moderators
    flagged BOOLEAN DEFAULT FALSE,
    flagged_reason TEXT,
    deleted BOOLEAN DEFAULT FALSE,
    deleted_by UUID REFERENCES user_profiles(id),
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Partial index for active posts (created separately)
CREATE INDEX idx_posts_active ON community_posts(deleted) WHERE NOT deleted;

-- Comments
CREATE TABLE community_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES community_comments(id) ON DELETE CASCADE, -- For nested replies
    parent_comment_id UUID REFERENCES community_comments(id) ON DELETE CASCADE, -- Alias
    
    -- Content
    body TEXT NOT NULL,
    
    -- Stats
    likes INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,  -- Alias
    
    -- Status
    flagged BOOLEAN DEFAULT FALSE,
    deleted BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE community_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
    comment_id UUID REFERENCES community_comments(id) ON DELETE CASCADE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- Constraints: Like either post OR comment, not both
    CONSTRAINT like_target CHECK (
        (post_id IS NOT NULL AND comment_id IS NULL) OR
        (post_id IS NULL AND comment_id IS NOT NULL)
    ),
    
    -- Unique: User can only like once per post/comment
    UNIQUE(user_id, post_id),
    UNIQUE(user_id, comment_id)
);
    



-- ============================================================================
-- KNIGHT INTEL B2B (DATA ANALYTICS PORTAL)
-- ============================================================================

CREATE TABLE knight_intel_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- Company Info
    company_name TEXT NOT NULL,
    company_type intel_user_type NOT NULL,
    contact_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    
    -- Access
    approved BOOLEAN DEFAULT FALSE,
    approved_by UUID REFERENCES user_profiles(id),
    approved_at TIMESTAMP,
    full_access BOOLEAN DEFAULT FALSE, -- Preview vs Full
    full_access_granted_at TIMESTAMP,
    
    -- NDA
    nda_signed BOOLEAN DEFAULT FALSE,
    nda_signed_at TIMESTAMP,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- GAMIFICATION
-- ============================================================================

-- Points History (audit trail)
CREATE TABLE points_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- Points
    points INTEGER NOT NULL,
    reason TEXT NOT NULL,
    
    -- Reference (optional)
    reference_type TEXT, -- 'form', 'course', 'lesson', 'post', etc.
    reference_id UUID,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW()
);

-- Leaderboard (materialized view for performance)
CREATE MATERIALIZED VIEW leaderboard AS
SELECT 
    u.id,
    u.username,
    u.avatar_url,
    u.role,
    u.points,
    u.badges,
    ROW_NUMBER() OVER (ORDER BY u.points DESC) as rank
FROM user_profiles u
WHERE u.role != 'ceo' -- CEO doesn't compete
ORDER BY u.points DESC
LIMIT 100;

-- Refresh leaderboard function (call this periodically)
CREATE OR REPLACE FUNCTION refresh_leaderboard()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW leaderboard;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ADMIN & MODERATION
-- ============================================================================

-- Admin Actions (audit trail)
CREATE TABLE admin_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES user_profiles(id),
    action_type TEXT NOT NULL, -- 'delete_post', 'ban_user', 'approve_intel', etc.
    target_type TEXT, -- 'user', 'post', 'comment'
    target_id UUID,
    reason TEXT,
    details JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE moderation_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Item
    item_type TEXT NOT NULL, -- 'post', 'comment', 'user'
    item_id UUID NOT NULL,
    
    -- Report
    reported_by UUID REFERENCES user_profiles(id),
    reason TEXT NOT NULL,
    details TEXT,
    
    -- Status
    status TEXT DEFAULT 'pending', -- 'pending', 'reviewed', 'actioned', 'dismissed'
    reviewed_by UUID REFERENCES user_profiles(id),
    reviewed_at TIMESTAMP,
    action_taken TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- TRIGGERS & FUNCTIONS
-- ============================================================================

-- CEO Protection Trigger
CREATE OR REPLACE FUNCTION prevent_ceo_modification()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.email = 'raheem@knightfin.org' THEN
        RAISE EXCEPTION 'Cannot modify or delete CEO account';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER protect_ceo_account
BEFORE UPDATE OR DELETE ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION prevent_ceo_modification();

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER intel_forms_updated_at BEFORE UPDATE ON intel_forms FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER intel_submissions_updated_at BEFORE UPDATE ON intel_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER academy_courses_updated_at BEFORE UPDATE ON academy_courses FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER academy_lessons_updated_at BEFORE UPDATE ON academy_lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER dispute_tracking_updated_at BEFORE UPDATE ON dispute_tracking FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER community_posts_updated_at BEFORE UPDATE ON community_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER community_comments_updated_at BEFORE UPDATE ON community_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Storage tracking trigger
CREATE OR REPLACE FUNCTION update_storage_usage()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO storage_usage (user_id, total_bytes)
        VALUES (NEW.user_id, NEW.file_size)
        ON CONFLICT (user_id) DO UPDATE
        SET total_bytes = storage_usage.total_bytes + NEW.file_size,
            last_calculated = NOW();
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE storage_usage
        SET total_bytes = GREATEST(total_bytes - OLD.file_size, 0),
            last_calculated = NOW()
        WHERE user_id = OLD.user_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER storage_usage_trigger
AFTER INSERT OR DELETE ON user_documents
FOR EACH ROW
EXECUTE FUNCTION update_storage_usage();

-- Auto-generate username from email
CREATE OR REPLACE FUNCTION generate_username()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.username IS NULL THEN
        NEW.username = 'u/' || SUBSTRING(NEW.email FROM 1 FOR POSITION('@' IN NEW.email) - 1) || 
                       '_' || SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_username_trigger
BEFORE INSERT ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION generate_username();

-- Auto-calculate dispute deadline
CREATE OR REPLACE FUNCTION calculate_dispute_deadline()
RETURNS TRIGGER AS $$
BEGIN
    NEW.deadline = NEW.date_filed + INTERVAL '30 days';
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER dispute_deadline_trigger
BEFORE INSERT OR UPDATE OF date_filed ON dispute_tracking
FOR EACH ROW
EXECUTE FUNCTION calculate_dispute_deadline();

-- Update post stats when comment added/deleted
CREATE OR REPLACE FUNCTION update_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE community_posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE community_posts SET comments_count = GREATEST(comments_count - 1, 0) WHERE id = OLD.post_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER post_comment_count_trigger
AFTER INSERT OR DELETE ON community_comments
FOR EACH ROW
EXECUTE FUNCTION update_post_comment_count();

-- Update post/comment like counts
CREATE OR REPLACE FUNCTION update_like_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.post_id IS NOT NULL THEN
            UPDATE community_posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
        ELSIF NEW.comment_id IS NOT NULL THEN
            UPDATE community_comments SET likes_count = likes_count + 1 WHERE id = NEW.comment_id;
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.post_id IS NOT NULL THEN
            UPDATE community_posts SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.post_id;
        ELSIF OLD.comment_id IS NOT NULL THEN
            UPDATE community_comments SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.comment_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER like_counts_trigger
AFTER INSERT OR DELETE ON community_likes
FOR EACH ROW
EXECUTE FUNCTION update_like_counts();

-- Award points and update user stats
CREATE OR REPLACE FUNCTION award_points(
    p_user_id UUID,
    p_points INTEGER,
    p_reason TEXT,
    p_reference_type TEXT DEFAULT NULL,
    p_reference_id UUID DEFAULT NULL
)
RETURNS void AS $$
BEGIN
    -- Add to points history
    INSERT INTO points_history (user_id, points, reason, reference_type, reference_id)
    VALUES (p_user_id, p_points, p_reason, p_reference_type, p_reference_id);
    
    -- Update user's total points
    UPDATE user_profiles
    SET points = points + p_points
    WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE intel_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE scanner_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispute_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispute_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE decoder_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_likes ENABLE ROW LEVEL SECURITY;

-- Users can view their own data
CREATE POLICY user_own_data ON user_profiles FOR SELECT USING (auth.uid() = id);

-- CRITICAL: Users must be able to INSERT their own profile during registration
CREATE POLICY user_insert_own_profile ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Users can UPDATE their own profile
CREATE POLICY user_update_own_profile ON user_profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY user_own_documents ON user_documents FOR ALL USING (auth.uid() = user_id);
CREATE POLICY user_own_messages ON user_messages FOR ALL USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);
CREATE POLICY user_own_intel ON intel_submissions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY user_own_progress ON academy_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY user_own_scanner ON scanner_reports FOR ALL USING (auth.uid() = user_id);
CREATE POLICY user_own_disputes ON dispute_letters FOR ALL USING (auth.uid() = user_id);
CREATE POLICY user_own_tracking ON dispute_tracking FOR ALL USING (auth.uid() = user_id);
CREATE POLICY user_own_decoder ON decoder_analyses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY user_own_likes ON community_likes FOR ALL USING (auth.uid() = user_id);

-- Community: Everyone can view non-deleted posts/comments
CREATE POLICY community_view_posts ON community_posts FOR SELECT USING (NOT deleted);
CREATE POLICY community_view_comments ON community_comments FOR SELECT USING (NOT deleted);

-- Community: Users can create/edit/delete their own posts/comments
CREATE POLICY community_own_posts ON community_posts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY community_own_comments ON community_comments FOR ALL USING (auth.uid() = user_id);

-- Admins/Executives/CEO can see everything
CREATE POLICY admin_all_access ON user_profiles FOR ALL USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() AND role IN ('admin', 'executive', 'ceo')
    )
);

-- Public read access for courses/lessons/resources
ALTER TABLE academy_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY public_courses ON academy_courses FOR SELECT USING (active = TRUE);
CREATE POLICY public_lessons ON academy_lessons FOR SELECT USING (TRUE);
CREATE POLICY public_resources ON resource_documents FOR SELECT USING (active = TRUE);

-- ============================================================================
-- INITIAL CEO ACCOUNT
-- ============================================================================
-- IMPORTANT: Supabase Auth manages passwords separately from this table.
-- 
-- To create the CEO account:
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Click "Add User" and create user with email: raheem@knightfin.org
-- 3. Copy the UUID from the newly created user
-- 4. Replace 'YOUR-UUID-HERE' below with that UUID and run this INSERT
-- ============================================================================

-- UNCOMMENT AND UPDATE UUID AFTER CREATING USER IN SUPABASE AUTH DASHBOARD:
/*
INSERT INTO user_profiles (
    id,  -- MUST match the UUID from auth.users
    email,
    role,
    is_prime,
    first_name,
    last_name,
    phone,
    username,
    points,
    data_partnership_agreed,
    data_partnership_date
) VALUES (
    'YOUR-UUID-HERE',  -- Get this from auth.users after creating user
    'raheem@knightfin.org',
    'ceo',
    TRUE,
    'Raheem',
    'Sanders',
    '334-938-9171',
    'u/CEO',
    999999,
    TRUE,
    NOW()
) ON CONFLICT (email) DO NOTHING;
*/

-- ============================================================================
-- STORAGE BUCKETS (for Supabase Storage)
-- ============================================================================

-- Run these in Supabase Storage UI:
-- 1. Create bucket: user_documents (PRIVATE)
-- 2. Create bucket: resources (PUBLIC)
-- 3. Create bucket: community_avatars (PUBLIC)

-- Storage policies will be set up separately in Supabase UI

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON user_profiles(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_users_points ON user_profiles(points DESC);

CREATE INDEX IF NOT EXISTS idx_posts_user_created ON community_posts(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_created ON community_comments(post_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_messages_unread_to ON user_messages(to_user_id, created_at DESC) WHERE NOT read;

CREATE INDEX IF NOT EXISTS idx_intel_user_form ON intel_submissions(user_id, form_id);

CREATE INDEX IF NOT EXISTS idx_progress_user_course ON academy_progress(user_id, course_id);

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

-- Get user stats
CREATE OR REPLACE FUNCTION get_user_stats(p_user_id UUID)
RETURNS TABLE (
    total_points INTEGER,
    total_badges INTEGER,
    forms_completed INTEGER,
    courses_completed INTEGER,
    posts_created INTEGER,
    comments_created INTEGER,
    disputes_generated INTEGER,
    rank INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.points,
        COALESCE(array_length(u.badges, 1), 0),
        u.forms_completed,
        u.courses_completed,
        (SELECT COUNT(*)::INTEGER FROM community_posts WHERE user_id = p_user_id AND NOT deleted),
        (SELECT COUNT(*)::INTEGER FROM community_comments WHERE user_id = p_user_id AND NOT deleted),
        u.disputes_generated,
        (SELECT COUNT(*)::INTEGER + 1 FROM user_profiles WHERE points > u.points)
    FROM user_profiles u
    WHERE u.id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SUCCESS!
-- ============================================================================
-- Database schema created successfully!
-- Next steps:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Create storage buckets in Supabase Storage
-- 3. Set up storage policies
-- 4. Start building the Next.js app!
-- ============================================================================


-- ============================================================================
-- FORM SUBMISSIONS - B2B Data Collection
-- ============================================================================
CREATE TABLE form_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- Form Info
    form_id TEXT NOT NULL,
    form_category TEXT NOT NULL,
    form_name TEXT NOT NULL,
    
    -- Data (JSONB for flexibility)
    data JSONB NOT NULL,
    
    -- Points
    points_awarded INTEGER DEFAULT 0,
    
    -- B2B Flags
    exported BOOLEAN DEFAULT FALSE,
    exported_at TIMESTAMP,
    exported_to TEXT, -- Company name
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- CREDIT REPORTS & DISPUTE LETTERS STORAGE (The Data Jackpot)
-- ============================================================================
CREATE TABLE uploaded_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- Document Info
    document_type TEXT NOT NULL, -- 'credit_report', 'dispute_letter', 'bureau_response', 'adverse_action', 'other'
    file_name TEXT NOT NULL,
    file_size INTEGER,
    file_type TEXT, -- 'pdf', 'png', 'jpg', etc.
    storage_path TEXT NOT NULL, -- Supabase storage path
    
    -- Metadata
    bureau TEXT, -- 'transunion', 'equifax', 'experian'
    report_date DATE,
    description TEXT,
    
    -- Processing Status
    processed BOOLEAN DEFAULT FALSE,
    processed_at TIMESTAMP,
    extracted_data JSONB, -- OCR/parsed data
    
    -- B2B Flags
    anonymized BOOLEAN DEFAULT FALSE,
    included_in_dataset BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
    



-- ============================================================================
-- SUPABASE STORAGE BUCKETS (Run in Supabase Dashboard > Storage)
-- ============================================================================
-- Note: These must be created manually in Supabase Dashboard

-- BUCKET: user-documents (PRIVATE)
-- For: Credit reports, dispute letters, bureau responses, ID documents
-- Policy: Users can only access their own files
-- INSERT INTO storage.buckets (id, name, public) VALUES ('user-documents', 'user-documents', false);

-- BUCKET: community-avatars (PUBLIC) 
-- For: User profile pictures
-- Policy: Anyone can view, only owner can upload
-- INSERT INTO storage.buckets (id, name, public) VALUES ('community-avatars', 'community-avatars', true);

-- ============================================================================
-- STORAGE POLICIES (Run after creating buckets)
-- ============================================================================

-- Users can upload to their own folder
-- CREATE POLICY "Users can upload own documents"
-- ON storage.objects FOR INSERT
-- WITH CHECK (bucket_id = 'user-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Users can view their own files
-- CREATE POLICY "Users can view own documents"
-- ON storage.objects FOR SELECT
-- USING (bucket_id = 'user-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Users can delete their own files
-- CREATE POLICY "Users can delete own documents"
-- ON storage.objects FOR DELETE
-- USING (bucket_id = 'user-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Admins can view all documents (for Data Vault)
-- CREATE POLICY "Admins can view all documents"
-- ON storage.objects FOR SELECT
-- USING (
--   bucket_id = 'user-documents' 
--   AND EXISTS (
--     SELECT 1 FROM user_profiles 
--     WHERE id = auth.uid() 
--     AND role IN ('admin', 'executive', 'ceo')
--   )
-- );
