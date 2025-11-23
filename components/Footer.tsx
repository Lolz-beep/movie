'use client';

import Link from 'next/link';
import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';

export default function Footer() {
    return (
        <footer className="bg-background-secondary border-t border-border-color mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold gradient-text">CineBy</h3>
                        <p className="text-foreground-secondary text-sm">
                            Your ultimate destination for streaming movies and TV shows.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-foreground font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-foreground-secondary hover:text-accent-primary transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/movies" className="text-foreground-secondary hover:text-accent-primary transition-colors">
                                    Movies
                                </Link>
                            </li>
                            <li>
                                <Link href="/tv" className="text-foreground-secondary hover:text-accent-primary transition-colors">
                                    TV Shows
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-foreground font-semibold mb-4">Categories</h4>
                        <ul className="space-y-2 text-sm text-foreground-secondary">
                            <li>Action</li>
                            <li>Comedy</li>
                            <li>Drama</li>
                            <li>Sci-Fi</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-foreground font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-foreground-secondary hover:text-accent-primary transition-colors"
                                aria-label="GitHub"
                            >
                                <FiGithub size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-foreground-secondary hover:text-accent-primary transition-colors"
                                aria-label="Twitter"
                            >
                                <FiTwitter size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-foreground-secondary hover:text-accent-primary transition-colors"
                                aria-label="Instagram"
                            >
                                <FiInstagram size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-border-color text-center text-sm text-foreground-secondary">
                    <p>&copy; {new Date().getFullYear()} CineBy. All rights reserved.</p>
                    <p className="mt-2">
                        Powered by{' '}
                        <a
                            href="https://www.themoviedb.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent-primary hover:underline"
                        >
                            TMDB
                        </a>
                        {' '}and{' '}
                        <a
                            href="https://www.vidking.net/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent-primary hover:underline"
                        >
                            VidKing
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
