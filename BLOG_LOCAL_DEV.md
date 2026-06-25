# Blog System - Local Development Guide

## Quick Summary

✅ **Blog reader** (viewing posts) — Works with `npm run dev`
✅ **Blog on homepage** — Fetches recent posts dynamically  
✅ **Blog in navbar** — Link to `/blog` page
⚠️ **Blog admin** (create/edit/delete) — Requires Vercel dev server

---

## Running Locally

### For Frontend Only (No Admin Features)

```bash
npm run dev
```

This starts Vite at `http://localhost:5173`. You can:
- View the blog at `/blog`
- See recent posts on homepage
- Read individual blog posts
- BUT: Cannot create/edit/delete posts (API endpoints return 404)

**Why?** Vite doesn't serve Vercel API functions. The `/api/*` endpoints only work when deployed to Vercel or via Vercel dev server.

---

### For Full Development (Including Admin)

```bash
vercel dev
```

This starts a local Vercel environment that:
- Serves the frontend (same as `npm run dev`)
- Serves the API endpoints (`/api/*`)
- Allows you to create/edit/delete blog posts in admin
- Mimics the production environment

**First time?** You need to:
1. Install Vercel CLI: `npm install -g vercel`
2. Link your project: `vercel link`
3. Pull environment variables: `vercel env pull`
4. Then run: `vercel dev`

---

## Troubleshooting

### "API endpoints return 404"
→ You're using `npm run dev`. Switch to `vercel dev` for admin features.

### "Failed to load blog posts on homepage"
→ Make sure your Supabase credentials are in `.env` or `.env.local`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-key
```

### "RichTextEditor warnings about duplicate extensions"
→ Fixed. The editor now properly disables Link/Underline in StarterKit before adding custom versions.

---

## File Structure

```
api/blog/
├── list.js              # GET all published posts (read-only)
├── post.js              # GET single post by slug (read-only)
├── categories.js        # GET all categories (read-only)
└── admin/
    ├── create.js        # POST new post (requires auth)
    ├── update.js        # PUT existing post (requires auth)
    └── delete.js        # DELETE post (requires auth)

src/pages/
├── Blog.jsx             # /blog - list of posts (viewer)
├── BlogPost.jsx         # /blog/:slug - read article (viewer)
└── admin/
    ├── AdminLogin.jsx   # /admin/login - auth
    ├── BlogDashboard.jsx # /admin/blog - manage posts
    └── BlogEditor.jsx   # /admin/blog/create & /admin/blog/edit/:slug
```

---

## Deployment

All endpoints work seamlessly on Vercel. Just push to your repo and Vercel deploys automatically.

---

## Recent Changes

- ✅ Blog added to navbar
- ✅ Recent blog posts on homepage (dynamic)
- ✅ "Read post" links to full articles
- ✅ Delete posts fully wired
- ✅ New improved SVG illustrations
- ✅ RichTextEditor duplicate extension fix
