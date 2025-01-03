'use client'
import React from 'react';
import { useUnit } from 'effector-react';
import { $currentTrackId } from '@/app/store/queue';
import { Box } from '@mui/material';
import { useAudio } from '@/app/hooks/use-audio';
import styles from './index.module.scss';

export const BottomPlayer = () => {
    const { track, handlePlayButtonClick } = useAudio();
    const currentTrackId = useUnit($currentTrackId);

    if (!currentTrackId) return null;
 
    return (
        <Box className={styles.box} onClick={handlePlayButtonClick} >
            <img className={styles.trackCover} src={track.cover}/>
            {track.title}
        </Box>
    )
};
