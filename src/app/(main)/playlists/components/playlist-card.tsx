'use client'
import { PlaylistType } from '@/app/types/playlists';
import { ImageListItem, ImageListItemBar } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation'

interface PlaylistCardProps {
    playlist: PlaylistType
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/playlists/${playlist.id}`);
    }

    // todo: подумать как сделать красивенько
    return (
        <ImageListItem key={playlist.cover} sx={{ cursor: 'pointer' }} onClick={handleClick}>
                    <img
                        style={{ pointerEvents: 'none' }}
                        srcSet={`${playlist.cover}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${playlist.cover}?w=248&fit=crop&auto=format`}
                        alt={playlist.title}
                        loading="lazy"
                    />
                    <ImageListItemBar title={playlist.title} />
                </ImageListItem>
    )
}