import './App.css';
import { lazy, Suspense, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Routes, Route, Navigate, Link } from 'react-router-dom';

import LoadingCircular from './components/layout/progress';
import { productsActions } from './store/products';
import { useDispatch } from 'react-redux';

const NavBar = lazy(() => import('./components/layout/navbar'));
const Footer = lazy(() => import('./components/layout/footer'));
const Home = lazy(() => import('./components/pages/Home'));
const Notification = lazy(() => import('./components/layout/Notification'));
const Menu = lazy(() => import('./components/layout/menu'));
const Cart = lazy(() => import('./components/pages/Cart'));

function App(): JSX.Element {
    const dispatch = useDispatch();
    const { getProducts } = productsActions;

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <Suspense fallback={<LoadingCircular />}>
            {createPortal(<Menu />, document.getElementById('menu-wrapper')! as HTMLDivElement)}
            {createPortal(<Notification />, document.getElementById('notification-wrapper')! as HTMLDivElement)}
            <NavBar />
            <div style={{ minHeight: '80vh' }}>
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
