export interface PlaylistType {
        id: string;
        title: string;
        cover: string;
        tracks: string[];
        liked: number;
        listened: number;
}

export type PlaylistsType = PlaylistType[];