import { createSlice } from '@reduxjs/toolkit';

import { parsePrice } from '../lib/parsePrice';

import { ActionPayload, notificationActions } from './notification';
import { Product } from './products';

export interface Cart {
    cartProducts: CartProduct[];
    totalPrice: string;
}

export interface CartProduct extends Product {
    rate?: number;
    countOfProducts?: number;
}

interface CartAction {
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
        addToCartSlice(state: Cart, action: CartAction) {
            const newProduct: CartProduct = {
                ...action.payload,
                rate: Math.round(action.payload.rating.rate * 20),
                countOfProducts: 1
            };

            state.cartProducts.push(newProduct);
            state.totalPrice = handleTotal(state.cartProducts);
        },
        increaseSlice(state: Cart, action: CartAction) {
            const productId = action.payload.id;
            const index = state.cartProducts.findIndex((item: CartProduct) => item.id === productId);
            if (state.cartProducts[index].countOfProducts! > 9) {
                throw new Error("Sorry, You've Reached Maximum");
            }

            state.cartProducts[index].countOfProducts! += 1;
            state.totalPrice = handleTotal(state.cartProducts);
        },
        decrease(state: Cart, action: CartAction) {
            const productId = action.payload.id;

            if (action.payload.countOfProducts! === 1) {
                state.cartProducts = state.cartProducts.filter((item: CartProduct) => item.id !== productId);
                state.totalPrice = handleTotal(state.cartProducts);
                return;
            }

            const index = state.cartProducts.findIndex((item: CartProduct) => item.id === productId);
            state.cartProducts[index].countOfProducts! -= 1;
            state.totalPrice = handleTotal(state.cartProducts);
        },
        deleteSelected(state: Cart, action: { payload: number[] }) {
            const arrOfIds: number[] = action.payload;

            if (!arrOfIds.length) {
                return;
            }

            state.cartProducts = state.cartProducts.filter((item: CartProduct) => !arrOfIds.includes(item.id));
            state.totalPrice = handleTotal(state.cartProducts);
        }
    }
};
const cartSlice = createSlice(slice);
export default cartSlice.reducer;

function addToCart(product: Product) {
    return (dispatch: any, globalState: any) => {
        const productId: number = product.id;
        const cartProducts: CartProduct[] = globalState().cart.cartProducts;
        const isNotFound: boolean = !cartProducts.some((item: CartProduct) => item.id === productId);

        if (isNotFound) {
            dispatch(cartActions.addToCartSlice(product));
            const payload: ActionPayload = {
                type: 'success',
                message: `" ${product.title.substr(0, 10)}... " Has Been Added To Your Cart`
            };

            dispatch(notificationActions.open(payload));
            return;
        }

        dispatch(cartActions.increase(product));
    };
}

function increase(product: CartProduct) {
    return (dispatch: any) => {
        try {
            dispatch(cartActions.increaseSlice(product));
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
}

export const cartActions = { ...cartSlice.actions, addToCart, increase };
