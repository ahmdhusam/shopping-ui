import React from 'react';
import { Box } from '@mui/material';
import Card from '../card';

export default function Main() {
    return (
        <Box
            sx={{
                padding: '2rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
                gap: '5rem'
            }}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </Box>
    );
}
