# Dynamic Blog System Setup Guide

Your blog system is now **fully dynamic** with a complete admin dashboard. Here's everything you need to know.

## 📋 What's Been Built

### 1. **Database (Supabase)**
- PostgreSQL table: `blog_posts`
- Image storage: `blog-images` bucket
- Row-level security (RLS) policies for auth
- Automatic timestamps and indexes for performance

### 2. **Backend APIs** (`/api/blog/`)
- `GET /api/blog/list` - List all published posts with filtering/pagination
- `GET /api/blog/post?slug=xxx` - Get single post + related posts
- `GET /api/blog/categories` - Get all categories
- `POST /api/blog/admin/create` - Create new post (auth required)
- `PUT /api/blog/admin/update?slug=xxx` - Update post (auth required)
- `DELETE /api/blog/admin/delete?slug=xxx` - Delete post (auth required)

### 3. **Admin Dashboard**
- **Login**: `/admin/login` (email/password)
- **Dashboard**: `/admin/blog` (list all posts, bulk actions)
- **Editor**: `/admin/blog/create` (new post)
- **Editor**: `/admin/blog/edit/:slug` (edit existing)
- Full markdown support with image uploads
- Draft/Publish toggle
- Auto-calculated read time

### 4. **Frontend (Dynamic)**
- **Blog list**: `/blog` (fetches from API, category filtering)
- **Post page**: `/blog/:slug` (fetches from API, shows related posts)
- Loading states, error handling, retry logic
- All categories loaded dynamically

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Click "New Project"
3. Fill in:
   - **Project name**: `orvn-blog` (or whatever)
   - **Database password**: Generate something strong
   - **Region**: Choose closest to you
4. Click "Create new project" (takes 1-2 minutes)

### Step 2: Get Your Credentials
Once your project is ready:
1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key
3. Save these to `.env.local`:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your-a
   ```

### Step 3: Run the SQL Setup
1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy-paste the entire SQL from `SUPABASE_SETUP.md` (in the Supabase setup file provided)
4. Click **Run**
5. Verify: You should see `blog_posts` table in **Tables** (left sidebar)

### Step 4: Create Admin User
1. In Supabase, go to **Authentication** → **Users**
2. Click **Invite**
3. Enter your email and click **Send invite**
4. Check your email, click the link
5. Set a password
6. You're now an admin user!

### Step 5: Test the Admin Dashboard
1. Start your dev server: `npm run dev`
2. Go to `http://localhost:5173/admin/login`
3. Sign in with your email/password
4. You should see the empty dashboard

### Step 6: Create Your First Post
1. Click **New Post**
2. Fill in:
   - Title: "My First Blog Post"
   - Excerpt: "A short summary"
   - Category: Pick one
   - Body: Write in markdown
   - Upload featured image (optional)
   - Toggle "Publish Now"
3. Click **Save Post**
4. Visit `/blog` to see it!

---

## 🎯 Key Features

### Admin Dashboard (`/admin/blog`)
- **Table view** of all posts (draft + published)
- **Edit button** - update any post
- **Delete button** - remove posts (confirms first)
- **Publish toggle** - switch between draft/published
- **New Post button** - create fresh content

### Blog Editor (`/admin/blog/create` or `/admin/blog/edit/:slug`)
- **Title field** - auto-slugifies for URL
- **Excerpt** - 2-sentence summary
- **Category dropdown** - choose from 8 predefined categories
- **Markdown editor** - full support:
  - `## Headings`
  - `- Bullet points`
  - `**bold**`, `*italic*`
  - `[links](url)`
- **Featured image upload** - drag/drop or click to upload
- **Alt text** - accessibility field for images
- **Draft/Publish toggle** - determines visibility
- **Auto-calculated read time** - based on word count

### Frontend Blog (`/blog`)
- **Category filter** - dynamically loaded from DB
- **Post grid** - shows title, excerpt, date, read time
- **Responsive** - works on all devices
- **Related posts** - on post detail page
- **Newsletter signup** - embedded at bottom

---

## 🔐 Authentication & Security

### How Admin Auth Works
1. You sign up via `/admin/login`
2. Supabase sends back a JWT token
3. Token stored in browser (secure, httpOnly)
4. API endpoints verify token before allowing changes
5. RLS policies enforce: only authenticated users can create/edit/delete

### Environment Variables
In your `.env.local` (NEVER commit this):
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

For Vercel (production), add these in Project Settings → Environment Variables.

---

## 📝 Blog Post Schema

Each post has:
```javascript
{
  id: UUID,                    // Unique ID
  slug: string,                // URL-friendly name (auto-generated from title)
  title: string,               // Post title
  excerpt: string,             // 1-2 sentence summary
  body: string,                // Full markdown content
  category: string,            // One of 8 categories
  author: string,              // Defaults to "ORVN Labs"
  featured_image_url: string,  // Optional image URL
  featured_image_alt: string,  // Alt text for image
  is_published: boolean,       // Published or draft
  read_minutes: integer,       // Auto-calculated
  created_at: timestamp,       // When created
  updated_at: timestamp,       // Last updated
  published_at: timestamp      // When published (or null if draft)
}
```

---

## 🛠 Common Tasks

### Change Categories
1. Edit `src/pages/admin/BlogEditor.jsx`
2. Find `const CATEGORIES = [...]`
3. Update the list
4. Save

### Upload Custom Domain Images
All images go to Supabase storage at `/blog-images/`. They're public, fast, and CDN-cached.

### Export All Posts
1. Go to Supabase SQL Editor
2. Run: `SELECT * FROM blog_posts;`
3. Click "Download CSV"

### Disable Publishing for a Post
1. Find it in dashboard
2. Click the eye icon to toggle draft
3. It vanishes from public `/blog` immediately

### Delete All Posts
⚠️ **WARNING**: This is irreversible!
1. Supabase → SQL Editor
2. `DELETE FROM blog_posts;`
3. Confirm

---

## 🚨 Troubleshooting

### "Authorization failed" on admin login
- Make sure you added yourself as a user in Supabase Auth
- Check you're using the **anon key** (not service role key) in `.env.local`

### Images won't upload
- Check bucket `blog-images` exists in Supabase Storage
- Verify RLS policies allow authenticated uploads
- Try in incognito window to clear cache

### Blog page shows "No posts"
- Check `/api/blog/list` returns data
- Verify posts have `is_published = true`
- Check browser console for API errors

### Edit/Delete buttons don't work
- Make sure you're signed in to `/admin/login`
- Check your session hasn't expired (re-login if needed)
- Check browser console for error messages

---

## 🎨 Customization Ideas

### Add Author Bios
1. Add `author_id` field to `blog_posts`
2. Create `authors` table
3. Update editor to show author dropdown

### Add Tags/Topics
1. Create `post_tags` table (many-to-many)
2. Update editor to support multiple tags
3. Add tag filter to blog list

### Comments Section
1. Create `post_comments` table
2. Add comment form to post detail page
3. Moderate in admin dashboard

### Email Notifications
1. Add webhook to Supabase (on new published post)
2. Call newsletter API to send to subscribers
3. Use existing email system (Resend)

---

## 📊 Performance Notes

- API responses cached 5 minutes (blog list), 1 hour (categories)
- Images CDN-cached 1 hour
- Database queries indexed on: slug, category, published_at
- RLS policies automatically filter to only published posts for public

---

## ✅ You're All Set!

Your blog is now:
- ✅ Dynamic (powered by real database)
- ✅ Admin-managed (full dashboard)
- ✅ Production-ready (scalable, secure)
- ✅ SEO-friendly (meta tags, structured data)
- ✅ Fast (CDN, caching, indexes)

Start writing! 🚀
