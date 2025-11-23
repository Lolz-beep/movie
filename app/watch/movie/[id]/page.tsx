import VideoPlayer from '@/components/VideoPlayer';
import { getMovieDetails, getSimilarMovies } from '@/lib/tmdb';
import { getMovieEmbedUrl } from '@/lib/vidking';
import MediaRow from '@/components/MediaRow';

interface WatchMoviePageProps {
    params: Promise<{ id: string }>;
}

export default async function WatchMoviePage({ params }: WatchMoviePageProps) {
    const { id } = await params;
    const movieId = parseInt(id);

    const [movie, similar] = await Promise.all([
        getMovieDetails(movieId),
        getSimilarMovies(movieId),
    ]);

    const embedUrl = getMovieEmbedUrl(movieId, { autoPlay: true });

    return (
        <div className="min-h-screen bg-black">
            {/* Video Player */}
            <div className="w-full">
                <VideoPlayer embedUrl={embedUrl} title={movie.title} />
            </div>

            {/* Movie Info */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                        <span>{new Date(movie.release_date).getFullYear()}</span>
                        <span>•</span>
                        <span>{movie.runtime} min</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            {movie.vote_average.toFixed(1)}
                        </span>
                    </div>
                    <p className="text-gray-400 max-w-3xl">{movie.overview}</p>
                </div>

                {/* Similar Movies */}
                {similar.results.length > 0 && (
                    <div className="mt-12">
                        <MediaRow
                            title="More Like This"
                            items={similar.results.slice(0, 10)}
                            mediaType="movie"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
