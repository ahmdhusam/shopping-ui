import { createSlice } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material';

export interface Notification {
    isOpen: boolean;
    type: AlertColor;
    message: string;
}

export interface ActionPayload {
    type: AlertColor;
    message: string;
}

const initialState: Notification = {
    isOpen: false,
    type: 'success',
    message: ''
};

const slice = {
    name: 'notification',
    initialState,
    reducers: {
        open(state: Notification, action: { payload: ActionPayload }) {
            const { type, message } = action.payload;
            state.isOpen = true;
            state.type = type;
            state.message = message;
        },
        close(state: Notification) {
            state.isOpen = false;
        }
    }
};
const notificationSlice = createSlice(slice);
export default notificationSlice.reducer;

export const notificationActions = notificationSlice.actions;
