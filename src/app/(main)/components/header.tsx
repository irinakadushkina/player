'use client'

import { useEffect, useState } from "react";

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

const imageStyles: React.CSSProperties = {
    width: '42px',
    height: '42px',

    borderRadius: '50%',
    marginLeft: '12px',
}

const getMe = async () => {
    const res = await fetch('/api/user', { method: 'GET' });
    const { data } = await res.json();
    return data;
};

export const Header = ({ mode = 'dark'}: Props) => {
    const [user, setUser] = useState({ first_name: null, last_name: null, avatar: ''});

    const test = async () => {
        const data = await getMe();
        setUser(data)
    };

    const { first_name, last_name, avatar } = user;

    useEffect(() => {
        test();
    }, [])

    return (
        <header style={getStyles(mode)}>
            {first_name} {last_name}
            <img style={imageStyles} src={avatar} />
        </header>
    )
}
