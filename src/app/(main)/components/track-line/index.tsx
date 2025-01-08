import React from "react";
import styles from './index.module.scss';

interface TrackLineProps {
    progress: number;
    duration: number;
    onScrubEnd: () => void;
    onScrub: (time: number) => void;
}

export const TrackLine: React.FC<TrackLineProps> = ({ progress, duration, onScrub, onScrubEnd }) => {
    //todo: добавить отображение времени
    return (
        <input
            className={styles.line}
            type='range'
            value={progress}
            max={duration}
            onChange={(e) => onScrub(+e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
        />
    )
};
