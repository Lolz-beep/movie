import Hero from '@/components/Hero';
import MediaRow from '@/components/MediaRow';
import { getTrending, getPopularMovies, getPopularTVShows, getTopRatedMovies } from '@/lib/tmdb';

export default async function Home() {
  // Fetch data in parallel
  const [trendingData, popularMovies, popularTVShows, topRatedMovies] = await Promise.all([
    getTrending('all', 'week'),
    getPopularMovies(),
    getPopularTVShows(),
    getTopRatedMovies(),
  ]);

  // Get featured content (first trending item)
  const featuredMedia = trendingData.results[0];
  const featuredType = 'title' in featuredMedia ? 'movie' : 'tv';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero media={featuredMedia} mediaType={featuredType} />

      {/* Content Rows */}
      <div className="space-y-8 py-8">
        <MediaRow
          title="Trending Now"
          items={trendingData.results.slice(1, 11)}
          mediaType="movie"
        />

        <MediaRow
          title="Popular Movies"
          items={popularMovies.results}
          mediaType="movie"
        />

        <MediaRow
          title="Popular TV Shows"
          items={popularTVShows.results}
          mediaType="tv"
        />

        <MediaRow
          title="Top Rated Movies"
          items={topRatedMovies.results}
          mediaType="movie"
        />
      </div>
    </div>
  );
}

