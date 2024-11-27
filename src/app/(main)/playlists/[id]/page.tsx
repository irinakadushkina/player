import { getPlaylist } from "@/app/services/playlists";
import { PlaylistType } from "@/app/types/playlists";
import React from "react"

interface PlaylistPageProps {
    params: Promise<{ id: string }>
}

const PlaylistPage: React.FC<PlaylistPageProps> = async ({ params }) => {
    const id = (await params).id;
    const playlist: PlaylistType = await getPlaylist(id);


    // todo: тоже нужен дизайн

    return (
        <div>
            playlist #{id} -- {playlist.title}
            <br />
            <br />
            <br />
            { 
            // todo: добавить компонент трека (общий)
                playlist.tracks.map(track => <div key={track}>track id = {track}</div>)
            }
        </div>
    )
}

export default PlaylistPage;
