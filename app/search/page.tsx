import { searchMulti } from '@/lib/tmdb';
import MediaCard from '@/components/MediaCard';

interface SearchPageProps {
    searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q } = await searchParams;
    const query = q || '';

    const results = query ? await searchMulti(query) : { results: [] };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-foreground mb-2">
                    Search Results
                </h1>
                {query && (
                    <p className="text-foreground-secondary mb-8">
                        Showing results for &quot;{query}&quot; {'total_results' in results ? `(${results.total_results} results)` : ''}
                    </p>
                )}

                {results.results.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {results.results
                            .filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
                            .map((item) => (
                                <MediaCard
                                    key={`${item.media_type}-${item.id}`}
                                    media={item as any}
                                    mediaType={item.media_type}
                                />
                            ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-foreground-secondary text-lg">
                            {query ? 'No results found' : 'Enter a search query to get started'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
