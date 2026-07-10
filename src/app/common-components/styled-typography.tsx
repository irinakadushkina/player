import { Typography, TypographyProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Theme } from "@mui/system";
import React from "react";
import styled from "styled-components";

const MyTypography = styled(Typography)<{ theme: Theme, color: string }>`
    color: ${({ theme, color }) => theme.palette?.[color].main};
`;

type Props = TypographyProps & { color?: string };

export const StyledTypography: React.FC<Props> = ( { color = 'primary' , ...props }) => {
    const theme = useTheme();
    return <MyTypography theme={theme} color={color} {...props}>{props.children}</MyTypography>;
}
