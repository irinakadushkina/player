import { Scroller } from '../components/scroller';
import { Swipper } from '../components/swipper';
import Card from './components/card/card';
import styles from './page.module.scss';

const test = [
    <Card key={0} />,
    <Card key={1} />,
    <Card key={2} />,
    <Card key={3} />,
    <Card key={4} />,
    <Card key={5} />,
    <Card key={6} />,
    <Card key={7} />,
    <Card key={8} />,
    <Card key={9} />,
    <Card key={10} />,
    <Card key={11} />,
    <Card key={12} />,
    <Card key={13} />
];

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
            <Swipper elements={test} />
        </div>
    )
}

export default Dashboard;
