'use client';
import React, { useState } from 'react';
import { findTrack } from "@/app/helpers/track-helpers";
import styles from './index.module.scss';
import { FaPlay, FaRegHeart, FaPause } from "react-icons/fa";
import { updateCurrentId, $currentTrackId, $playing, setPlaying, updateQueue } from '@/app/store/queue';
import { useUnit } from 'effector-react';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { playlists } from '@/mock/playlists';
import { Typography } from '@mui/material';

interface TrackProps {
    trackId: string
}

export const Track: React.FC<TrackProps> = ({ trackId }) => {
    const { title, artists, cover, id } = findTrack(trackId);
    const [isHovered, setIsHovered] = useState(false);
    const currentTrackId = useUnit($currentTrackId);
    const isPlaying = useUnit($playing);
    const isCurrentTrack = currentTrackId === id;
    const pathname = usePathname();
    const [ _, type, listId] = pathname.split('/');

    const onMouseOver = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    const handleClick = () => {
        if (isCurrentTrack) setPlaying(!isPlaying); 
        else {
            const nextList = playlists.find(item => item.id === listId);
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
