import { Theme, useTheme } from "@mui/material";
import Link from "next/link"
import styled from "styled-components";


const ROUTES = [
    { 
        id: 'dashboard',
        name: 'Dashboard',
        icon: null,
        url: '/dashboard'
    },
    { 
        id: 'my',
        name: 'My playlists',
        icon: null,
        url: '/playlists'
    },
    { 
        id: 'podcasts',
        name: 'Podcasts',
        icon: null,
        url: '/podcasts'
    },
]

const NavContainer = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    max-width: 250px;
    width: 20%;

    padding: 16px 8px;
`;

const NavLink = styled(Link)<{ theme: Theme }>`
    color: ${({ theme }) => theme.palette.primary.main};
    padding: 12px;
    border-radius: 4px;

    width: 100%;
    text-align: center;
    transition: .25s;

    &:hover {
        background: ${({ theme }) => `${theme.palette.primary.main}50`};
        color: ${({ theme }) => theme.palette.primary.dark};
    }
`;

export const NavBar = () => {
    const theme = useTheme();

    return (
        <NavContainer>
            {
                ROUTES.map(({id, name, url})=> <NavLink key={id} href={url} theme={theme}>{name}</NavLink>)
            }
        </NavContainer>
    )
}
