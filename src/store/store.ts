import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart';
import menuSlice from './menu';
import modal from './modal';

import notificationSlice from './notification';
import productsSlice from './products';

const reducer = {
    products: productsSlice.reducer,
    notification: notificationSlice.reducer,
    cart: cartSlice.reducer,
    menu: menuSlice.reducer,
    modal: modal.reducer
};

const store = configureStore({
    reducer
});

export default store;
