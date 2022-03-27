import './App.css';
import { lazy, Suspense, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Routes, Route, Navigate, Link } from 'react-router-dom';

import LoadingCircular from './components/layout/progress';
import { productsActions } from './store/products';
import { useDispatch } from 'react-redux';
import Menu from './components/layout/menu';
import NavBar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Notification from './components/layout/Notification';
import BasicModal from './components/layout/modal';

const Home = lazy(() => import('./components/pages/Home'));
const Cart = lazy(() => import('./components/pages/Cart'));

function App(): JSX.Element {
    const dispatch = useDispatch();
    const { getProducts } = productsActions;

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <Suspense fallback={<LoadingCircular />}>
            {createPortal(<BasicModal />, document.getElementById('modal-wrapper')! as HTMLDivElement)}
            {createPortal(<Menu />, document.getElementById('menu-wrapper')! as HTMLDivElement)}
            {createPortal(<Notification />, document.getElementById('notification-wrapper')! as HTMLDivElement)}
            <NavBar />
            <div style={{ minHeight: '85vh' }}>
                <Routes>
                    <Route path='/' element={<Navigate to='/home' replace={true} />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route
                        path='*'
                        element={
                            (() => (
                                <div>
                                    Not Found <Link to='/'>Go Back?</Link>
                                </div>
                            ))() as JSX.Element
                        }
                    />
                </Routes>
            </div>
            <Footer />
        </Suspense>
    );
}

export default App;
