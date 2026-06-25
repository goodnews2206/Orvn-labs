# Environment Variables - Quick Reference Card

## 🔴 MUST HAVE (Required to Run)

| Variable | Where to Get | Example | Safe? |
|----------|-------------|---------|-------|
| `VITE_SUPABASE_URL` | Supabase → Settings → API | `https://abc123.supabase.co` | ✅ Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Settings → API | `eyJhbGciOi...` | ✅ Yes |
| `SUPABASE_API_KEY` | Supabase → Settings → API → service_role | `eyJhbGciOi...` | ❌ NO |
| `SUPABASE_PROJECT_ID` | Supabase → Settings → General | `abc123xyz` | ⚠️ Semi |

## 🟡 NICE TO HAVE (Optional)

| Variable | Where to Get | Example | Safe? |
|----------|-------------|---------|-------|
| `RESEND_API_KEY` | Resend → API Keys | `re_abc123...` | ❌ NO |
| `FROM_EMAIL` | Resend → Sender Email | `hello@domain.com` | ✅ Yes |
| `SHEET_WEBHOOK_URL` | Google Apps Script | `https://script.google.com/...` | ⚠️ Semi |
| `SLACK_WEBHOOK_URL` | Slack → Incoming Webhooks | `https://hooks.slack.com/...` | ❌ NO |

---

## 🚀 5-Minute Setup

### 1. Get Supabase Keys (2 min)
```
Visit: https://supabase.com
Create project → Settings → API
Copy: URL, anon key, service role key, project ID
```

### 2. Get Resend Key (1 min)
```
Visit: https://resend.com
Sign up → API Keys
Copy: API key
```

### 3. Create `.env.local` (2 min)
```bash
# Copy template:
VITE_SUPABASE_URL=https://your-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_API_KEY=your-service-role-key
SUPABASE_PROJECT_ID=your-project-id
RESEND_API_KEY=re_your-key
FROM_EMAIL=hello@domain.com
```

---

## ⚠️ Safety Rules

- ✅ **Safe to expose:** Variables with `VITE_` prefix
- ❌ **NEVER expose:** `SUPABASE_API_KEY`, `RESEND_API_KEY`, webhook URLs
- 🚫 **Never commit:** `.env.local` file
- ✅ **Always commit:** `.env.example` file
- 🔐 **Keep secret:** Any key or token

---

## 📍 File Locations

**Supabase Keys:**
```
Supabase Dashboard
├── Settings (gear icon)
├── API
├── Project URL ← Copy this
├── Anon key ← Copy this
├── Service role secret ← Copy this
└── General
    └── Project ID ← Copy this
```

**Resend Keys:**
```
Resend Dashboard
├── API Keys ← Copy key
└── Sender Email ← Use this
```

---

## ✅ Before You Start

```bash
# 1. Create .env.local (NOT .env.example!)
cp .env.example .env.local

# 2. Fill in values from Supabase and Resend

# 3. Verify it's in .gitignore
cat .gitignore | grep .env.local

# 4. Try running the app
npm run dev

# If no env var errors → You're good! ✅
```

---

## 🆘 Troubleshooting

**Error: "VITE_SUPABASE_URL is not defined"**
- Check if `.env.local` exists (not `.env.example`)
- Reload the dev server

**Error: "Cannot POST /api/blog/list"**
- Check if `SUPABASE_API_KEY` is set
- Restart dev server

**Error: "Email failed to send"**
- Check if `RESEND_API_KEY` is correct
- Check if `FROM_EMAIL` is verified in Resend

---

## 📋 Copy-Paste Template

Save this and fill in your actual values:

```
# From Supabase Settings → API
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_API_KEY=
SUPABASE_PROJECT_ID=

# From Resend
RESEND_API_KEY=
FROM_EMAIL=

# Optional
SHEET_WEBHOOK_URL=
SLACK_WEBHOOK_URL=
```

---

That's it! You now know everything you need about environment variables. 🎉
