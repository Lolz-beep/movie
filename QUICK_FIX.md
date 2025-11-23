# Quick Fix for Vercel Deployment Error

## The Problem
Error: `TypeError: Invalid URL` with input `/discover/movie`

## The Solution
You need to add the TMDB API key to Vercel's environment variables.

## Steps to Fix (2 minutes)

1. **Go to Vercel Dashboard**
   - Open your project: https://vercel.com/dashboard

2. **Add Environment Variable**
   - Click "Settings" tab
   - Click "Environment Variables" in sidebar
   - Click "Add New"
   
3. **Enter the Variable**
   ```
   Name:  NEXT_PUBLIC_TMDB_API_KEY
   Value: [paste your TMDB API key here]
   ```
   - Check all environments (Production, Preview, Development)
   - Click "Save"

4. **Redeploy**
   - Go to "Deployments" tab
   - Click ⋯ (three dots) on latest deployment
   - Click "Redeploy"

## Where to Get TMDB API Key
https://www.themoviedb.org/settings/api

---

**That's it!** Your deployment should now work. ✅
