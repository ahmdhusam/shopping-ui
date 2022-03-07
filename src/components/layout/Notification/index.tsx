import { forwardRef, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';

import { notificationActions, NotificationState } from '../../../store/notification';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function Notification() {
    const { isOpen, type, message }: NotificationState = useSelector((state: any) => state.notification);
    const dispatch = useDispatch();
    const { close } = notificationActions;

    useEffect(() => {
        const clearNotify = setTimeout(() => {
            dispatch(close());
        }, 5 * 1000);

        return () => clearTimeout(clearNotify);
    }, []);

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={isOpen} autoHideDuration={6000} onClose={dispatch.bind(null, close())}>
                <Alert onClose={dispatch.bind(null, close())} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
