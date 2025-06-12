// components/ErrorNotification.js

import React from 'react';
import '../css/ErrorNotification.css';
import PropTypes from 'prop-types';

const ErrorNotification = ({ errorMessage }) => {
    return errorMessage ? (
        <div className='error-notification' role="alert" aria-live="assertive">
            {errorMessage}
        </div>
    ) : null;
};

ErrorNotification.propTypes = {
    message: PropTypes.string.isRequired
};

export default ErrorNotification;
