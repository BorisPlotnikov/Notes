import React from 'react';
import '../css/ErrorNotification.css';
import PropTypes from 'prop-types';

const ErrorNotification = ({ message }) => {
    if (!message) return null;

    return (
        <div className="error-notification">
            {message}
        </div>
    );
};

ErrorNotification.propTypes = {
    message: PropTypes.string
}

export default ErrorNotification;