import { getBaseUrl } from "../helpers/get-base-url";

export const getPlaylists = async () => {
    const res = await fetch(getBaseUrl() + '/api/playlists', { method: 'GET' });
    try {
        const { data } = await res.json();
    return data;
    } catch (e) {
        console.log('error =>', e)
    }
};

export const getPlaylist = async (id: string) => {
    const res = await fetch(getBaseUrl() + `/api/playlists/${id}`, { method: 'GET' });
    try {
        const { data } = await res.json();
    return data;
    } catch (e) {
        console.log('error =>', e)
    }
};

