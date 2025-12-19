# 🏰 KNIGHT FINANCIAL - DEPLOYMENT GUIDE

## 🚀 QUICK DEPLOY (3 Steps)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Knight Financial Initial Deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/knight-financial.git
git push -u origin main
```

### Step 2: Setup Supabase
1. Go to https://supabase.com and create new project
2. Go to **Settings > API** and copy:
   - Project URL
   - anon public key
3. Go to **SQL Editor** and run the SQL from `database/KNIGHT-FINANCIAL-COMPLETE.sql`

### Step 3: Deploy to Vercel
1. Go to https://vercel.com
2. Click "Import Project" and select your GitHub repo
3. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL = [your supabase url]
   NEXT_PUBLIC_SUPABASE_ANON_KEY = [your supabase anon key]
   ```
4. Click Deploy!

---

## 🔑 CEO LOGIN

**URL:** `https://yoursite.com/ceo-access/KNIGHT2025`

This will:
- Auto-create CEO account (raheem@knightfin.org)
- Set role to CEO with all permissions
- Redirect to dashboard

**Or manual login:**
- Email: raheem@knightfin.org
- Password: KnightCEO2025!

---

## 💳 PAYPAL (Already Configured)

PayPal is pre-configured in the pricing page:
- Client ID: ATu37jGeO0-iGJU021IwMepTydlnlsJ7F9Xd8dHwnP5fAJUhvXMMA6BltRPOYbxd8538LJ_fSaJg-Fbu
- Plan ID: P-96788471AA430284MNFBBRRY
- Price: $19.99/month

---

## 📁 SUPABASE STORAGE BUCKET

After running the SQL, create a storage bucket:

1. Go to Supabase Dashboard > Storage
2. Click "New Bucket"
3. Name: `knight-vault`
4. Public: OFF
5. Click "Create"

Then add this policy in SQL Editor:
```sql
-- Allow authenticated users to upload to their own folder
CREATE POLICY "Users can upload own files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'knight-vault' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow authenticated users to read own files
CREATE POLICY "Users can read own files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'knight-vault' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow authenticated users to delete own files
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'knight-vault' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow admins to read all files
CREATE POLICY "Admins can read all files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'knight-vault' AND
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'executive', 'ceo')
  )
);
```

---

## ✅ POST-DEPLOY CHECKLIST

1. [ ] Visit `/ceo-access/KNIGHT2025` to create CEO account
2. [ ] Test registration with a new email
3. [ ] Test PayPal subscription on pricing page
4. [ ] Upload a test document to Vault
5. [ ] Create a community post
6. [ ] Check Admin panel at `/admin`

---

## 📞 SUPPORT

Knight Financial, LLC
404 Brown Street
Tuskegee, Alabama 36083

CEO: Raheem Sanders
📞 334-938-9171
📧 raheem@knightfin.org
