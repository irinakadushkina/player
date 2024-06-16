'use client'

import styled from "styled-components";
import { NavBar } from "../navbar";

const Root = styled.div`
    display: flex;

    height: 100vh;
    width: 100vw;
`;

const ChildContainer = styled.main`
    padding: 36px 36px 36px 48px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

type Props = {
    children: React.ReactNode;
};

export const MainLayout = ({ children }: Props) => {
    return (
        <Root>
            <NavBar />
            
            <ChildContainer>
                {children}
            </ChildContainer>
        </Root>
    )
};
