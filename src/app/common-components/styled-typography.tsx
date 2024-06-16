import styled from "styled-components";
import { Typography, TypographyProps } from "@mui/material";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import React from "react";

const MyTypography = styled(Typography)<{ theme: Theme, color: string }>`
    color: ${({ theme, color }) => theme.palette?.[color].main};
`;

type Props = TypographyProps & { color?: string };

export const StyledTypography: React.FC<Props> = ( { color = 'primary' , ...props }) => {
    const theme = useTheme();
    return <MyTypography theme={theme} color={color} {...props}>{props.children}</MyTypography>;
}
