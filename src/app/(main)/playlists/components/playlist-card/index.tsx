'use client'
/* eslint-disable import/order */
import { useRouter } from 'next/navigation';
import React from 'react';
import {
    Box,
    ImageListItem,
    ImageListItemBar,
    Typography
} from '@mui/material';
import { FaMusic } from "react-icons/fa6";
import styles from './index.module.scss';

import type { PlaylistType } from '@/app/types/playlists';

interface PlaylistCardProps {
    playlist: PlaylistType
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
    const { title, id, cover } = playlist;
    const router = useRouter();

    const handleClick = () => {
        router.push(`/playlists/${playlist.id}`);
    }

    return (
        <ImageListItem key={cover} className={styles.card} onClick={handleClick}>
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
                    <Box sx={{ position: 'absolute', bottom: 0, padding: '12px 16px', background: 'rgba(0, 0, 0, 0.5)', width: '100%' }}>
                        <Typography>{title}</Typography>
                    </Box>
                </Box>
            }
        </ImageListItem>
    )
}
/* eslint-enable import/order */


