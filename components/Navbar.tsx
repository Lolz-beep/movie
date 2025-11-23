'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-lg' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold gradient-text">CineBy</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className="text-foreground hover:text-accent-primary transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/movies"
                            className="text-foreground hover:text-accent-primary transition-colors"
                        >
                            Movies
                        </Link>
                        <Link
                            href="/tv"
                            className="text-foreground hover:text-accent-primary transition-colors"
                        >
                            TV Shows
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:block">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search movies, TV shows..."
                                className="w-64 px-4 py-2 pl-10 bg-background-secondary border border-border-color rounded-full text-sm focus:outline-none focus:border-accent-primary transition-colors"
                            />
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-secondary" />
                        </form>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-foreground"
                    >
                        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden glass border-t border-border-color">
                    <div className="px-4 py-4 space-y-4">
                        <Link
                            href="/"
                            className="block text-foreground hover:text-accent-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/movies"
                            className="block text-foreground hover:text-accent-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Movies
                        </Link>
                        <Link
                            href="/tv"
                            className="block text-foreground hover:text-accent-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            TV Shows
                        </Link>
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-full px-4 py-2 pl-10 bg-background-secondary border border-border-color rounded-full text-sm focus:outline-none focus:border-accent-primary transition-colors"
                            />
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-secondary" />
                        </form>
                    </div>
                </div>
            )}
        </nav>
    );
}
