'use client';
import React, { useState } from 'react';
import { findTrack } from "@/app/helpers/track-helpers";
import styles from './index.module.scss';
import { FaPlay, FaRegHeart  } from "react-icons/fa";

interface TrackProps {
    trackId: string
}

export const Track: React.FC<TrackProps> = ({ trackId }) => {
    const { title, artists, cover } = findTrack(trackId);
    const [isHovered, setIsHovered] = useState(false);

    const onMouseOver = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    return (
        <div className={styles.trackWrapper} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
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
