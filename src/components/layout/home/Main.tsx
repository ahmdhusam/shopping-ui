import { useEffect } from 'react';
import { Box } from '@mui/material';
import Card from '../card';
import { useDispatch, useSelector } from 'react-redux';
import { productsActions, Product } from '../../../store/products';
import LoadingSkeleton from '../card/Skeleton';
import SwipeableTemporaryDrawer from '../cart';

function dummyArr() {
    return Array.from(new Array(6));
}

export default function Main() {
    const products: Product[] = useSelector((state: any) => state.products.products);
    const dispatch = useDispatch();
    const { getProducts } = productsActions;

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
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
    );
}
