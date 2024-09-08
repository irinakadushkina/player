import { Scroller } from '../components/scroller';
import Card from './components/card/card';
import styles from './page.module.scss';

const Dashboard = () => {
    return (
        <div className={styles.dashboard}>
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
