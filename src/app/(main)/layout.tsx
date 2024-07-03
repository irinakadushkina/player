'use client'

import styled from "styled-components";
import { NavBar } from "./components/navbar";
import { Theme, useTheme } from "@mui/material";
import { Header } from "./components/header";

const Root = styled.div`
    display: flex;
    flex-direction: column;

    height: 100vh;
    width: 100vw;
`;

const ChildContainer = styled.main<{ theme: Theme}>`
    padding: 16px 8px;
    margin: 12px 12px 12px 0;
    display: flex;

    width: 80%;
    min-width: calc(100vw - 250px);

    border-radius: 12px;
    background: ${({theme}) => theme.palette.background.paper};
`;

const Container = styled.div`
    display: flex;
    height: calc(100vh - 50px);
`;

type Props = {
    children?: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
    const theme = useTheme();

    return (
        <Root>
            <Header />
            <Container>
                <NavBar />
                <ChildContainer theme={theme}>
                    {children}
                </ChildContainer>
            </Container>
        </Root>
    )
};

export default MainLayout