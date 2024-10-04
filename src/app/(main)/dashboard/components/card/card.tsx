'use client'
import { Box, useTheme } from "@mui/material";
import Image from 'next/image'
import test from '../../../../../../public/assets/mock-cover-recomends.png';

const Card = () => {
    const theme = useTheme();

    return (
        <Box sx={{ border: `1px solid ${theme.palette.primary.dark}`, borderRadius: '15px', height: '150px', width: '300px', flex: 'none', overflow: 'hidden' }}>
            <Image src={test} height={150} alt='test' />
        </Box>
    );
};

export default Card;
