'use client'
import React from 'react';
import { useUnit } from 'effector-react';
import { $currentTrackId } from '@/app/store/queue';
import { Box } from '@mui/material';
import { useAudio } from '@/app/hooks/use-audio';

export const BottomPlayer = () => {
    const { track, handlePlayButtonClick } = useAudio();
    const currentTrackId = useUnit($currentTrackId);

    if (!currentTrackId) return null;
 
    return (
        <Box sx={{ position: 'fixed', bottom: 0, padding: '12px 24px', bgcolor: 'primary.main', width: '100%' }} onClick={handlePlayButtonClick} >
            <img src={track.cover}/>
            {track.title}
        </Box>
    )
};
