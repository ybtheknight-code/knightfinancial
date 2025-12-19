# ⚔️ KNIGHT FINANCIAL - FOR THE PEOPLE Credit Platform

**The World's First Consumer-Friendly Credit Reporting Platform**

Built by Raheem Sanders | CEO: raheem@knightfin.org | 334-938-9171

---

## 🏆 **WHAT IS KNIGHT FINANCIAL?**

Knight Financial is a **FinTech SaaS Platform** providing professional-grade credit management tools to consumers for FREE. We're building the future of credit reporting - one that actually FIGHTS FOR YOU.

### **Core Features:**
- ⚔️ **6 Knight Tools**: Scanner, Dispute Generator, Tracker, Decoder, Vault, Community
- 📚 **100+ Free Courses**: FCRA, Metro 2, Pro Se Litigation, Credit Law
- ✍️ **100+ Dispute Templates**: FCRA-compliant, court-ready letters
- 👥 **Social Platform**: Community for sharing victories and getting support
- 💎 **Knight Intel**: B2B data analytics (aggregated violation patterns)
- 🎮 **Gamification**: Points, badges, streaks, leaderboards

### **What Makes Us Different:**
1. **NOT a credit repair company** - We're a FinTech SaaS platform
2. **Brutally honest about data** - We tell you EXACTLY what we do with it
3. **Nuclear value for FREE** - 100+ courses, unlimited tools, no credit card
4. **Text the CEO directly** - 334-938-9171 (Raheem Sanders)

---

## 🚀 **TECH STACK**

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS (Black & Gold luxury theme)
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: Vercel (recommended) or any Next.js host
- **Email**: None (all internal messaging via platform)
- **Payments**: PayPal (via JotForm) + manual Prime upgrades

---

## 📦 **PROJECT STRUCTURE**

```
knight-financial-final/
├── app/                      # Next.js 15 App Router pages
│   ├── (auth)/              # Auth pages
│   │   ├── login/           # Login page
│   │   └── register/        # Registration + DATA PARTNERSHIP
│   ├── dashboard/           # User dashboard (role-based)
│   ├── profile/             # User profile with Prime visual upgrades
│   ├── tools/               # 6 Knight Tools
│   │   ├── scanner/         # Credit report analyzer
│   │   ├── dispute/         # Letter generator (100+ templates)
│   │   ├── tracker/         # Dispute deadline tracker
│   │   ├── decoder/         # Bureau response translator
│   │   └── vault/           # Document storage
│   ├── academy/             # 100+ courses (generated)
│   ├── community/           # Social platform
│   ├── resources/           # Document library
│   ├── messages/            # Internal messaging
│   ├── knight-intel/        # B2B data analytics
│   ├── admin/               # Admin panel (role-based access)
│   ├── pricing/             # Prime + paid services
│   ├── about/               # Company story
│   ├── contact/             # Contact information
│   ├── terms/               # Terms of Service
│   ├── privacy/             # Privacy Policy
│   └── api/                 # API routes
├── components/              # Reusable React components
├── lib/                     # Utilities
│   ├── supabase.ts          # Supabase client & helpers
│   ├── auth.ts              # Auth utilities
│   └── course-generator.ts  # Generates 100+ courses
├── types/                   # TypeScript interfaces
├── utils/                   # Helper functions
├── database/                # SQL schema & migrations
└── public/                  # Static assets
```

---

## 🛠️ **INSTALLATION & SETUP**

### **1. Prerequisites**
```bash
Node.js 18+ (LTS recommended)
npm or yarn
Supabase account (free tier works)
```

### **2. Clone & Install**
```bash
# Clone repository
cd knight-financial-final

# Install dependencies
npm install

# or with yarn
yarn install
```

### **3. Environment Variables**

Create `.env.local` in root:

```env
# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Knight Financial

# CEO Protection (CRITICAL)
CEO_PROTECTED_EMAIL=raheem@knightfin.org

# Support Contact
NEXT_PUBLIC_SUPPORT_EMAIL=support@knightfin.org
NEXT_PUBLIC_SUPPORT_PHONE=855-516-8003
NEXT_PUBLIC_CEO_PHONE=334-938-9171
NEXT_PUBLIC_CEO_EMAIL=raheem@knightfin.org

# Feature Flags
NEXT_PUBLIC_ENABLE_REGISTRATION=true
NEXT_PUBLIC_ENABLE_COMMUNITY=true
NEXT_PUBLIC_ENABLE_KNIGHT_INTEL=true

# Storage Limits
NEXT_PUBLIC_MAX_FILE_SIZE=52428800
NEXT_PUBLIC_FREE_STORAGE_LIMIT=104857600

# Pricing
NEXT_PUBLIC_PRIME_MONTHLY=19.99
NEXT_PUBLIC_PRIME_YEARLY=199.99

# JotForm Links (replace with your actual forms)
NEXT_PUBLIC_JOTFORM_STANDARD=https://form.jotform.com/your-standard-form
NEXT_PUBLIC_JOTFORM_PROFESSIONAL=https://form.jotform.com/your-professional-form
NEXT_PUBLIC_JOTFORM_EXECUTIVE=https://form.jotform.com/your-executive-form
```

### **4. Database Setup**

```bash
# 1. Create Supabase project at https://supabase.com

# 2. Run the complete schema
# Copy contents of /database/KNIGHT-FINANCIAL-COMPLETE.sql
# Paste into Supabase SQL Editor
# Execute (this creates 30+ tables, triggers, functions, RLS policies)

# 3. Verify CEO account was created:
# Email: raheem@knightfin.org
# Password: @Yahusha13
# (Change password after first login!)

# 4. Set up storage buckets in Supabase Dashboard:
#    - user_documents (private)
#    - resources (public)
#    - community_avatars (public)
```

### **5. Run Development Server**

```bash
npm run dev
# or
yarn dev

# Open http://localhost:3000
```

---

## 🚢 **DEPLOYMENT (Vercel - RECOMMENDED)**

### **Step 1: Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit - Knight Financial"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/knight-financial.git
git push -u origin main
```

### **Step 2: Deploy to Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add Environment Variables (all from `.env.local`)

6. Deploy!

### **Step 3: Post-Deployment**

1. Update `NEXT_PUBLIC_SITE_URL` to your Vercel URL
2. Update Supabase Auth redirect URLs:
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Add: `https://your-domain.vercel.app/auth/callback`

3. Test CEO login:
   - Email: raheem@knightfin.org
   - Password: @Yahusha13
   - **CHANGE PASSWORD IMMEDIATELY**

---

## 🔐 **SECURITY & ADMIN ACCESS**

### **User Roles (Hierarchical)**
1. **💎 CEO** - Full control, cannot be modified/deleted
2. **👑 Executive** - Everything except user modification
3. **🔴 Admin** - Moderation, basic access
4. **⭐ Prime** - Premium features
5. **⚔️ Alpha** - Free tier (default)

### **CEO Account Protection**
- Database trigger prevents modification/deletion
- Email: raheem@knightfin.org (protected)
- Auto-created during schema execution
- Only CEO can modify other users' roles

### **How to Create Additional Admins**
1. User signs up normally
2. CEO logs in → Admin Panel → Users
3. Find user, change role to "Admin" or "Executive"

---

## 💳 **PAYMENTS & PRIME UPGRADES**

### **How It Works:**
1. User purchases service via JotForm (Standard/$199, Professional/$599, Executive/$2,399)
2. JotForm payment confirmation sent to user's email
3. User sends internal message: "I bought [service], upgrade me to Prime"
4. Message auto-flagged as "Service Purchase Request"
5. CEO manually upgrades user to Prime (lifetime)

### **Manual Prime Upgrade (CEO):**
```
1. Admin Panel → Users
2. Find user by email/name
3. Click "Grant Prime" button
4. Confirm
```

### **Why Manual?**
- No complex payment infrastructure needed
- CEO reviews each purchase
- Prevents fraud
- Simple and reliable

---

## 📊 **FEATURES BREAKDOWN**

### **Knight Scanner**
- Uploads credit reports (PDF/PNG/JPG)
- Identifies FCRA violations
- Health score calculation
- Violation categorization by bureau

### **Knight Dispute**
- 100+ templates (Alpha)
- 200+ templates (Prime)
- Categories: Basic, FCRA, Metro 2, CFPB, Court, etc.
- Auto-fills with user data
- USPS-ready format

### **Knight Tracker**
- Tracks dispute deadlines (30-day auto-calculation)
- Status management (pending, resolved, overdue)
- Bureau organization
- Automated reminders

### **Knight Decoder**
- Translates bureau responses
- Identifies key terms ("verified as accurate", "deleted", etc.)
- Action recommendations
- Pattern recognition

### **Knight Vault**
- 100MB storage (Alpha)
- Unlimited storage (Prime)
- Category organization
- Secure file uploads

### **Community**
- Reddit-style social platform
- Posts with tags [Victory], [Question], [Help]
- Upvotes, comments, sharing
- Points displayed next to username
- Role badges

### **Academy**
- 100 courses generated programmatically
- Categories: FCRA, Metro 2, Legal, Credit, Business
- HTML-based (HeyGen videos added later by CEO)
- Progress tracking
- Completion badges

### **Knight Intel (B2B)**
- Aggregated violation data
- Geographic heatmaps
- Demographic insights (anonymized)
- Bureau response patterns
- CEO approval required
- NDA + custom pricing

### **Gamification**
- Points for every action
- 10 badge types
- Login streaks
- Leaderboard (top 100)
- Rank display

---

## 🎨 **DESIGN SYSTEM**

### **Colors**
- **Primary**: #FFD700 (Knight Gold)
- **Background**: #000000 (Pure Black)
- **Card**: #0a0a0a
- **Hover**: #1a1a1a
- **Border**: #2a2a2a

### **Typography**
- **Font**: Inter (sans-serif)
- **Headings**: Bold, gradient gold
- **Body**: Regular, white/gray

### **Components**
- Buttons: Gold, Gold Outline, Black, Danger
- Cards: Standard, Premium (gold gradient)
- Badges: Roles, Points, Achievements
- Inputs: Gold border, black background

### **Prime Visual Upgrades**
- Gold particle effects
- Glowing borders
- Premium badges
- Smoother animations
- Enhanced color gradients
- Exclusive styling options

---

## 🧪 **TESTING**

```bash
# Run dev server
npm run dev

# Test accounts:
# CEO: raheem@knightfin.org / @Yahusha13
# (Create additional test users via /register)

# Test flows:
1. Registration → Data Partnership Agreement
2. Login → Dashboard
3. Scanner → Upload report
4. Dispute → Generate letter
5. Community → Create post
6. Messages → Send message
7. Admin Panel → User management (CEO only)
```

---

## 📝 **TODO / FUTURE ENHANCEMENTS**

### **Phase 1: Launch (COMPLETE)**
- ✅ Core platform
- ✅ 6 Knight Tools
- ✅ 100+ courses
- ✅ Community
- ✅ Admin panel
- ✅ Prime system

### **Phase 2: Automation (Next)**
- [ ] Stripe integration for auto-billing
- [ ] Email notifications (SendGrid/AWS SES)
- [ ] Automated Prime upgrades
- [ ] CRON jobs for deadline reminders

### **Phase 3: Advanced Features**
- [ ] Knight AI (actual LLM integration)
- [ ] Advanced analytics dashboards
- [ ] Mobile app (React Native)
- [ ] API for third-party integrations

### **Phase 4: Scale**
- [ ] Become actual CRA (Credit Reporting Agency)
- [ ] Launch credit cards
- [ ] Launch loans
- [ ] Full credit bureau alternative

---

## 🐛 **TROUBLESHOOTING**

### **Issue: Database connection fails**
- Verify Supabase credentials in `.env.local`
- Check project is not paused (Supabase free tier pauses after inactivity)
- Verify RLS policies are enabled

### **Issue: CEO can't login**
- Verify CEO account exists: `SELECT * FROM user_profiles WHERE email = 'raheem@knightfin.org'`
- Password is case-sensitive: `@Yahusha13`
- Check bcrypt hash was generated correctly

### **Issue: File uploads fail**
- Verify storage buckets exist in Supabase
- Check bucket permissions (public vs private)
- Verify file size limits

### **Issue: Styles not loading**
- Clear `.next` folder: `rm -rf .next`
- Restart dev server: `npm run dev`
- Check Tailwind config

---

## 📞 **SUPPORT**

**CEO:** Raheem Sanders  
📧 raheem@knightfin.org  
📱 334-938-9171 (Text!)

**Technical Support:**  
📧 support@knightfin.org  
☎️ 855-516-8003

**Address:**  
Knight Financial, LLC  
404 Brown Street  
Tuskegee, AL 36083

---

## ⚖️ **LEGAL**

Knight Financial is a FinTech SaaS platform. We are **NOT**:
- A law firm
- A credit repair organization
- Financial advisors
- Credit counselors

We provide SOFTWARE TOOLS. Users do their own work.

All users must agree to our Data Partnership Agreement, which clearly states we collect data for:
- Building lawsuits against credit bureaus
- Selling aggregated data to law firms, researchers
- Creating a better Credit Reporting Agency

We're brutally honest about data usage. If you're uncomfortable, don't use the platform.

---

## 🏆 **CREDITS**

**Built by:** Raheem Sanders (CEO)  
**Founded by:** Di'Ondre Mathis Sr. (President), Raheem Sanders  
**Team:** Di'Ondre Mathis Jr. (Director of Media)

**Special Thanks:**
- Hope Miller (Miller v. TransUnion co-plaintiff)
- Diyana Mathis (Miller v. TransUnion co-plaintiff)
- All Knight Financial users fighting for their rights

**Powered by:** Young Black Excellence 💎

---

## 📄 **LICENSE**

Proprietary. All rights reserved.  
© 2025 Knight Financial, LLC

---

**🚀 Ready to deploy? Follow the steps above and let's change the credit industry forever!**

**FOR THE PEOPLE ⚔️💎**
