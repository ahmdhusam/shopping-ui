import './App.css';
import { Fragment } from 'react';

import { Routes, Route } from 'react-router-dom';

import NavBar from './components/layout/navbar';
import Footer from './components/layout/footer';
import Home from './components/pages/Home';

function App(): JSX.Element {
    return (
        <Fragment>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
            <Footer />
        </Fragment>
    );
}

export default App;
