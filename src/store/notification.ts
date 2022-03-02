import { createSlice } from '@reduxjs/toolkit';
import { AlertColor } from '@mui/material';

export interface NotificationState {
    isOpen: boolean;
    type: string;
    message: string;
}

export interface ActionPayload {
    type: AlertColor;
    message: string;
}

const initialState: NotificationState = {
    isOpen: false,
    type: 'success',
    message: ''
};

const slice = {
    name: 'notification',
    initialState,
    reducers: {
        open(state: NotificationState, action: { payload: ActionPayload }) {
            const { type, message } = action.payload;
            state.isOpen = true;
            state.type = type;
            state.message = message;
        },
        close(state: NotificationState) {
            state.isOpen = false;
        }
    }
};
const notificationSlice = createSlice(slice);
export default notificationSlice;

export const notificationActions = notificationSlice.actions;
