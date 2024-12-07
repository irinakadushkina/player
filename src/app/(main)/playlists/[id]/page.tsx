import React from "react"
import { getPlaylist } from "@/app/services/playlists";
import { PlaylistType } from "@/app/types/playlists";
import { Track } from "../../components/track";

interface PlaylistPageProps {
    params: Promise<{ id: string }>
}

const PlaylistPage: React.FC<PlaylistPageProps> = async ({ params }) => {
    const id = (await params).id;
    const playlist: PlaylistType = await getPlaylist(id);


    // todo: тоже нужен дизайн

    return (
        <div style={{ width: "100%" }}>
            playlist #{id} -- {playlist.title}
            <br />
            <br />
            <br />
            {
                playlist.tracks.map(trackId => (
                    <Track key={trackId} trackId={trackId} />
                ))
            }
        </div>
    )
}

export default PlaylistPage;
