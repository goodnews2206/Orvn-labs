# Install Required Dependencies for Dynamic Blog

Run this command to add Supabase to your project:

```bash
npm install @supabase/supabase-js
```

That's it! The `@supabase/supabase-js` library is required for:
- Database queries
- Authentication
- Image storage
- Real-time updates (future)

## Verify Installation

After installing, check that it worked:

```bash
npm list @supabase/supabase-js
```

You should see something like: `@supabase/supabase-js@2.x.x`

## If You Get an Error

If `npm install` fails, try:

```bash
npm install --save @supabase/supabase-js
```

Or with yarn:

```bash
yarn add @supabase/supabase-js
```

---

You're good to go! Now follow the setup guide in `DYNAMIC_BLOG_SETUP.md`.
