export interface TrackType {
    id: string,
    src: string,
    title: string,
    cover: string,
    artists: string[],
}

export type TracksType = TrackType[];