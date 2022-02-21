import React from 'react';

import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import GitHub from '@mui/icons-material/github';
import LinkedIn from '@mui/icons-material/linkedin';

const Div = styled('div')(() => ({
    width: '100%',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
}));

export default function Footer() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <Div>
                        <Box>
                            By{' '}
                            <Link href='https://github.com/ahmdhusam' color='inherit' underline='none'>
                                Ahmed Hussam
                            </Link>
                        </Box>
                        <Box>
                            <IconButton size='large' color='inherit'>
                                <Link href='https://github.com/ahmdhusam' color='inherit' underline='none'>
                                    <GitHub />
                                </Link>
                            </IconButton>
                            <IconButton size='large' color='inherit'>
                                <Link href='https://www.linkedin.com/in/ahmdhusam' color='inherit' underline='none'>
                                    <LinkedIn />
                                </Link>
                            </IconButton>
                        </Box>
                    </Div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
