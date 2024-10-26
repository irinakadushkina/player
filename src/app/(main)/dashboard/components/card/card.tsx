'use client'
import { Box, useTheme } from "@mui/material";
import Image from 'next/image'
import test from '../../../../../../public/assets/mock-cover-recomends.png';

const Card = () => {
    const theme = useTheme();

    return (
        <Box sx={{ border: `1px solid ${theme.palette.primary.dark}`, borderRadius: '15px', flex: 'none', overflow: 'hidden' }}>
            <Image src={test} height={300} alt='test' style={{ pointerEvents: 'none' }}/>
        </Box>
    );
};

export default Card;
