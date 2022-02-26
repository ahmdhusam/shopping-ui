import { createSlice } from '@reduxjs/toolkit';
import STORE_API from '../lib/axios';

interface Rating {
    count: number;
    rate: number;
}
export interface Product {
    id: number;
    title: string;
    price: string;
    rating: Rating;
    category: string;
    description: string;
    image: string;
}

interface InitProducts {
    products: Product[];
}

const initialState: InitProducts = {
    products: []
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, actions) {
            state.products = actions.payload;
        }
    }
});

const productsActions = productsSlice.actions;

export const getProducts = () => {
    return async (dispatch: any) => {
        try {
            const res = await STORE_API.get('/products');
            const products = res.data;
            dispatch(productsActions.setProducts(products));
        } catch (err: any) {
            if ('message' in err) console.log(err.message);
        }
    };
};
