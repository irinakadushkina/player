'use client'
import React from 'react';
import { useUnit } from 'effector-react';
import { $currentTrackId, $playingType, changePlayingType } from '@/app/store/queue';
import { Box, Button, Slider, Typography, useMediaQuery } from '@mui/material';
import { useAudio } from '@/app/hooks/use-audio';
import styles from './index.module.scss';
import { FaPlay, FaPause, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { FaVolumeHigh, FaVolumeLow, FaVolumeXmark } from "react-icons/fa6";
import { TbRepeat, TbRepeatOff, TbRepeatOnce } from "react-icons/tb";
import { TrackLine } from '../track-line';

export const BottomPlayer = () => {
    const mobile = useMediaQuery('(max-width: 700px)');
    const { track: { cover, title, artists, isPlaying, duration, progress, volume, mute }, handlePlayButtonClick, handlePrevTrack, handleNextTrack, handleScrub, handleScrubEnd, handleChangeVolume, handleMute } = useAudio();
    const currentTrackId = useUnit($currentTrackId);
    const playingType = useUnit($playingType);

    const changePlayingTypeHandler = () => {
        switch (playingType) {
            case 'repeat': return changePlayingType('repeat_one');
            case 'repeat_one': return changePlayingType('line');
            case 'line': return changePlayingType('repeat')
        }
    }


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
                <Box display="flex" justifyContent={currentTrackId && mobile ? 'flex-end' : 'center'} marginBottom={currentTrackId && !mobile ? '6px' : 0}>
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
                {currentTrackId && !mobile && <TrackLine duration={duration || 0} progress={progress} onScrub={handleScrub} onScrubEnd={handleScrubEnd} />}
            </Box>
            {
                currentTrackId && !mobile && (
                    <Box display="flex" alignItems="center" justifyContent="flex-end" paddingRight="24px" width="33%" gap="12px">
                        <Box onClick={changePlayingTypeHandler} display="flex" alignItems="center">
                            {
                                (playingType === 'repeat' && <TbRepeat size={20} />) ||
                                (playingType === 'repeat_one' && <TbRepeatOnce size={20} />) ||
                                (playingType === 'line' && <TbRepeatOff size={20} />)
                            }
                        </Box>
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
