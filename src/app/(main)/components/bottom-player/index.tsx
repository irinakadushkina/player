'use client'
import React from 'react';
import { useUnit } from 'effector-react';
import { $currentTrackId } from '@/app/store/queue';
import { Box, Button, Typography } from '@mui/material';
import { useAudio } from '@/app/hooks/use-audio';
import styles from './index.module.scss';
import { FaPlay, FaPause, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";

export const BottomPlayer = () => {
    const { track: { cover, title, artists, isPlaying }, handlePlayButtonClick, handlePrevTrack, handleNextTrack } = useAudio();
    const currentTrackId = useUnit($currentTrackId);

    return (
        <Box className={styles.box} justifyContent={currentTrackId ? 'space-between' : 'center'}>
            {currentTrackId && <Box display="flex" alignItems="center" width="33%">
                <img className={styles.trackCover} src={cover} />
                <Box display='flex' flexDirection='column'>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>{title}</Typography>
                    <Typography sx={{ opacity: .5, fontSize: '14px' }}>{artists?.join(', ')}</Typography>
                </Box>
            </Box>
            }
            <Box display="flex" width="33%" justifyContent='center'>
                <Button sx={{ padding: '12px' }} onClick={handlePrevTrack}>
                    <FaAngleDoubleLeft size={24} />
                </Button>
                <Button sx={{ padding: '12px' }} onClick={handlePlayButtonClick}>
                    {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
                </Button>
                <Button sx={{ padding: '12px' }} onClick={handleNextTrack}>
                    <FaAngleDoubleRight size={24} />
                </Button>
            </Box>
            {
                currentTrackId && (
                    <Box display="flex" alignItems="center" justifyContent="flex-end" paddingRight="24px" width="33%" gap="12px">
                        <FaRepeat size={16} />
                    </Box>
                )
            }
        </Box>
    )
};
