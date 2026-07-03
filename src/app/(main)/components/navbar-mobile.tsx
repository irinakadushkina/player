'use client';

import { BottomNavigation, BottomNavigationAction, Theme, useTheme } from '@mui/material';
import Link from 'next/link';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { RiDashboardFill, RiPlayListFill } from 'react-icons/ri';
import { MdRadio } from 'react-icons/md';
import { SiApplepodcasts } from 'react-icons/si';


type Route = {
    id: string;
    name: string;
    Icon: React.ComponentType<any>;
    url: string;
}


const ROUTES: Route[] = [
    { id: 'dashboard', name: 'Dashboard', Icon: RiDashboardFill, url: '/dashboard' },
    { id: 'my', name: 'Playlists', Icon: RiPlayListFill, url: '/playlists' },
    { id: 'radio', name: 'Radio', Icon: MdRadio, url: '/radio' },
    { id: 'podcasts', name: 'Podcasts', Icon: SiApplepodcasts, url: '/podcasts' },
];

const MobileNavContainer = styled('div') <{ theme: Theme }>`
display: none;

@media (max-width: 700px) {
display: block;
position: fixed;
bottom: 0;
left: 0;
right: 0;
z-index: 1000;
background: ${({ theme }: { theme: Theme }) => theme.palette.background.paper};
border-top: 1px solid ${({ theme }) => theme.palette.divider};
}
`;

const StyledLink = styled(Link)`
  text-decoration: none; color: inherit;
`;

export const NavBarMobile = () => {
    const theme = useTheme();
    const pathname = usePathname();

    const [value, setValue] = useState(pathname || '/dashboard');

    return (
        <MobileNavContainer theme={theme}>
            <BottomNavigation
                value={value}
                onChange={(_, newValue) => setValue(newValue as string)}
                showLabels
            >
                {ROUTES.map((route) => {
                    const IconComponent = route.Icon;

                    return (
                        <BottomNavigationAction
                            key={route.url}
                            component={StyledLink}
                            href={route.url}
                            value={route.url}
                            label={route.name}
                            icon={<IconComponent style={{ fontSize: 24 }} />}
                            sx={{
                                '& .MuiBottomNavigationAction-icon': { marginBottom: '2px' },
                                '&.Mui-selected': { color: theme.palette.primary.main },
                            }}
                        />
                    );
                })}
            </BottomNavigation>
        </MobileNavContainer>
    );
};
