'use client'
import { Box, useTheme } from "@mui/material";

const Card = () => {
    const theme = useTheme();

    return (
        <Box sx={{ border: `1px solid ${theme.palette.primary.dark}`, borderRadius: '15px', padding: '8px', height: '150px', width: '300px', flex: 'none' }}>
            test
        </Box>
    );
};

export default Card;
