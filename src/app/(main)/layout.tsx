import { BottomPlayer } from "./components/bottom-player";
import { Header } from "./components/header";
import { NavBar } from "./components/navbar";
import styles from './layout-styles.module.scss';

type Props = {
    children?: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {

    return (
        <div className={styles.root}>
            <Header />
            <div className={styles.container}>
                <NavBar />
                <main className={styles.main}>
                    {children}
                </main>
            </div>
            <BottomPlayer />
        </div>
    )
};

export default MainLayout