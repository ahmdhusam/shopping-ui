import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import StoreProvider from './store';

const theme = createTheme({
    palette: {
        primary: {
            main: '#131921'
        },
        secondary: {
            main: '#232f3e'
        }
    }
});

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <StoreProvider>
                    <App />
                </StoreProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
