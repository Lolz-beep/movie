# Vercel Deployment Guide

## Environment Variables Setup

To deploy this application on Vercel, you need to configure the following environment variables in your Vercel project settings:

### Required Variables

1. **NEXT_PUBLIC_TMDB_API_KEY**
   - Your TMDB API key
   - Get it from: https://www.themoviedb.org/settings/api
   - Example: `eyJhbGciOiJIUzI1NiJ9...`

2. **NEXT_PUBLIC_TMDB_BASE_URL** (Optional - has fallback)
   - TMDB API base URL
   - Default: `https://api.themoviedb.org/3`
   - Only set if you need to override the default

3. **NEXT_PUBLIC_TMDB_IMAGE_BASE_URL** (Optional - has fallback)
   - TMDB image CDN base URL
   - Default: `https://image.tmdb.org/t/p`
   - Only set if you need to override the default

4. **NEXT_PUBLIC_VIDKING_BASE_URL** (Optional - has fallback)
   - VidKing embed base URL
   - Default: `https://www.vidking.net/embed`
   - Only set if you need to override the default

## Steps to Deploy on Vercel

### 1. Get Your TMDB API Key
- Go to https://www.themoviedb.org/settings/api
- Sign up or log in
- Request an API key (choose "Developer" option)
- Copy your API key (it will look like: `eyJhbGciOiJIUzI1NiJ9...`)

### 2. Push Code to Git Repository
```bash
git add .
git commit -m "Deploy to Vercel"
git push
```

### 3. Import Project in Vercel
- Go to https://vercel.com
- Click "Add New Project"
- Import your repository

### 4. Configure Environment Variables (CRITICAL!)
**Before deploying**, you MUST add the environment variable:

1. In the Vercel import screen, scroll down to "Environment Variables"
2. Add the following:
   - **Name**: `NEXT_PUBLIC_TMDB_API_KEY`
   - **Value**: Your TMDB API key (paste the key you got in step 1)
   - **Environment**: Select all (Production, Preview, Development)

3. Click "Deploy"

### 5. If You Already Deployed Without Environment Variables
If you already deployed and got the "Invalid URL" error:

1. Go to your Vercel project dashboard
2. Click "Settings" tab
3. Click "Environment Variables" in the left sidebar
4. Add `NEXT_PUBLIC_TMDB_API_KEY` with your API key
5. Go to "Deployments" tab
6. Click the three dots (...) on the latest deployment
7. Click "Redeploy"


## Troubleshooting

### "Invalid URL" Error During Build
- Make sure `NEXT_PUBLIC_TMDB_API_KEY` is set in Vercel environment variables
- The other URLs have fallback values, so they're optional
- Redeploy after adding environment variables

### API Requests Failing
- Verify your TMDB API key is valid
- Check that the key has the necessary permissions
