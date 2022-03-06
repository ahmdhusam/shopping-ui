import { createSlice } from '@reduxjs/toolkit';

interface Menu {
    isOpen: boolean;
}

const initialState: Menu = {
    isOpen: false
};

const slice = {
    name: 'menu',
    initialState,
    reducers: {
        openMenu(state: Menu) {
            state.isOpen = true;
        },
        closeMenu(state: Menu) {
            state.isOpen = false;
        }
    }
};
const menuSlice = createSlice(slice);
export default menuSlice;

export const menuActions = menuSlice.actions;
