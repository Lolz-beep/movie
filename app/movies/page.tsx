import { discoverMovies } from '@/lib/tmdb';
import MediaCard from '@/components/MediaCard';

export default async function MoviesPage() {
    const movies = await discoverMovies({ sort_by: 'popularity.desc', page: 1 });

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-foreground mb-8">Movies</h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies.results.map((movie) => (
                        <MediaCard key={movie.id} media={movie} mediaType="movie" />
                    ))}
                </div>
            </div>
        </div>
    );
}
