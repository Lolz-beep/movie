'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiPlay, FiInfo } from 'react-icons/fi';
import { getBackdropUrl } from '@/lib/tmdb';
import type { Movie, TVShow } from '@/types';

interface HeroProps {
    media: Movie | TVShow;
    mediaType: 'movie' | 'tv';
}

export default function Hero({ media, mediaType }: HeroProps) {
    const title = 'title' in media ? media.title : media.name;
    const rating = media.vote_average.toFixed(1);

    return (
        <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={getBackdropUrl(media.backdrop_path)}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-2xl space-y-6 animate-slideUp">
                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-bold text-foreground drop-shadow-lg">
                        {title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex items-center space-x-4 text-sm md:text-base">
                        <div className="flex items-center space-x-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-foreground font-semibold">{rating}</span>
                        </div>
                        {'release_date' in media && media.release_date && (
                            <span className="text-foreground-secondary">
                                {new Date(media.release_date).getFullYear()}
                            </span>
                        )}
                        {'first_air_date' in media && media.first_air_date && (
                            <span className="text-foreground-secondary">
                                {new Date(media.first_air_date).getFullYear()}
                            </span>
                        )}
                        <span className="px-2 py-1 bg-accent-primary/20 text-accent-primary rounded text-xs font-semibold">
                            HD
                        </span>
                    </div>

                    {/* Overview */}
                    <p className="text-foreground-secondary text-sm md:text-base line-clamp-3 max-w-xl">
                        {media.overview}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href={`/watch/${mediaType}/${media.id}`}
                            className="flex items-center space-x-2 px-6 py-3 bg-accent-primary hover:bg-accent-secondary text-white rounded-full font-semibold transition-all transform hover:scale-105"
                        >
                            <FiPlay size={20} />
                            <span>Play Now</span>
                        </Link>
                        <Link
                            href={`/${mediaType}/${media.id}`}
                            className="flex items-center space-x-2 px-6 py-3 glass hover:bg-background-tertiary text-foreground rounded-full font-semibold transition-all"
                        >
                            <FiInfo size={20} />
                            <span>More Info</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
