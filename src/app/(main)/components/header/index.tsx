import { getBaseUrl } from "@/app/helpers/get-base-url";
import Link from "next/link";
import styles from './index.module.css';

type Props = {
    mode?: "dark" | "light";
}

const getStyles = ( mode: 'dark' | 'light' ): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',

    height: '50px',
    width: '100%',

    padding: "4px 24px",

    background: `${mode === 'dark' ? 'black' :  'white'}`
});

const getMe = async () => {
    const res = await fetch(getBaseUrl() + '/api/user', { method: 'GET' });
    const { data } = await res.json();
    return data;
};

export const Header = async ({ mode = 'dark'}: Props) => {
    const { first_name, last_name, avatar } = await getMe();

    return (
        <header style={getStyles(mode)}>
            <Link href='/profile' className={styles.link}>
                {first_name} {last_name}
                <img className={styles.avatar} src={avatar} />
            </Link>
        </header>
    )
}
