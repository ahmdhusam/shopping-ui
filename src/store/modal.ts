import { createSlice } from '@reduxjs/toolkit';

import { Product } from './products';

export interface Modal {
    isOpen: boolean;
    product: Product | null;
}

interface ModalAction {
    payload: Product;
}

const initialState: Modal = {
    isOpen: false,
    product: null
};

const slice = {
    name: 'modal',
    initialState,
    reducers: {
        openModal(state: Modal, action: ModalAction) {
            state.isOpen = true;
            state.product = action.payload;
        },
        closeModal(state: Modal) {
            state.isOpen = false;
            state.product = null;
        }
    }
};

const modalSlice = createSlice(slice);
export default modalSlice.reducer;

export const modalActions = modalSlice.actions;
