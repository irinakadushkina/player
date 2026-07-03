import { Header } from "./components/header";
import { NavBar } from "./components/navbar";
import { NavBarMobile } from "./components/navbar-mobile";
import { Player } from "./components/player";
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
                <NavBarMobile />
                <main className={styles.main}>
                    <div>
                        {children}
                    </div>
                    <Player />
                </main>
            </div>
        </div>
    )
};

export default MainLayout
