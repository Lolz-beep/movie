import axios from 'axios';
import type { Movie, TVShow, MovieDetails, TVDetails, TMDBResponse, SearchResult, Video } from '@/types';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

// Debug logging for environment variables (only in development or during build)
if (process.env.NODE_ENV !== 'production') {
    console.log('TMDB Configuration:', {
        hasApiKey: !!API_KEY,
        baseUrl: BASE_URL,
        imageBaseUrl: IMAGE_BASE_URL,
    });
}

// Validate that API_KEY is set
if (!API_KEY) {
    const errorMessage = [
        '❌ NEXT_PUBLIC_TMDB_API_KEY is not set!',
        '',
        'To fix this:',
        '1. Get your API key from: https://www.themoviedb.org/settings/api',
        '2. In Vercel: Settings → Environment Variables → Add New',
        '3. Name: NEXT_PUBLIC_TMDB_API_KEY',
        '4. Value: [your API key]',
        '5. Redeploy your application',
        '',
        'For local development, add it to .env.local file',
    ].join('\n');

    throw new Error(errorMessage);
}

// Validate that BASE_URL is a valid URL
if (!BASE_URL || !BASE_URL.startsWith('http')) {
    throw new Error(
        `Invalid TMDB BASE_URL: "${BASE_URL}"\n` +
        'Expected a full URL like: https://api.themoviedb.org/3'
    );
}

const tmdbClient = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

// Image URL helpers
export const getImageUrl = (path: string | null, size: string = 'original'): string => {
    if (!path) return '/placeholder.png';
    return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getPosterUrl = (path: string | null): string => getImageUrl(path, 'w500');
export const getBackdropUrl = (path: string | null): string => getImageUrl(path, 'original');
export const getProfileUrl = (path: string | null): string => getImageUrl(path, 'w185');

// Trending
export const getTrending = async (mediaType: 'all' | 'movie' | 'tv' = 'all', timeWindow: 'day' | 'week' = 'week') => {
    const response = await tmdbClient.get<TMDBResponse<Movie | TVShow>>(`/trending/${mediaType}/${timeWindow}`);
    return response.data;
};

// Popular
export const getPopularMovies = async (page: number = 1) => {
    const response = await tmdbClient.get<TMDBResponse<Movie>>('/movie/popular', { params: { page } });
    return response.data;
};

export const getPopularTVShows = async (page: number = 1) => {
    const response = await tmdbClient.get<TMDBResponse<TVShow>>('/tv/popular', { params: { page } });
    return response.data;
};

// Top Rated
export const getTopRatedMovies = async (page: number = 1) => {
    const response = await tmdbClient.get<TMDBResponse<Movie>>('/movie/top_rated', { params: { page } });
    return response.data;
};

export const getTopRatedTVShows = async (page: number = 1) => {
    const response = await tmdbClient.get<TMDBResponse<TVShow>>('/tv/top_rated', { params: { page } });
    return response.data;
};

// Now Playing / Airing
export const getNowPlayingMovies = async (page: number = 1) => {
    const response = await tmdbClient.get<TMDBResponse<Movie>>('/movie/now_playing', { params: { page } });
    return response.data;
};

export const getAiringTodayTVShows = async (page: number = 1) => {
    const response = await tmdbClient.get<TMDBResponse<TVShow>>('/tv/airing_today', { params: { page } });
    return response.data;
};

// Details
export const getMovieDetails = async (id: number) => {
    const response = await tmdbClient.get<MovieDetails>(`/movie/${id}`, {
        params: { append_to_response: 'credits,videos' },
    });
    return response.data;
};

export const getTVDetails = async (id: number) => {
    const response = await tmdbClient.get<TVDetails>(`/tv/${id}`, {
        params: { append_to_response: 'credits,videos' },
    });
    return response.data;
};

// Season Details
export const getSeasonDetails = async (tvId: number, seasonNumber: number) => {
    const response = await tmdbClient.get(`/tv/${tvId}/season/${seasonNumber}`);
    return response.data;
};

// Videos
export const getMovieVideos = async (id: number) => {
    const response = await tmdbClient.get<{ results: Video[] }>(`/movie/${id}/videos`);
    return response.data.results;
};

export const getTVVideos = async (id: number) => {
    const response = await tmdbClient.get<{ results: Video[] }>(`/tv/${id}/videos`);
    return response.data.results;
};

// Similar
export const getSimilarMovies = async (id: number) => {
    const response = await tmdbClient.get<TMDBResponse<Movie>>(`/movie/${id}/similar`);
    return response.data;
};

export const getSimilarTVShows = async (id: number) => {
    const response = await tmdbClient.get<TMDBResponse<TVShow>>(`/tv/${id}/similar`);
    return response.data;
};

// Search
export const searchMulti = async (query: string, page: number = 1) => {
    const response = await tmdbClient.get<TMDBResponse<SearchResult>>('/search/multi', {
        params: { query, page },
    });
    return response.data;
};

export const searchMovies = async (query: string, page: number = 1) => {
    const response = await tmdbClient.get<TMDBResponse<Movie>>('/search/movie', {
        params: { query, page },
    });
    return response.data;
};

export const searchTVShows = async (query: string, page: number = 1) => {
    const response = await tmdbClient.get<TMDBResponse<TVShow>>('/search/tv', {
        params: { query, page },
    });
    return response.data;
};

// Discover
export const discoverMovies = async (params: Record<string, any> = {}) => {
    const response = await tmdbClient.get<TMDBResponse<Movie>>('/discover/movie', { params });
    return response.data;
};

export const discoverTVShows = async (params: Record<string, any> = {}) => {
    const response = await tmdbClient.get<TMDBResponse<TVShow>>('/discover/tv', { params });
    return response.data;
};

export default tmdbClient;
