import { history, playlists } from '@/mock/playlists';
import { Track } from '../components/track';
import styles from './page.module.scss';
import { PlaylistCard } from '../playlists/components/playlist-card';
import cn from 'classnames';
import { Typography } from '@mui/material';

const Dashboard = () => {
    return (
        <div className={styles.dashboard}>
            <section className={styles.videoTitle}>
                <video width="250" autoPlay loop muted>
                    <source src="https://assets.mixkit.co/videos/32973/32973-720.mp4" type="video/mp4" />
                </video>
                <h1 className={styles.title}>ANTARES</h1>
            </section>
            <Typography sx={{ padding: "4px 16px"}}>Latest tracks</Typography>
            <div className={cn(styles.block, styles.list)}>
                {   
                    history.tracks?.map(trackId => (
                        <Track key={trackId} trackId={trackId} playlistId='000_history' /> // сделать потом запросом
                    ))
                }
            </div>
            <Typography sx={{ padding: "4px 16px"}}>Latest playlists</Typography>
            <div className={styles.block}>
                {playlists?.map((item) =>
                    <PlaylistCard key={item.id} playlist={item} /> // тут тоже
                )}
            </div>
        </div>
    )
}

export default Dashboard;
