import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/navbar';
import { Fragment } from 'react';

function App(): JSX.Element {
    return (
        <Fragment>
            <NavBar />
            <Routes>
                <Route
                    path='/'
                    element={((): JSX.Element => (
                        <div>home</div>
                    ))()}
                />
            </Routes>
        </Fragment>
    );
}

export default App;
