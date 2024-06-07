import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import store from './store/store'; 

function App() {
    return (
        <>
        <Provider store={store}>
            <Navbar />
            <Outlet />
            <Footer />
        </Provider>
        </>
    );
}

export default App;