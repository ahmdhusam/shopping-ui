import { createSlice } from '@reduxjs/toolkit';
import { parsePrice } from '../lib/parsePrice';
import { Product } from './products';

export interface CartProduct extends Product {
    rate?: number;
    countOfProducts?: number;
}

interface Cart {
    cartProducts: CartProduct[];
    totalPrice: string;
}

interface addToCartAction {
    payload: CartProduct;
}

const initialState: Cart = {
    cartProducts: [],
    totalPrice: '$0'
};

function handleTotal(arr: CartProduct[]): string {
    const newArr: CartProduct[] = JSON.parse(JSON.stringify(arr));
    const total: number = newArr.reduce(
        (total: number, item: CartProduct) => item.countOfProducts! * item.price + total,
        0
    );
    return parsePrice(total);
}

const slice = {
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state: Cart, action: addToCartAction) {
            const productId: number = action.payload.id;
            const isFound: boolean = state.cartProducts.some((item: CartProduct) => item.id === productId);
            if (!isFound) {
                const newProduct: CartProduct = {
                    ...action.payload,
                    rate: Math.round(action.payload.rating.rate * 20),
                    countOfProducts: 1
                };
                state.cartProducts.push(newProduct);
                state.totalPrice = handleTotal(state.cartProducts);
                return;
            }
            state.cartProducts = state.cartProducts.map((item: CartProduct) =>
                item.id === productId ? { ...item, countOfProducts: item.countOfProducts! + 1 } : item
            );
            state.totalPrice = handleTotal(state.cartProducts);
        },
        removeFromCart() {}
    }
};
const cartSlice = createSlice(slice);
export default cartSlice;

export const cartActions = cartSlice.actions;
