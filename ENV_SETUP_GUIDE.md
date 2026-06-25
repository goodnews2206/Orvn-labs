# Environment Variables Setup Guide

This guide explains each environment variable and how to get the values.

---

## 📋 Quick Copy-Paste Format

Once you have all values, create `.env.local` and paste this template:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_API_KEY=your-service-role-key-here
SUPABASE_PROJECT_ID=your-project-id
RESEND_API_KEY=re_xxxxx
FROM_EMAIL=hello@orvnlabs.com
SHEET_WEBHOOK_URL=your-webhook-url
SLACK_WEBHOOK_URL=your-slack-webhook
```

---

## 🔴 REQUIRED (Must Have)

### `VITE_SUPABASE_URL`
**What it is:** Your Supabase database URL  
**Where to get it:**
1. Go to https://supabase.com
2. Create/select your project
3. Click **Settings** (gear icon)
4. Click **API**
5. Copy **Project URL** (looks like: `https://xxxxx.supabase.co`)

**Example:**
```
VITE_SUPABASE_URL=https://abcdef123456.supabase.co
```

**Safe to expose?** ✅ Yes (frontend)

---

### `VITE_SUPABASE_ANON_KEY`
**What it is:** Public key for unauthenticated requests  
**Where to get it:**
1. Same location as above (Settings → API)
2. Copy **anon public** key (long string starting with `eyJ...`)

**Example:**
```
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJl...
```

**Safe to expose?** ✅ Yes (frontend)

---

### `SUPABASE_API_KEY`
**What it is:** Secret key for server-side operations  
**Where to get it:**
1. Settings → API
2. Copy **service_role secret** (long string)
3. ⚠️ **KEEP THIS COMPLETELY SECRET** ⚠️

**Example:**
```
SUPABASE_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZi...
```

**Safe to expose?** ❌ NO - Server side only!

**Where to use:**
- API endpoints in `/api/` folder
- Never in `.jsx` files
- Never in browser console

---

### `SUPABASE_PROJECT_ID`
**What it is:** Your unique project identifier  
**Where to get it:**
1. Settings → General
2. Copy **Project ID** (short code like `abcdef123456`)

**Example:**
```
SUPABASE_PROJECT_ID=abcdef123456
```

**Safe to expose?** ⚠️ Semi-safe (not critical)

---

### `RESEND_API_KEY`
**What it is:** API key for sending emails  
**Where to get it:**
1. Go to https://resend.com
2. Create account (free tier available)
3. Go to **API Keys**
4. Copy your API key (starts with `re_`)

**Example:**
```
RESEND_API_KEY=re_abc123xyz789
```

**Safe to expose?** ❌ NO - Keep secret!

**Used for:**
- Sending welcome emails to newsletter subscribers
- Sending admin notifications

---

### `FROM_EMAIL`
**What it is:** Email address to send from  
**Where to get it:**
1. In Resend dashboard, find **Sender Email**
2. Usually: `noreply@yourdomain.com` or `hello@yourdomain.com`
3. Must be verified in Resend

**Example:**
```
FROM_EMAIL=hello@orvnlabs.com
```

**Safe to expose?** ✅ Yes (it's public)

---

## 🟡 OPTIONAL (Nice to Have)

### `SHEET_WEBHOOK_URL`
**What it is:** Webhook to log signups to Google Sheets  
**Where to get it:**
1. Create Google Sheet
2. Go to Extensions → Apps Script
3. Paste this code:
   ```javascript
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSheet();
     const data = JSON.parse(e.postData.contents);
     sheet.appendRow([
       new Date(),
       data.email,
       data.source || 'unknown'
     ]);
     return ContentService.createTextOutput(JSON.stringify({ok: true}));
   }
   ```
4. Deploy → New deployment → Web app
5. Copy the deployment URL
6. Add `/usercontent` to the end

**Example:**
```
SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbw1234567890/usercontent
```

**Safe to expose?** ⚠️ Better to keep it secret

**Used for:**
- Logging all newsletter signups
- Tracking where signups come from

---

### `SLACK_WEBHOOK_URL`
**What it is:** Webhook to post notifications to Slack  
**Where to get it:**
1. Go to your Slack workspace
2. Settings → Apps → App Directory
3. Search for "Incoming Webhooks"
4. Click "Add to Slack"
5. Select channel (e.g., #notifications)
6. Copy the Webhook URL

**Example:**
```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXX
```

**Safe to expose?** ❌ NO - Keep secret!

**Used for:**
- Notify you when someone signs up
- Real-time alerts

---

## 🟢 RARELY NEEDED

### `VERCEL_ENV`
**What it is:** Deployment environment  
**Only needed if:** Using Vercel  
**Value:** `production` or `development`

```
VERCEL_ENV=production
```

---

### `VERCEL_GIT_COMMIT_SHA`
**What it is:** Git commit hash  
**Only needed if:** Using Vercel  
**Auto-populated by:** Vercel (you don't set this)

---

## 🚀 Step-by-Step Setup

### 1. Create Supabase Project (5 minutes)
```bash
# 1. Visit https://supabase.com
# 2. Click "New Project"
# 3. Fill in:
#    - Project name: orvn-blog (or your name)
#    - Database password: (generate strong password)
#    - Region: (pick closest to you)
# 4. Click "Create new project"
# 5. Wait 2 minutes for setup
# 6. Go to Settings → API
# 7. Copy and save:
#    - Project URL
#    - anon public key
#    - service_role secret
#    - Project ID
```

### 2. Create Resend Account (2 minutes)
```bash
# 1. Visit https://resend.com
# 2. Sign up with email
# 3. Verify email
# 4. Go to API Keys
# 5. Copy your key (starts with re_)
# 6. Add sender email
```

### 3. Create `.env.local` (1 minute)
```bash
# Copy .env.example to .env.local
cp .env.example .env.local

# Open .env.local and fill in values from steps 1-2
# On Mac/Linux: nano .env.local
# On Windows: notepad .env.local
```

### 4. Verify Setup (1 minute)
```bash
# Try to run dev server
npm run dev

# If you see no errors about missing env vars, you're good!
```

---

## ✅ Checklist

Before you start the app, check:

- [ ] `.env.local` file exists (NOT `.env.example`)
- [ ] `VITE_SUPABASE_URL` is filled in
- [ ] `VITE_SUPABASE_ANON_KEY` is filled in
- [ ] `SUPABASE_API_KEY` is filled in
- [ ] `SUPABASE_PROJECT_ID` is filled in
- [ ] `RESEND_API_KEY` is filled in
- [ ] `FROM_EMAIL` is filled in
- [ ] `.env.local` is in `.gitignore` (never commit secrets!)

---

## 🚨 Common Mistakes

### ❌ Wrong: Using `.env.example` directly
```bash
# DON'T do this:
VITE_SUPABASE_URL=https://your-project.supabase.co  # This won't work!
```

### ✅ Right: Replace with actual values
```bash
# DO this:
VITE_SUPABASE_URL=https://abcdef123456.supabase.co  # Real value!
```

### ❌ Wrong: Committing `.env.local`
```bash
git add .env.local  # DON'T! Will expose secrets!
```

### ✅ Right: Only commit `.env.example`
```bash
git add .env.example  # OK! Has placeholder values
```

### ❌ Wrong: Mixing up the keys
```bash
# DON'T expose the service_role secret in frontend!
VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR... # WRONG!
```

### ✅ Right: Use anon key in frontend
```bash
# DO use anon key in frontend:
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR... # Correct!
```

---

## 📝 For Vercel Deployment

When you deploy to Vercel:

1. Push your code to GitHub (DON'T commit `.env.local`)
2. Go to Vercel dashboard
3. Select your project
4. Go to **Settings** → **Environment Variables**
5. Add each variable from `.env.local`:
   - `VITE_SUPABASE_URL=...`
   - `VITE_SUPABASE_ANON_KEY=...`
   - `SUPABASE_API_KEY=...`
   - etc.
6. Re-deploy

Vercel will automatically inject these when building.

---

## 🔒 Security Tips

1. **Never commit secrets**
   - Add `.env.local` to `.gitignore`
   - Only commit `.env.example`

2. **Rotate keys regularly**
   - If you think someone saw your key, regenerate it

3. **Use different keys per environment**
   - Development key
   - Staging key
   - Production key

4. **Monitor key usage**
   - Check Supabase logs
   - Check Resend logs
   - Set up alerts

5. **Don't share keys in chat/email**
   - Only share via secure channels
   - Use secret management tools (1Password, LastPass)

---

## ❓ FAQ

**Q: Where is `.env.local`?**  
A: In your project root, same level as `package.json`

**Q: Can I use `.env` instead of `.env.local`?**  
A: No, the app looks for `.env.local`. Create that file.

**Q: What if I don't have all values?**  
A: Only `VITE_SUPABASE_*` and `SUPABASE_*` are required. Email is optional for local development.

**Q: Can I see my keys after I create them?**  
A: Some keys (Supabase) you can regenerate. Some (Resend) you need to copy immediately. Save them!

**Q: What if I lost my key?**  
A: Regenerate it in the dashboard. The old one will stop working.

**Q: Should I share `.env.example`?**  
A: Yes! It shows what variables are needed, with placeholder values.

---

That's it! You're ready to set up your environment. 🚀
