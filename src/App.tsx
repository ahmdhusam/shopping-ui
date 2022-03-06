import './App.css';
import { Fragment } from 'react';
import { createPortal } from 'react-dom';

import { Routes, Route, Navigate, Link } from 'react-router-dom';

import NavBar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Home from './components/pages/Home';
import Notification from './components/layout/Notification';
import Menu from './components/layout/menu';
import Cart from './components/pages/Cart';

function App(): JSX.Element {
    return (
        <Fragment>
            {createPortal(<Menu />, document.getElementById('menu-wrapper')! as HTMLDivElement)}
            {createPortal(<Notification />, document.getElementById('wrapper')! as HTMLDivElement)}
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
        </Fragment>
    );
}

export default App;
