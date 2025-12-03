'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiPlay, FiStar, FiInfo, FiHeart } from 'react-icons/fi';
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

    // Check if it's a recent release (within last 60 days)
    const releaseDate = 'release_date' in media ? media.release_date : media.first_air_date;
    const isNew = releaseDate && (new Date().getTime() - new Date(releaseDate).getTime()) < 60 * 24 * 60 * 60 * 1000;

    return (
        <Link href={`/${mediaType}/${media.id}`}>
            <div className="group relative overflow-hidden rounded-xl card-hover cursor-pointer bg-card-bg">
                {/* Poster Image */}
                <div className="relative aspect-[2/3] bg-background-secondary overflow-hidden rounded-t-xl">
                    <Image
                        src={getPosterUrl(media.poster_path)}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    />

                    {/* Enhanced Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="absolute inset-0 flex flex-col justify-end p-4 space-y-3">
                            {/* Quick Actions */}
                            <div className="flex items-center justify-center space-x-2 mb-2">
                                <button
                                    className="p-2.5 bg-accent-primary hover:bg-accent-secondary rounded-full transition-all transform hover:scale-110"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <FiPlay size={18} className="text-white" />
                                </button>
                                <button
                                    className="p-2.5 bg-white/20 hover:bg-white/30 rounded-full transition-all transform hover:scale-110 backdrop-blur-sm"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <FiInfo size={18} className="text-white" />
                                </button>
                                <button
                                    className="p-2.5 bg-white/20 hover:bg-white/30 rounded-full transition-all transform hover:scale-110 backdrop-blur-sm"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <FiHeart size={18} className="text-white" />
                                </button>
                            </div>

                            {/* Title and Rating */}
                            <div>
                                <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
                                    {title}
                                </h3>
                                <div className="flex items-center space-x-2 text-xs">
                                    <div className="flex items-center space-x-1">
                                        <FiStar className="text-yellow-400" size={14} />
                                        <span className="text-white font-medium">{rating}</span>
                                    </div>
                                    {year && <span className="text-gray-300">• {year}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-2 left-2 right-2 flex items-start justify-between">
                        <div className="flex flex-col space-y-1">
                            {isNew && (
                                <span className="badge badge-new text-xs">NEW</span>
                            )}
                        </div>
                        <span className="badge badge-hd text-xs">HD</span>
                    </div>
                </div>

                {/* Info Section - Always Visible */}
                <div className="p-3 bg-card-bg">
                    <h3 className="text-foreground font-medium text-sm line-clamp-1 mb-1.5">
                        {title}
                    </h3>
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1">
                            <FiStar className="text-yellow-400" size={12} />
                            <span className="text-foreground-secondary font-medium">{rating}</span>
                        </div>
                        {year && <span className="text-foreground-tertiary">{year}</span>}
                    </div>
                </div>
            </div>
        </Link>
    );
}
