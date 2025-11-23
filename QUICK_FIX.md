# ⚠️ CRITICAL: Vercel Deployment Checklist

## Current Error
```
TypeError: Invalid URL
input: '/discover/movie'
```

## Root Cause
The `NEXT_PUBLIC_TMDB_API_KEY` environment variable is **NOT set in Vercel**.

## Why This Happens
1. Your `.env.local` file exists locally (that's why it works on your machine)
2. `.env.local` is in `.gitignore` and is NOT pushed to GitHub
3. Vercel doesn't have access to your `.env.local` file
4. You MUST manually add environment variables in Vercel's dashboard

## ✅ Step-by-Step Fix

### Step 1: Find Your TMDB API Key
Open your local `.env.local` file and copy the value of `NEXT_PUBLIC_TMDB_API_KEY`

OR get a new one from: https://www.themoviedb.org/settings/api

### Step 2: Add to Vercel
1. Go to https://vercel.com/dashboard
2. Click on your project
3. Click **"Settings"** tab (top navigation)
4. Click **"Environment Variables"** (left sidebar)
5. Click **"Add New"** button

### Step 3: Enter the Variable
```
Name:         NEXT_PUBLIC_TMDB_API_KEY
Value:        [paste your API key here - it's a long string]
Environments: ✓ Production  ✓ Preview  ✓ Development
```

Click **"Save"**

### Step 4: Redeploy
**Option A - Automatic (Recommended):**
```bash
git add .
git commit -m "Update environment variable handling"
git push
```
Vercel will automatically redeploy.

**Option B - Manual:**
1. Go to **"Deployments"** tab in Vercel
2. Find the latest deployment
3. Click the **⋯** (three dots menu)
4. Click **"Redeploy"**
5. Make sure "Use existing Build Cache" is **UNCHECKED**
6. Click **"Redeploy"**

## ⏱️ Expected Timeline
- Adding environment variable: 30 seconds
- Redeployment: 2-3 minutes
- Total: ~3-4 minutes

## 🔍 How to Verify It Worked
After redeployment:
1. Check the deployment logs in Vercel
2. You should see: ✓ Build successful
3. Visit your deployed URL
4. The site should load without errors

## ❌ Common Mistakes
1. **Forgetting to redeploy** - Environment variables only take effect after redeployment
2. **Typo in variable name** - Must be exactly `NEXT_PUBLIC_TMDB_API_KEY`
3. **Not selecting all environments** - Make sure Production, Preview, and Development are all checked
4. **Using the wrong API key** - Make sure it's your TMDB API key, not something else

## 🆘 Still Not Working?
If you still get errors after following all steps:

1. **Double-check the variable name** in Vercel matches exactly: `NEXT_PUBLIC_TMDB_API_KEY`
2. **Verify your API key is valid** - Test it locally first
3. **Clear build cache** - Redeploy with "Use existing Build Cache" unchecked
4. **Check Vercel logs** - Look for the new error message that shows what's wrong

---

**Remember:** The code changes I made will now give you a MUCH clearer error message if the API key is missing, making it easier to debug in the future!
