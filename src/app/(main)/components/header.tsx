import { Theme, useTheme } from "@mui/material";
import styled from "styled-components";

const StyledHeader = styled.header<{ theme: Theme }>`
    display: flex;
    align-items: center;

    height: 50px;
    width: 100%;

    padding: 4px 24px;

    background: ${({theme}) => theme.palette.mode === 'dark' ? theme.palette.common.black :  theme.palette.common.white };
`;


export const Header = () => {
    const theme = useTheme();

    console.log('theme', theme)

    return (
        <StyledHeader theme={theme}>
            Test
        </StyledHeader>
    )
}
