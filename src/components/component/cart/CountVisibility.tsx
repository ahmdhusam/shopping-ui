import * as React from 'react';

// MUI Components
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from '@mui/material/Typography';

interface CountVisibilityProps {
    count: number;
    onIncrease(e: React.MouseEvent): void;
    onDecrease(e: React.MouseEvent): void;
}

export default function CountVisibility({ count, onIncrease, onDecrease }: CountVisibilityProps) {
    return (
        <Box
            sx={{
                color: 'action.active',
                display: 'flex',
                flexDirection: 'column',
                '& > *': {
                    marginBottom: 2
                },
                '& .MuiBadge-root': {
                    marginRight: 4
                }
            }}>
            <div>
                <ButtonGroup>
                    <Button aria-label='decrease' onClick={onDecrease}>
                        <RemoveIcon fontSize='small' />
                    </Button>
                    <Typography variant='h6' component='span' py={0.2} px={1} border={'solid 1px grey'}>
                        {count < 10 ? `0${count}` : count}
                    </Typography>
                    <Button aria-label='increase' onClick={onIncrease}>
                        <AddIcon fontSize='small' />
                    </Button>
                </ButtonGroup>
            </div>
        </Box>
    );
}
