import { lazy, Suspense } from 'react';

// MUI components
import { Box } from '@mui/material';

// custom components
import LoadingSkeleton from '../../layout/card/Skeleton';
import LoadingCircular from '../../layout/progress';

const Card = lazy(() => import('../../layout/card'));

// global state
import { Product } from '../../../store/products';

interface MainProps {
    products: Product[];
}

function dummyArr() {
    return Array.from(new Array(6));
}

export default function Main({ products }: MainProps) {
    return (
        <Suspense fallback={<LoadingCircular />}>
            <Box
                sx={{
                    padding: '2rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
                    gap: '5rem'
                }}>
                {!!products.length
                    ? products.map((product: Product) => <Card key={product.id} product={product} />)
                    : dummyArr().map((_, index) => <LoadingSkeleton key={index} />)}
            </Box>
        </Suspense>
    );
}
