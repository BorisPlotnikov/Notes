import React from 'react';
import Spinner from './Spinner';
import '../css/AppLoader.css';

const AppLoader = ({ message = 'Loading...' }) => {
    return (
        <div className="fullscreen-loader">
            <Spinner />
            {message && <p className="loader-message">{message}</p>}
        </div>
    );
};

export default AppLoader;