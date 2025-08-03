// /src/components/AppLoader.js

import React from 'react';
import Spinner from './Spinner';
import { STATUS_MESSAGES } from '../constants'
import '../css';

const AppLoader = ({ message = STATUS_MESSAGES.LOADING }) => {
    return (
        <div className="fullscreen-loader">
            <Spinner />
            {message && <p className="loader-message">{message}</p>}
        </div>
    );
};

export default AppLoader;