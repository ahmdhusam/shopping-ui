import { createSlice } from '@reduxjs/toolkit';
import { Product } from './products';

interface CartProduct extends Product {
    countOfProducts: number;
}

interface Cart {
    isOpen: boolean;
    cartProducts: CartProduct[];
    totalPrice: number;
}

const initialState: Cart = {
    isOpen: false,
    cartProducts: [],
    totalPrice: 0
};

const slice = {
    name: 'cart',
    initialState,
    reducers: {
        openCart(state: Cart) {
            state.isOpen = true;
        },
        closeCart(state: Cart) {
            state.isOpen = false;
        },
        addToCart() {},
        removeFromCart() {}
    }
};
const cartSlice = createSlice(slice);
export default cartSlice;

export const cartActions = cartSlice.actions;
