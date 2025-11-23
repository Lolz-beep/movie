import Image from 'next/image';
import Link from 'next/link';
import { FiPlay, FiStar, FiCalendar, FiClock } from 'react-icons/fi';
import { getMovieDetails, getSimilarMovies, getBackdropUrl, getPosterUrl } from '@/lib/tmdb';
import MediaRow from '@/components/MediaRow';

interface MoviePageProps {
    params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
    const { id } = await params;
    const movieId = parseInt(id);

    const [movie, similar] = await Promise.all([
        getMovieDetails(movieId),
        getSimilarMovies(movieId),
    ]);

    const trailer = movie.videos?.results.find(
        (video) => video.type === 'Trailer' && video.site === 'YouTube'
    );

    return (
        <div className="min-h-screen">
            {/* Backdrop */}
            <div className="relative h-[60vh] w-full">
                <Image
                    src={getBackdropUrl(movie.backdrop_path)}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative -mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Poster */}
                    <div className="flex-shrink-0">
                        <div className="relative w-64 aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
                            <Image
                                src={getPosterUrl(movie.poster_path)}
                                alt={movie.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                                {movie.title}
                            </h1>
                            {movie.tagline && (
                                <p className="text-foreground-secondary italic">{movie.tagline}</p>
                            )}
                        </div>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center space-x-1">
                                <FiStar className="text-yellow-400" />
                                <span className="text-foreground font-semibold">
                                    {movie.vote_average.toFixed(1)}
                                </span>
                                <span className="text-foreground-secondary">
                                    ({movie.vote_count.toLocaleString()} votes)
                                </span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <FiCalendar className="text-foreground-secondary" />
                                <span className="text-foreground">
                                    {new Date(movie.release_date).getFullYear()}
                                </span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <FiClock className="text-foreground-secondary" />
                                <span className="text-foreground">{movie.runtime} min</span>
                            </div>
                            <div className="flex gap-2">
                                {movie.genres.slice(0, 3).map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="px-3 py-1 bg-accent-primary/20 text-accent-primary rounded-full text-xs font-semibold"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <Link
                                href={`/watch/movie/${movie.id}`}
                                className="flex items-center space-x-2 px-8 py-3 bg-accent-primary hover:bg-accent-secondary text-white rounded-full font-semibold transition-all transform hover:scale-105"
                            >
                                <FiPlay size={20} />
                                <span>Watch Now</span>
                            </Link>
                            {trailer && (
                                <a
                                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 px-8 py-3 glass hover:bg-background-tertiary text-foreground rounded-full font-semibold transition-all"
                                >
                                    <span>Watch Trailer</span>
                                </a>
                            )}
                        </div>

                        {/* Overview */}
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-3">Overview</h2>
                            <p className="text-foreground-secondary leading-relaxed">
                                {movie.overview}
                            </p>
                        </div>

                        {/* Cast */}
                        {movie.credits && movie.credits.cast.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-3">Cast</h2>
                                <div className="flex gap-4 overflow-x-auto pb-4">
                                    {movie.credits.cast.slice(0, 10).map((actor) => (
                                        <div key={actor.id} className="flex-shrink-0 text-center">
                                            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-background-secondary mb-2">
                                                {actor.profile_path && (
                                                    <Image
                                                        src={getPosterUrl(actor.profile_path)}
                                                        alt={actor.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                )}
                                            </div>
                                            <p className="text-sm text-foreground font-medium">{actor.name}</p>
                                            <p className="text-xs text-foreground-secondary">{actor.character}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Similar Movies */}
                {similar.results.length > 0 && (
                    <div className="mt-16">
                        <MediaRow
                            title="Similar Movies"
                            items={similar.results}
                            mediaType="movie"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
