import './App.css';
import { Fragment } from 'react';
import { createPortal } from 'react-dom';

import { Routes, Route } from 'react-router-dom';

import NavBar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Home from './components/pages/Home';
import Notification from './components/layout/Notification';

function App(): JSX.Element {
    return (
        <Fragment>
            {createPortal(<Notification />, document.getElementById('wrapper')! as HTMLDivElement)}
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
            <Footer />
        </Fragment>
    );
}

export default App;
