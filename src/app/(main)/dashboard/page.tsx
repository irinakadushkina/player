import { Scroller } from '../components/scroller';
import Card from './components/card/card';
import styles from './page.module.scss';

const Dashboard = () => {
    return (
        <div className={styles.dashboard}>
            <section className={styles.videoTitle}>
            <video width="250" autoPlay loop muted>
                <source src="https://assets.mixkit.co/videos/32973/32973-720.mp4" type="video/mp4" />
            </video>
                <h1 className={styles.title}>ANTARES</h1>
            </section>
            Recomendations
            <Scroller>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />        
                    <Card />
            </Scroller>
        </div>
    )
}

export default Dashboard;
