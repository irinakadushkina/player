import { Theme, useTheme } from "@mui/material";
import Link from "next/link"
import styled from "styled-components";

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
        background: ${({ theme }) => theme.palette.primary.light};
        color: ${({ theme }) => theme.palette.primary.dark};
    }
`;

export const NavBar = () => {
    const theme = useTheme();

    return (
        <NavContainer>
            <NavLink href="/dashboard" theme={theme}>Dashboard</NavLink>
            <NavLink href="/podcasts" theme={theme}>Podcasts</NavLink>
        </NavContainer>
    )
}
