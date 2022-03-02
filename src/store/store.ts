import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart';

import notificationSlice from './notification';
import productsSlice from './products';

const reducer = { products: productsSlice.reducer, notification: notificationSlice.reducer, cart: cartSlice.reducer };

const store = configureStore({
    reducer
});

export default store;
