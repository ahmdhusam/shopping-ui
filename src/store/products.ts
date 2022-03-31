import { createSlice } from '@reduxjs/toolkit';
import STORE_API from '../lib/axios';

import { notificationActions, ActionPayload } from './notification';

export interface Products {
    products: Product[];
}

export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: Rating;
}

interface Rating {
    count: number;
    rate: number;
}

const initialState: Products = {
    products: []
};

const slice = {
    name: 'products',
    initialState,
    reducers: {
        setProducts(state: Products, actions: { payload: Product[] }) {
            state.products = actions.payload;
        }
    }
};

const productsSlice = createSlice(slice);
export default productsSlice.reducer;

const getProducts = () => {
    return async (dispatch: any) => {
        try {
            const res = await STORE_API.get('/products');
            const products = res.data;
            dispatch(productsActions.setProducts(products));
        } catch (err: any) {
            if ('message' in err) {
                const payload: ActionPayload = {
                    type: 'error',
                    message: err.message
                };

                dispatch(notificationActions.open(payload));
            }
        }
    };
};

export const productsActions = { ...productsSlice.actions, getProducts };
