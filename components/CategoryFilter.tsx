'use client';

import { useState } from 'react';
import { FiHome, FiFilm, FiTv, FiTrendingUp } from 'react-icons/fi';

interface Category {
    id: string;
    label: string;
    icon: React.ReactNode;
}

const categories: Category[] = [
    { id: 'all', label: 'All', icon: <FiHome size={16} /> },
    { id: 'movies', label: 'Movies', icon: <FiFilm size={16} /> },
    { id: 'tv', label: 'TV Shows', icon: <FiTv size={16} /> },
    { id: 'trending', label: 'Trending', icon: <FiTrendingUp size={16} /> },
];

export default function CategoryFilter() {
    const [activeCategory, setActiveCategory] = useState('all');

    return (
        <div className="w-full py-6 border-b border-divider-color">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`
                                flex items-center space-x-2 px-5 py-2.5 rounded-full font-medium text-sm
                                transition-all duration-300 whitespace-nowrap
                                ${activeCategory === category.id
                                    ? 'bg-accent-gradient text-white shadow-md glow'
                                    : 'bg-background-secondary text-foreground-secondary hover:bg-background-tertiary hover:text-foreground'
                                }
                            `}
                        >
                            {category.icon}
                            <span>{category.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
