import { Header } from "./components/header";
import { NavBar } from "./components/navbar";

const root: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',

    height: '100vh',
    width: '100vw'
};

const childContainer = {
    padding: '16px 8px',
    margin: '12px 12px 12px 0',
    display: 'flex',
    width: '80%',
    minWidth: 'calc(100vw - 250px)',

    borderRadius: '12px',
    background: "#000000",
};

const container = {
    display: 'flex',
    height: 'calc(100vh - 50px)',
};

type Props = {
    children?: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {

    return (
        <div style={root}>
            <Header />
            <div style={container}>
                <NavBar />
                <main style={childContainer}>
                    {children}
                </main>
            </div>
        </div>
    )
};

export default MainLayout