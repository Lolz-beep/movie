const VIDKING_BASE_URL = process.env.NEXT_PUBLIC_VIDKING_BASE_URL || 'https://www.vidking.net/embed';

export interface VidKingOptions {
    color?: string;
    autoPlay?: boolean;
}

export const getMovieEmbedUrl = (tmdbId: number, options?: VidKingOptions): string => {
    const url = new URL(`${VIDKING_BASE_URL}/movie/${tmdbId}`);

    if (options?.color) {
        url.searchParams.set('color', options.color);
    }

    if (options?.autoPlay !== undefined) {
        url.searchParams.set('autoPlay', options.autoPlay.toString());
    }

    return url.toString();
};

export const getTVEmbedUrl = (
    tmdbId: number,
    season: number,
    episode: number,
    options?: VidKingOptions
): string => {
    const url = new URL(`${VIDKING_BASE_URL}/tv/${tmdbId}/${season}/${episode}`);

    if (options?.color) {
        url.searchParams.set('color', options.color);
    }

    if (options?.autoPlay !== undefined) {
        url.searchParams.set('autoPlay', options.autoPlay.toString());
    }

    return url.toString();
};
