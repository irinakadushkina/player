import { findTrack } from "@/app/helpers/track-helpers";
import styles from './index.module.scss';
import { FaPlay } from "react-icons/fa";

export const Track = ({ trackId }: { trackId: string }) => {
    const { id, title, artists, cover } = findTrack(trackId);

    return (
        <div className={styles.trackWrapper}>
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
        </div>
    )
};
