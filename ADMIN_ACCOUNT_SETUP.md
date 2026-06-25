# Admin Account Setup - Complete Guide

Learn how to create and manage admin accounts in Supabase.

---

## 🚀 Quick Setup (2 Minutes)

### Method 1: Using Supabase Dashboard (Easiest)

1. **Open Supabase Dashboard**
   - Go to https://supabase.com
   - Select your project

2. **Go to Authentication**
   - Left sidebar → Authentication
   - Click **Users**

3. **Create New User**
   - Click **Invite**
   - Enter email: `your-email@example.com`
   - Click **Send invite**

4. **Check Email**
   - You'll get an invite link
   - Click the link
   - Set your password
   - Done! ✅

---

## 👥 Creating Multiple Admin Accounts

Repeat the above steps for each admin:

```
1. Go to Authentication → Users
2. Click "Invite"
3. Enter: admin1@company.com
4. Click "Send invite"
5. They receive email
6. They set password
7. They can now log in to /admin/login
```

**Example: Adding Your Team**
```
Invite:
- you@company.com (you)
- admin@company.com (second admin)
- editor@company.com (blog editor)
- manager@company.com (team lead)
```

Each person gets their own account and can manage posts independently.

---

## 🔐 Managing Admin Access

### View All Admin Users
```
Supabase Dashboard
├── Authentication
└── Users
    ├── user1@company.com (Invited)
    ├── user2@company.com (Active)
    └── user3@company.com (Confirmed)
```

### Delete an Admin
```
1. Go to Authentication → Users
2. Find the user
3. Click the user
4. Click "Delete user"
5. Confirm
```

### Reset Admin Password
```
1. Go to Authentication → Users
2. Find the user
3. They can reset at /admin/login using "Forgot password"
```

---

## 🛡️ Admin Roles & Permissions (Advanced)

Currently, **all authenticated users are admins** (can create/edit/delete posts).

To restrict access (e.g., some users read-only):

### Option 1: Manual Role System (Simple)

1. **Add a `role` field to your database:**
   ```sql
   ALTER TABLE auth.users ADD COLUMN role TEXT DEFAULT 'viewer';
   -- Values: 'admin', 'editor', 'viewer'
   ```

2. **Update API endpoints to check role:**
   ```javascript
   // In /api/blog/admin/create.js
   if (user.role !== 'admin' && user.role !== 'editor') {
     return res.status(403).json({ error: 'forbidden' });
   }
   ```

3. **Assign roles in Supabase:**
   ```sql
   UPDATE auth.users 
   SET role = 'editor' 
   WHERE email = 'editor@company.com';
   ```

### Option 2: Using Supabase Roles (Enterprise)

See Supabase documentation on Row Level Security (RLS):
- https://supabase.com/docs/guides/auth/row-level-security

---

## 📝 Creating an Admin Invite Link System

Want users to sign up themselves instead of you inviting them?

### Create a Signup Page (`/admin/signup`)

```jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function AdminSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check if user is in whitelist (optional)
      const whitelist = [
        'admin@orvnlabs.com',
        'you@company.com',
        'team@company.com'
      ];
      
      if (!whitelist.includes(email)) {
        setError('Email not authorized for signup');
        setLoading(false);
        return;
      }

      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signupError) {
        setError(signupError.message);
        setLoading(false);
        return;
      }

      alert('Account created! Check your email to verify.');
      navigate('/admin/login');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
      <h1>Admin Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: 10, marginBottom: 10 }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10 }}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}
```

Then add to `App.jsx`:
```jsx
<Route path="/admin/signup" element={<AdminSignup />} />
```

---

## 🔑 System Admin vs Regular Admin

### System Admin (Super User)
- Can create/edit/delete ALL posts
- Can create/delete other admin accounts
- Can change system settings
- Can view analytics

**Currently:** All authenticated users are "system admins"

### Regular Admin (Editor)
- Can create/edit/delete posts
- Cannot create admin accounts
- Cannot change system settings
- Cannot delete other users' posts

**To implement:** See "Admin Roles" section above

---

## 📊 Viewing All Admins

### In Supabase Dashboard
```
1. Go to Authentication → Users
2. See all users who've signed in
3. Check their status:
   - "Invited" = Email sent, waiting for signup
   - "Confirmed" = Email verified, account active
   - "Disabled" = Blocked from signing in
```

### Via SQL Query
```sql
SELECT 
  email,
  created_at,
  last_sign_in_at,
  raw_user_meta_data
FROM auth.users
ORDER BY created_at DESC;
```

---

## 🚨 Security Best Practices

### 1. Use Strong Passwords
- Require 12+ characters
- Mix uppercase, numbers, symbols
- Use password managers (1Password, LastPass)

### 2. Enable 2FA (Two-Factor Authentication)
```sql
-- Supabase doesn't have built-in 2FA yet
-- But you can implement with TOTP (Time-based One-Time Password)
```

### 3. Audit Admin Access
```sql
-- View who logged in when
SELECT 
  email,
  last_sign_in_at
FROM auth.users
WHERE last_sign_in_at > NOW() - INTERVAL '7 days'
ORDER BY last_sign_in_at DESC;
```

### 4. Remove Inactive Admins
```sql
-- Find admins who haven't logged in in 30 days
SELECT 
  email,
  last_sign_in_at
FROM auth.users
WHERE last_sign_in_at < NOW() - INTERVAL '30 days'
  OR last_sign_in_at IS NULL;
```

### 5. Use Email Domains
Only invite people from your company domain:
```javascript
const email = 'user@company.com';
if (!email.endsWith('@company.com')) {
  return res.status(403).json({ error: 'Must use company email' });
}
```

---

## 🔄 Admin Workflows

### Invite New Admin
```
1. You invite via Supabase dashboard
2. They get email
3. They click link
4. They set password
5. They login at /admin/login
6. They can now write posts
```

### Offboard Admin
```
1. Go to Supabase → Authentication → Users
2. Find their email
3. Click "Delete user"
4. Confirm
5. They can no longer login
```

### Change Admin Password
```
They go to /admin/login → "Forgot password"
Email link arrives
They set new password
Done
```

---

## 📱 Admin Dashboard for Managing Admins (Future Feature)

You could add a page for managing other admins:

```jsx
// /admin/manage-users (future feature)
export default function ManageAdmins() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Fetch all users via API
    fetch('/api/admin/users')
      .then(r => r.json())
      .then(data => setAdmins(data.users));
  }, []);

  return (
    <div>
      <h1>Manage Admins</h1>
      <table>
        <tr>
          <th>Email</th>
          <th>Last Login</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
        {admins.map(admin => (
          <tr key={admin.id}>
            <td>{admin.email}</td>
            <td>{admin.last_sign_in_at}</td>
            <td>{admin.created_at}</td>
            <td>
              <button>Delete</button>
              <button>Reset Password</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
```

---

## ✅ Checklist

- [ ] Created your own admin account
- [ ] Can login at /admin/login
- [ ] Can create a blog post
- [ ] Can invite teammates (optional)
- [ ] Know how to delete an admin
- [ ] Know security best practices

You're good to go! 🎉
