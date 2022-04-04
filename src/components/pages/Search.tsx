import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

// MUI component
import { Box } from '@mui/system';

// custom component
import Main from '../component/home/Main';

// global state
import { GlobalState } from '../../store/store';
import { Product } from '../../store/products';

// lib
import { productsFilter } from '../../lib/productsFilter';

export default function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const allProducts = useSelector((state: GlobalState) => state.products.products);

    const [products, setProducts] = useState<Product[]>([]);
    const [isNoProducts, setIsNoProducts] = useState<boolean>(false);

    const isHaveSearchForParam = !!searchParams.get('for');
    const searchFor: string | null = searchParams.get('for');

    useEffect(() => {
        if (!location.state || !isHaveSearchForParam) {
            navigate('/', { replace: true });
        }
    }, []);

    useEffect(() => {
        const { state } = location;
        if (typeof state === 'string' && !isHaveSearchForParam) {
            navigate(state, { replace: true });
        }
        const timeOut = setTimeout(() => {
            if (!searchFor) {
                setIsNoProducts(true);
                return;
            }

            const filteredProducts: Product[] = productsFilter(allProducts, searchFor);
            if (!!filteredProducts.length) {
                setProducts(filteredProducts);
                return;
            }

            setIsNoProducts(true);
        }, 2 * 1000);

        return () => {
            clearTimeout(timeOut);
            setProducts([]);
            setIsNoProducts(false);
        };
    }, [location]);

    return (
        <Box>
            {!isNoProducts ? (
                <Main products={products} />
            ) : (
                <Box display='flex' justifyContent='center' alignItems='center' height='50vh'>
                    Your search - Can't find Any {searchFor} - did not match any documents.
                </Box>
            )}
        </Box>
    );
}
