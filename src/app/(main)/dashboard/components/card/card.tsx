'use client'
import { Box, useTheme } from "@mui/material";
import Image from 'next/image'
import test from '../../../../../../public/assets/mock-cover-recomends.png';
import React from "react";

export type CardProps = {
    height?: string;
    width?: string;
}

const Card: React.FC<CardProps> = ({ height, width }) => {
    const theme = useTheme();

    return (
        <Box sx={{ border: `1px solid ${theme.palette.primary.dark}`, borderRadius: '15px', height: height || '150px', width: width || '300px', flex: 'none', overflow: 'hidden' }}>
            <Image src={test} height={parseFloat(height || "") || 150} alt='test' />
        </Box>
    );
};

export default Card;
