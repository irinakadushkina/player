'use client';
import { Typography, useMediaQuery } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FaPlay, FaRegHeart, FaPause } from "react-icons/fa";

import { findTrack } from "@/app/helpers/track-helpers";
import { updateCurrentId, $currentTrackId, $playing, setPlaying, updateQueue } from '@/app/store/queue';
import { setPlayingRadio, updateCurrentRadio } from '@/app/store/radio';
import { playlists, history as mockHistory } from '@/mock/playlists';

import styles from './index.module.scss';

interface TrackProps {
    trackId: string;
    playlistId?: string
}

export const Track: React.FC<TrackProps> = ({ trackId, playlistId }) => {
    const mobile = useMediaQuery('(max-width: 700px)');
    const { title, artists, cover, id } = findTrack(trackId);
    const [isHovered, setIsHovered] = useState(false);
    const currentTrackId = useUnit($currentTrackId);
    const isPlaying = useUnit($playing);
    const isCurrentTrack = currentTrackId === id;
    const pathname = usePathname();
    const [ _, type, listId] = pathname.split('/');
    const currentPlaylistId = playlistId || listId;

    const onMouseOver = () => {
        if (mobile) return;
        setIsHovered(true);
    }
    const onMouseLeave = () => {
        if (mobile) return;
        setIsHovered(false);
    }

    const handleClick = () => {
        updateCurrentRadio(undefined);
        setPlayingRadio(false);
        if (isCurrentTrack) setPlaying(!isPlaying); 
        else {
            const nextList = [...playlists, mockHistory].find(item => item.id === currentPlaylistId);
            updateQueue(nextList?.tracks || []);
            updateCurrentId(id);
        }
    }

    return (
        <div className={cn(styles.trackWrapper, {[styles.active]: isCurrentTrack})} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} onClick={handleClick}>
            <div className={styles.trackInfo}>
                <img src={cover} />
                <div className={styles.iconWrapper}>
                    {
                        isCurrentTrack && isPlaying ? <FaPause /> : <FaPlay />
                    }
                </div>
                <div className={styles.titleBlock}> 
                    <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>{title}</Typography>
                    <Typography sx={{ opacity: .5, fontSize: '14px' }}>{artists.join(', ')}</Typography>
                </div>
            </div>
            {
                isHovered && (
                    <div className={styles.actionsBlock}>
                        <FaRegHeart />
                    </div>
                )
            }
        </div>
    )
};
