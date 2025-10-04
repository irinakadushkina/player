export interface PlaylistType {
        id: string;
        title: string;
        cover?: string | null;
        tracks: string[];
        liked: number;
        listened: number;
}

export type PlaylistsType = PlaylistType[];