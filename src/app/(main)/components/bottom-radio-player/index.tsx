'use client'
import React from 'react';
import { Box, Button, Slider, Typography, useMediaQuery } from '@mui/material';
import styles from './index.module.scss';
import { FaPlay, FaPause } from "react-icons/fa";
import { FaVolumeHigh, FaVolumeLow, FaVolumeXmark } from "react-icons/fa6";
import { useRadio } from '@/app/hooks/use-radio';
import { setPlayingRadio } from '@/app/store/radio';

export const BottomRadioPlayer = ({ hide }: { hide?: boolean }) => {
    const mobile = useMediaQuery('(max-width: 700px)');
    const {
        currentRadio,
        isPlaying,
        volume,
        handleMute,
        handleChangeVolume,
        mute
    } = useRadio();


    const handleClick = () => {
        setPlayingRadio(!isPlaying);
    }

    if (hide) return null;

    return (
        <Box className={styles.box} justifyContent={currentRadio?.id && !mobile ? 'space-between' : 'center'}>
            {currentRadio && <Box display="flex" alignItems="center" width={mobile ? '75%' : '33%'}>
                <img className={styles.trackCover} src={currentRadio.image} />
                <Box display='flex' flexDirection='column'>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>{currentRadio?.name}</Typography>
                </Box>
            </Box>
            }
            <Box display="flex" width="33%" flexDirection='column'>
                <Box display="flex" justifyContent={currentRadio && mobile ? 'flex-end' : 'center'} marginBottom={currentRadio?.id && !mobile ? '6px' : 0}>
                    <Button sx={{ padding: '8px' }} onClick={handleClick}>
                        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                    </Button>
                </Box>
            </Box>
            {
                currentRadio && !mobile && (
                    <Box display="flex" alignItems="center" justifyContent="flex-end" paddingRight="24px" width="33%" gap="12px">
                        <Box display="flex" alignItems="center" gap="16px">
                            {volume >= 50 && !mute && <FaVolumeHigh onClick={handleMute} />}
                            {volume < 50 && volume > 0 && !mute && <FaVolumeLow onClick={handleMute} />}
                            {(volume === 0 || mute) && <FaVolumeXmark onClick={handleMute} />}
                            <Slider aria-label="volume" value={volume} onChange={handleChangeVolume} sx={{ width: '100px' }} />
                        </Box>
                    </Box>
                )
            }
        </Box>
    )
};
