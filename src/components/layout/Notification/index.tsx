import { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// MUI components
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// global state
import { GlobalState } from '../../../store/store';
import { notificationActions } from '../../../store/notification';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function Notification() {
    const { isOpen, type, message } = useSelector((state: GlobalState) => state.notification);
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
