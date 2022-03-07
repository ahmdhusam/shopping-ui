import { lazy, Suspense } from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { Product } from '../../../store/products';
import LoadingSkeleton from '../../layout/card/Skeleton';
import LoadingCircular from '../../layout/progress';

const Card = lazy(() => import('../../layout/card'));

function dummyArr() {
    return Array.from(new Array(6));
}

export default function Main() {
    const products: Product[] = useSelector((state: any) => state.products.products);

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
                    ? products.map((product: Product) => <Card key={product.id} {...product} />)
                    : dummyArr().map((_, index) => <LoadingSkeleton key={index} />)}
            </Box>
        </Suspense>
    );
}
