'use client';
import React, { useState } from 'react';
import { findTrack } from "@/app/helpers/track-helpers";
import styles from './index.module.scss';
import { FaPlay, FaRegHeart  } from "react-icons/fa";
import { updateCurrentId, $currentTrackId } from '@/app/store/queue';
import { useUnit } from 'effector-react';

interface TrackProps {
    trackId: string
}

export const Track: React.FC<TrackProps> = ({ trackId }) => {
    const { title, artists, cover, id } = findTrack(trackId);
    const [isHovered, setIsHovered] = useState(false);
    const currentTrackId = useUnit($currentTrackId);
    const isCurrentTrack = currentTrackId === id;

    const onMouseOver = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    const handleClick = () => {
        updateCurrentId(id);
    }

    return (
        <div className={styles.trackWrapper} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} onClick={handleClick}>
            <div className={styles.trackInfo}>
                <img src={cover} />
                <div className={styles.iconWrapper}>
                    <FaPlay id="playIcon"/>
                </div>
                <div className={styles.titleBlock}> 
                    <span>{title}</span>
                    <span className={styles.artists}>{artists.join(', ')}</span>
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
