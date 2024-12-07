import { artists } from "@/mock/artists";
import { tracks } from "@/mock/tracks";
import { TrackType } from "../types/tracks";

export const findTrack = (id: string): TrackType => {
    const trackInfo = tracks.find(track => track.id === id);
    const artistInfo = artists.filter(artist => trackInfo?.artists.includes(artist.id)).map(artist => artist.name);

    return {
        ...trackInfo,
        artists: artistInfo,
    } as TrackType
}
