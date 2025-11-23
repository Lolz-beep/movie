'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiPlay, FiStar } from 'react-icons/fi';
import { getPosterUrl } from '@/lib/tmdb';
import type { Movie, TVShow } from '@/types';

interface MediaCardProps {
    media: Movie | TVShow;
    mediaType: 'movie' | 'tv';
}

export default function MediaCard({ media, mediaType }: MediaCardProps) {
    const title = 'title' in media ? media.title : media.name;
    const rating = media.vote_average.toFixed(1);
    const year = 'release_date' in media
        ? media.release_date?.split('-')[0]
        : media.first_air_date?.split('-')[0];

    return (
        <Link href={`/${mediaType}/${media.id}`}>
            <div className="group relative overflow-hidden rounded-lg card-hover cursor-pointer">
                {/* Poster Image */}
                <div className="relative aspect-[2/3] bg-background-secondary">
                    <Image
                        src={getPosterUrl(media.poster_path)}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    />

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                            <h3 className="text-white font-semibold text-sm line-clamp-2">
                                {title}
                            </h3>
                            <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center space-x-1">
                                    <FiStar className="text-yellow-400" size={14} />
                                    <span className="text-white">{rating}</span>
                                </div>
                                {year && <span className="text-gray-300">{year}</span>}
                            </div>
                            <div className="flex items-center space-x-2 text-white">
                                <FiPlay size={16} />
                                <span className="text-xs font-medium">Watch Now</span>
                            </div>
                        </div>
                    </div>

                    {/* Quality Badge */}
                    <div className="absolute top-2 right-2 px-2 py-1 bg-accent-primary/90 text-white text-xs font-bold rounded">
                        HD
                    </div>
                </div>

                {/* Title (Always Visible on Mobile) */}
                <div className="md:hidden mt-2 px-1">
                    <h3 className="text-foreground font-medium text-sm line-clamp-1">
                        {title}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-foreground-secondary mt-1">
                        <div className="flex items-center space-x-1">
                            <FiStar className="text-yellow-400" size={12} />
                            <span>{rating}</span>
                        </div>
                        {year && <span>{year}</span>}
                    </div>
                </div>
            </div>
        </Link>
    );
}
