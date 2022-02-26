import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function LoadingSkeleton() {
    return (
        <Grid container wrap='nowrap'>
            <Box sx={{ width: 210, marginRight: 0.5, my: 5 }}>
                <Skeleton variant='rectangular' width={265} height={200} />
                <Box sx={{ pt: 0.5 }}>
                    <Skeleton />
                    <Skeleton width='60%' />
                </Box>
            </Box>
        </Grid>
    );
}
