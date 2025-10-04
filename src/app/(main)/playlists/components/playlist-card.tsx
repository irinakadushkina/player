'use client'
import { PlaylistType } from '@/app/types/playlists';
import { Box, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaMusic } from "react-icons/fa6";

interface PlaylistCardProps {
    playlist: PlaylistType
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
    const { title, id, cover } = playlist;
    const router = useRouter();

    const handleClick = () => {
        router.push(`/playlists/${playlist.id}`);
    }

    // todo: подумать как сделать красивенько
    return (
//         div {
//   width: 30%;
//   margin: auto;
//   background: silver;
//   overflow: hidden; /* clearfix */
// }

// div:before {
//   content: "";
//   padding-top: 100%;
//   float: left;
// }

        <ImageListItem key={cover} sx={{  boxShadow: '-1px 1px 7px 5px #111111', cursor: 'pointer', width: '100%', ':before': { content: '""', paddingTop: '100%', float: 'left'} }} onClick={handleClick}>
            {cover ?
                <>
                    <img
                        style={{ pointerEvents: 'none', width: '100%', height: '100%' }}
                        srcSet={`${cover}?fit=crop&auto=format&dpr=2 2x`}
                        src={`${cover}?fit=crop&auto=format`}
                        alt={title}
                        loading="lazy"
                    />
                    <ImageListItemBar title={title} />
                </>
                :
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                    <FaMusic size={54} />
                    <Box sx={{ position: 'absolute', bottom: 0, padding: '12px 16px', background: 'rgba(0, 0, 0, 0.5)', width: '100%'}}>
                        <Typography>{title}</Typography>
                    </Box>
                </Box>
                }
        </ImageListItem>
    )
}
