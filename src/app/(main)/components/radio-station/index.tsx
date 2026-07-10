'use client';
import { Typography, useMediaQuery } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import React, { useState } from 'react';
import { FaPlay, FaRegHeart, FaPause } from "react-icons/fa";

import { findRadioStation } from '@/app/helpers/radio-helper';
import { setPlaying, updateCurrentId } from '@/app/store/queue';
import { $currentRadio, $playingRadio, setPlayingRadio, updateCurrentRadio } from '@/app/store/radio';

import styles from './index.module.scss';

interface TrackProps {
    station: string;
}

export const RadioStation: React.FC<TrackProps> = ({ station }) => {
    const mobile = useMediaQuery('(max-width: 700px)');
    const { id, name, image } = findRadioStation(station);
    const [isHovered, setIsHovered] = useState(false);
    const currentRadio = useUnit($currentRadio);
    const isPlaying = useUnit($playingRadio);

    const onMouseOver = () => {
        if (mobile) return;
        setIsHovered(true);
    }
    const onMouseLeave = () => {
        if (mobile) return;
        setIsHovered(false);
    }

    const handleClick = () => {
        updateCurrentId(undefined);
        setPlaying(false);
        if (currentRadio === id) setPlayingRadio(!isPlaying);
        else {
            updateCurrentRadio(id);
        }
    }

    return (
        <div className={cn(styles.trackWrapper, { [styles.active]: currentRadio === id })} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} onClick={handleClick}>
            <div className={styles.trackInfo}>
                <img src={image} />
                <div className={styles.iconWrapper}>
                    {
                        currentRadio === id && isPlaying ? <FaPause /> : <FaPlay />
                    }
                </div>
                <div className={styles.titleBlock}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>{name}</Typography>
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
