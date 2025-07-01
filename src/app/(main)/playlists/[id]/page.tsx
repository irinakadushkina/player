import React from "react"
import { getPlaylist } from "@/app/services/playlists";
import { Track } from "../../components/track";
import { Box, Typography } from "@mui/material";
import { FaMusic } from "react-icons/fa6";

interface PlaylistPageProps {
    params: Promise<{ id: string }>
}

const PlaylistPage: React.FC<PlaylistPageProps> = async ({ params }) => {
    const id = (await params).id;
    const { title, tracks, listened, liked } = await getPlaylist(id) || {};

    return (
        <div style={{ width: "100%" }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: '20px', padding: '10px'}}>
                <Box sx={{ width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '-1px 1px 7px 5px #111111', marginRight: '20px' }}>
                    <FaMusic color="grey" size='24' />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <Typography>{title?.toLocaleUpperCase()}</Typography>
                    <Typography>Listened: {listened}</Typography>
                    <Typography>Liked: {liked}</Typography>
                </Box>
            </Box>
            {
                tracks?.map(trackId => (
                    <Track key={trackId} trackId={trackId} />
                ))
            }
        </div>
    )
}

export default PlaylistPage;
