import React from 'react';

const ErrorNotification = ({ message }) => {
    if (!message) return null; // If there's no message, don't render anything

    return (
        <div className="error-notification">
            {message}
        </div>
    );
};

export default ErrorNotification;