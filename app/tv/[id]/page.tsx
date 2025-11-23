import Image from 'next/image';
import Link from 'next/link';
import { FiPlay, FiStar, FiCalendar } from 'react-icons/fi';
import { getTVDetails, getSimilarTVShows, getBackdropUrl, getPosterUrl } from '@/lib/tmdb';
import MediaRow from '@/components/MediaRow';

interface TVPageProps {
    params: Promise<{ id: string }>;
}

export default async function TVPage({ params }: TVPageProps) {
    const { id } = await params;
    const tvId = parseInt(id);

    const [show, similar] = await Promise.all([
        getTVDetails(tvId),
        getSimilarTVShows(tvId),
    ]);

    const trailer = show.videos?.results.find(
        (video) => video.type === 'Trailer' && video.site === 'YouTube'
    );

    return (
        <div className="min-h-screen">
            {/* Backdrop */}
            <div className="relative h-[60vh] w-full">
                <Image
                    src={getBackdropUrl(show.backdrop_path)}
                    alt={show.name}
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
                                src={getPosterUrl(show.poster_path)}
                                alt={show.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                                {show.name}
                            </h1>
                            {show.tagline && (
                                <p className="text-foreground-secondary italic">{show.tagline}</p>
                            )}
                        </div>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center space-x-1">
                                <FiStar className="text-yellow-400" />
                                <span className="text-foreground font-semibold">
                                    {show.vote_average.toFixed(1)}
                                </span>
                                <span className="text-foreground-secondary">
                                    ({show.vote_count.toLocaleString()} votes)
                                </span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <FiCalendar className="text-foreground-secondary" />
                                <span className="text-foreground">
                                    {new Date(show.first_air_date).getFullYear()}
                                </span>
                            </div>
                            <div className="text-foreground">
                                {show.number_of_seasons} Season{show.number_of_seasons > 1 ? 's' : ''}
                            </div>
                            <div className="flex gap-2">
                                {show.genres.slice(0, 3).map((genre) => (
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
                                href={`/watch/tv/${show.id}?season=1&episode=1`}
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
                                {show.overview}
                            </p>
                        </div>

                        {/* Seasons */}
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-3">Seasons</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {show.seasons
                                    .filter((season) => season.season_number > 0)
                                    .map((season) => (
                                        <Link
                                            key={season.id}
                                            href={`/watch/tv/${show.id}?season=${season.season_number}&episode=1`}
                                            className="glass p-4 rounded-lg hover:bg-background-tertiary transition-colors"
                                        >
                                            <p className="text-foreground font-semibold">{season.name}</p>
                                            <p className="text-foreground-secondary text-sm">
                                                {season.episode_count} Episodes
                                            </p>
                                        </Link>
                                    ))}
                            </div>
                        </div>

                        {/* Cast */}
                        {show.credits && show.credits.cast.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-3">Cast</h2>
                                <div className="flex gap-4 overflow-x-auto pb-4">
                                    {show.credits.cast.slice(0, 10).map((actor) => (
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

                {/* Similar Shows */}
                {similar.results.length > 0 && (
                    <div className="mt-16">
                        <MediaRow
                            title="Similar Shows"
                            items={similar.results}
                            mediaType="tv"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
