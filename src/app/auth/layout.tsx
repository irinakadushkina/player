'use client'

import styled from "styled-components";
import { useTheme } from '@mui/material/styles';
import { StyledTypography } from "@/app/common-components/styled-typography";
import {Theme} from "@mui/system";

const Root = styled.div<{ theme: Theme }>`
    width: 100%;
    height: 100vh;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    background: ${({theme}) => theme.palette.background.paper};
`;

const Container = styled.div<{ theme: Theme }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    border-radius: 8px;
    padding: 16px 32px 32px;
    background: ${({theme}) => theme.palette.common.black};
`;

type Props = {
    children?: React.ReactNode;
};

// todo: переписать на серверный компонент
const AuthLayout = ({ children }: Props) => {
    const theme = useTheme();

    return (
        <Root theme={theme}>
            <Container theme={theme}>
                <StyledTypography margin={2}>ANTARES</StyledTypography>
                {children}
            </Container>
        </Root>
    )
};

export default AuthLayout;
