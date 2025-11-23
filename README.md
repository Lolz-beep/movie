# CineBy - Movie Streaming Website

A premium movie and TV show streaming website built with Next.js 14, TailwindCSS, and powered by TMDB API and VidKing player.

![CineBy](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)

## Features

✨ **Premium Dark Theme** - Sleek, modern design inspired by cineby.gd  
🎬 **Movie & TV Show Streaming** - Watch content via VidKing player  
🔍 **Advanced Search** - Find movies and TV shows instantly  
📱 **Fully Responsive** - Optimized for all devices  
⚡ **Fast Performance** - Built with Next.js 14 App Router  
🎨 **Glassmorphism UI** - Beautiful glass effects and animations  
🎯 **TMDB Integration** - Rich metadata and high-quality images  

## Prerequisites

Before you begin, you'll need:

1. **Node.js** (v18 or higher)
2. **TMDB API Key** (free) - Get yours at [themoviedb.org](https://www.themoviedb.org/settings/api)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# TMDB API Configuration
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

# VidKing Player Configuration
NEXT_PUBLIC_VIDKING_BASE_URL=https://www.vidking.net/embed
```

**Important:** Replace `your_api_key_here` with your actual TMDB API key.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
movie/
├── app/                    # Next.js App Router pages
│   ├── movie/[id]/        # Movie detail page
│   ├── tv/[id]/           # TV show detail page
│   ├── watch/             # Video player pages
│   │   ├── movie/[id]/    # Movie watch page
│   │   └── tv/[id]/       # TV show watch page
│   ├── movies/            # Movies browsing page
│   ├── tv/                # TV shows browsing page
│   ├── search/            # Search results page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navbar.tsx         # Navigation bar
│   ├── Hero.tsx           # Hero section
│   ├── MediaCard.tsx      # Movie/TV card
│   ├── MediaRow.tsx       # Horizontal scroll row
│   ├── VideoPlayer.tsx    # VidKing player wrapper
│   └── Footer.tsx         # Footer
├── lib/                   # Utility libraries
│   ├── tmdb.ts           # TMDB API client
│   └── vidking.ts        # VidKing player utils
├── types/                 # TypeScript types
│   └── index.ts          # Type definitions
└── public/               # Static assets

```

## API Integration

### TMDB API

Used for:
- Fetching movie and TV show metadata
- Search functionality
- Trending and popular content
- Cast and crew information
- Trailers and videos

### VidKing Player

Used for:
- Streaming movies and TV shows
- Embedded video player
- Episode navigation for TV shows

**Format:**
- Movies: `/embed/movie/{tmdbId}`
- TV Shows: `/embed/tv/{tmdbId}/{season}/{episode}`

## Key Features Explained

### Homepage
- Featured hero section with trending content
- Multiple content rows (Trending, Popular, Top Rated)
- Smooth horizontal scrolling

### Movie/TV Detail Pages
- Full backdrop and poster images
- Comprehensive metadata (rating, year, runtime, genres)
- Cast information with profile pictures
- Similar content recommendations
- Direct "Watch Now" button

### Watch Pages
- Full-screen VidKing player
- Movie information below player
- Episode navigation for TV shows
- Similar content suggestions

### Search
- Real-time search functionality
- Mixed results (movies and TV shows)
- Grid layout with filtering

## Customization

### Colors

Edit `app/globals.css` to customize the color scheme:

```css
:root {
  --accent-primary: #6366f1;      /* Primary accent color */
  --accent-secondary: #8b5cf6;    /* Secondary accent color */
  --background: #0a0a0f;          /* Main background */
  /* ... more colors */
}
```

### Fonts

Change the font in `app/layout.tsx`:

```typescript
import { YourFont } from "next/font/google";

const yourFont = YourFont({
  subsets: ["latin"],
  display: "swap",
});
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Icons** - Icon library
- **TMDB API** - Movie database API
- **VidKing** - Video streaming player

## Troubleshooting

### Build Errors

**Error: 401 Unauthorized**
- Make sure your TMDB API key is correctly set in `.env.local`
- Verify the API key is valid at [TMDB Settings](https://www.themoviedb.org/settings/api)

**Images Not Loading**
- Check that `next.config.ts` includes `image.tmdb.org` in remote patterns
- Verify your internet connection

### Player Issues

**Video Not Playing**
- VidKing player requires the correct TMDB ID
- Some content may not be available on VidKing
- Check browser console for errors

## License

This project is for educational purposes. Please respect copyright laws and terms of service for TMDB and VidKing.

## Credits

- **TMDB** - Movie and TV show data
- **VidKing** - Video streaming player
- **Design Inspiration** - cineby.gd

---

Built with ❤️ using Next.js and TailwindCSS
