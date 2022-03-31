import { configureStore } from '@reduxjs/toolkit';

import productsSlice, { Products } from './products';
import cartSlice, { Cart } from './cart';
import notificationSlice, { Notification } from './notification';
import menuSlice, { Menu } from './menu';
import modal, { Modal } from './modal';

export interface GlobalState {
    products: Products;
    notification: Notification;
    cart: Cart;
    menu: Menu;
    modal: Modal;
}

const reducer = {
    products: productsSlice,
    cart: cartSlice,
    notification: notificationSlice,
    menu: menuSlice,
    modal: modal
};

const store = configureStore({
    reducer
});

export default store;
