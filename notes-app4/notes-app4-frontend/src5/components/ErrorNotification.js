import React from 'react';
import '../css/ErrorNotification.css';
import PropTypes from 'prop-types';

const ErrorNotification = ({ message }) => {
    return message ? (
        <div className='error-notification'>
            {message}
        </div>
    ) : null;
};

ErrorNotification.propTypes = {
    message: PropTypes.string
}

export default ErrorNotification;