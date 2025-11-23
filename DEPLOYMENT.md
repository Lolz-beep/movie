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

## Steps to Deploy

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel
3. Go to Project Settings → Environment Variables
4. Add `NEXT_PUBLIC_TMDB_API_KEY` with your API key
5. Deploy!

## Troubleshooting

### "Invalid URL" Error During Build
- Make sure `NEXT_PUBLIC_TMDB_API_KEY` is set in Vercel environment variables
- The other URLs have fallback values, so they're optional
- Redeploy after adding environment variables

### API Requests Failing
- Verify your TMDB API key is valid
- Check that the key has the necessary permissions
