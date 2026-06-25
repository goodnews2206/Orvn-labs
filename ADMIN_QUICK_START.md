# Admin Setup - Quick Start (5 Minutes)

Get your admin account and dashboard running in 5 minutes.

---

## 🚀 Step 1: Create Your Admin Account (2 min)

### Go to Supabase
1. https://supabase.com
2. Select your project
3. Click **Authentication** (left sidebar)
4. Click **Users**
5. Click **Invite**
6. Enter your email: `your-email@company.com`
7. Click **Send invite**

### Check Your Email
1. Find the invite from Supabase
2. Click the link
3. Set your password (make it strong!)
4. Click **Confirm**
5. Done! ✅

---

## 🎯 Step 2: Login to Admin Dashboard (2 min)

### Start your dev server
```bash
npm run dev
```

### Go to admin login
```
http://localhost:5173/admin/login
```

### Enter credentials
- Email: The one you just invited
- Password: The one you set

### You should see
Dashboard with "New Post" button ✅

---

## ✍️ Step 3: Write Your First Post (1 min)

1. Click **New Post**
2. Enter title: "My First Blog Post"
3. Enter excerpt: "A short summary"
4. Select category: "Lead leakage" (or any)
5. Click in body and start typing
6. Use toolbar buttons to format:
   - **[B]** = Bold
   - **[I]** = Italic
   - **[H2]** = Heading
   - **[•]** = Bullet list
7. Toggle **"Publish Now"** ON
8. Click **Save Post**

### View your post
```
http://localhost:5173/blog
```

You should see it! 🎉

---

## 👥 Step 4: Add More Admins (Optional)

Repeat Step 1 for each team member:
1. Supabase → Authentication → Users → Invite
2. Enter their email
3. Send invite
4. They set their password
5. They can now login!

---

## 🔑 Environment Variables (Already Done!)

Check `.env.local` has:
```
✅ VITE_SUPABASE_URL
✅ VITE_SUPABASE_ANON_KEY
✅ SUPABASE_API_KEY
✅ SUPABASE_PROJECT_ID
✅ RESEND_API_KEY
✅ FROM_EMAIL
```

If anything is missing, follow `ENV_SETUP_GUIDE.md`.

---

## 📚 What's Next?

- 📖 Read `DASHBOARD_FEATURES_ROADMAP.md` for features to add
- 🎨 Read `WYSIWYG_EDITOR_GUIDE.md` to master the editor
- 🔐 Read `ADMIN_ACCOUNT_SETUP.md` to manage team

---

## 🆘 Troubleshooting

**Can't login?**
- Check email is correct in Supabase
- Check you clicked the invite link
- Try password reset

**Dashboard is blank?**
- Refresh the page (F5)
- Check browser console (F12) for errors
- Restart dev server

**Can't save post?**
- Check all required fields are filled
- Check database is set up (run SQL from `SUPABASE_SETUP.md`)
- Check env vars are correct

---

## ✅ You're Ready!

Congratulations! You now have:
- ✅ Admin account
- ✅ Working dashboard
- ✅ Published your first post
- ✅ Admin team setup (optional)

**Start writing amazing blog posts!** 🚀
