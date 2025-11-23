'use client';

import { FiX } from 'react-icons/fi';

interface VideoPlayerProps {
    embedUrl: string;
    title: string;
    onClose?: () => void;
}

export default function VideoPlayer({ embedUrl, title, onClose }: VideoPlayerProps) {
    return (
        <div className="relative w-full bg-black">
            {/* Close Button (optional) */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    aria-label="Close player"
                >
                    <FiX size={24} />
                </button>
            )}

            {/* Player Container */}
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <iframe
                    src={embedUrl}
                    title={title}
                    className="absolute top-0 left-0 w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
            </div>
        </div>
    );
}
