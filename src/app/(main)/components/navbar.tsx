'use client'
import { Button, Theme, useTheme } from "@mui/material";
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
    justify-content: space-between;

    max-width: 250px;
    width: 20%;

    padding: 16px 8px;
`;

const TopContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const LogoutButton = styled(Button)`
    width: 100%;
    height: 48px;
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
            <TopContainer>
                {
                    ROUTES.map(({id, name, url})=> <NavLink key={id} href={url} theme={theme}>{name}</NavLink>)
                }
            </TopContainer>
        </NavContainer>
    )
}
