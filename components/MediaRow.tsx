'use client';

import { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import MediaCard from './MediaCard';
import type { Movie, TVShow } from '@/types';

interface MediaRowProps {
    title: string;
    items: (Movie | TVShow)[];
    mediaType: 'movie' | 'tv';
}

export default function MediaRow({ title, items, mediaType }: MediaRowProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    // Get icon based on title
    const getIcon = () => {
        if (title.toLowerCase().includes('trending')) return '🔥';
        if (title.toLowerCase().includes('top rated')) return '⭐';
        if (title.toLowerCase().includes('popular')) return '📈';
        return '🎬';
    };

    if (!items || items.length === 0) return null;

    return (
        <div className="relative px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center space-x-2">
                    <span>{getIcon()}</span>
                    <span>{title}</span>
                </h2>
                <button className="text-accent-primary hover:text-accent-secondary text-sm font-medium transition-colors">
                    View All →
                </button>
            </div>

            {/* Scrollable Container */}
            <div className="relative group">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background-secondary/90 hover:bg-background-tertiary text-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                    aria-label="Scroll left"
                >
                    <FiChevronLeft size={24} />
                </button>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background-secondary/90 hover:bg-background-tertiary text-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity mr-2"
                    aria-label="Scroll right"
                >
                    <FiChevronRight size={24} />
                </button>

                {/* Cards Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {items.map((item) => (
                        <div key={item.id} className="flex-shrink-0 w-40 sm:w-48">
                            <MediaCard media={item} mediaType={mediaType} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
