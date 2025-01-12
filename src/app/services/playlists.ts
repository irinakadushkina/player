import { getBaseUrl } from "../helpers/get-base-url";
import { PlaylistType } from "../types/playlists";

export const getPlaylists = async () => {
    const res = await fetch(getBaseUrl() + '/api/playlists', { method: 'GET', cache:"no-cache" });
    try {
        const { data } = await res.json();
    return data;
    } catch (e) {
        console.log('error =>', e)
    }
};

export const getPlaylist = async (id: string): Promise<PlaylistType | undefined> => {
    const res = await fetch(getBaseUrl() + `/api/playlists/${id}`, { method: 'GET', cache:"no-cache" });
    try {
        const { data } = await res.json();
    return data;
    } catch (e) {
        console.log('error =>', e)
    }
};

