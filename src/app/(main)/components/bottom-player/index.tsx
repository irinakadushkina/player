'use client'
import React from 'react';
import { useUnit } from 'effector-react';
import { $currentTrackId } from '@/app/store/queue';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { useAudio } from '@/app/hooks/use-audio';
import styles from './index.module.scss';
import { FaPlay, FaPause, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import { TrackLine } from '../track-line';

export const BottomPlayer = () => {
    const mobile = useMediaQuery('(max-width: 700px)');
    const { track: { cover, title, artists, isPlaying, duration, progress }, handlePlayButtonClick, handlePrevTrack, handleNextTrack, handleScrub, handleScrubEnd } = useAudio();
    const currentTrackId = useUnit($currentTrackId);

    return (
        <Box className={styles.box} justifyContent={currentTrackId && !mobile ? 'space-between' : 'center'}>
            {currentTrackId && <Box display="flex" alignItems="center" width={mobile ? '75%' : '33%'}>
                <img className={styles.trackCover} src={cover} />
                <Box display='flex' flexDirection='column'>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>{title}</Typography>
                    <Typography sx={{ opacity: .5, fontSize: '14px' }}>{artists?.join(', ')}</Typography>
                </Box>
            </Box>
            }
            <Box display="flex" width="33%" flexDirection='column'>
                <Box display="flex" justifyContent={currentTrackId && mobile ? 'flex-end' : 'center'} marginBottom='6px'>
                    {currentTrackId && !mobile && (
                        <Button sx={{ padding: '8px' }} onClick={handlePrevTrack}>
                            <FaAngleDoubleLeft size={20} />
                        </Button>
                    )
                    }
                    <Button sx={{ padding: '8px' }} onClick={handlePlayButtonClick}>
                        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                    </Button>
                    {currentTrackId && !mobile && (
                        <Button sx={{ padding: '8px' }} onClick={handleNextTrack}>
                            <FaAngleDoubleRight size={20} />
                        </Button>
                    )   
                    }
                </Box>
                <TrackLine duration={duration || 0} progress={progress} onScrub={handleScrub} onScrubEnd={handleScrubEnd} />
            </Box>
            {
                currentTrackId && !mobile && (
                    <Box display="flex" alignItems="center" justifyContent="flex-end" paddingRight="24px" width="33%" gap="12px">
                        <FaRepeat size={16} />
                    </Box>
                )
            }
        </Box>
    )
};
