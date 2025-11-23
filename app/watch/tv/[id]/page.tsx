'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import VideoPlayer from '@/components/VideoPlayer';
import { getTVEmbedUrl } from '@/lib/vidking';

interface WatchTVPageProps {
    params: Promise<{ id: string }>;
}

export default function WatchTVPage({ params }: WatchTVPageProps) {
    const searchParams = useSearchParams();
    const [tvId, setTvId] = useState<number | null>(null);
    const [season, setSeason] = useState(1);
    const [episode, setEpisode] = useState(1);

    useEffect(() => {
        params.then(({ id }) => {
            setTvId(parseInt(id));
            const seasonParam = searchParams.get('season');
            const episodeParam = searchParams.get('episode');
            if (seasonParam) setSeason(parseInt(seasonParam));
            if (episodeParam) setEpisode(parseInt(episodeParam));
        });
    }, [params, searchParams]);

    if (!tvId) {
        return <div className="min-h-screen bg-black flex items-center justify-center">
            <p className="text-white">Loading...</p>
        </div>;
    }

    const embedUrl = getTVEmbedUrl(tvId, season, episode, { autoPlay: true });

    return (
        <div className="min-h-screen bg-black">
            {/* Video Player */}
            <div className="w-full">
                <VideoPlayer embedUrl={embedUrl} title={`Season ${season} Episode ${episode}`} />
            </div>

            {/* Episode Info */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-white">
                        Season {season}, Episode {episode}
                    </h1>

                    {/* Episode Navigation */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => setEpisode(Math.max(1, episode - 1))}
                            disabled={episode === 1}
                            className="px-6 py-2 bg-accent-primary hover:bg-accent-secondary text-white rounded-full font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous Episode
                        </button>
                        <button
                            onClick={() => setEpisode(episode + 1)}
                            className="px-6 py-2 bg-accent-primary hover:bg-accent-secondary text-white rounded-full font-semibold transition-all"
                        >
                            Next Episode
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
