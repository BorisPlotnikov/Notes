// ErrorNotification.js

import React from 'react'; // Import React
import '../css/ErrorNotification.css'; // Import the CSS for error notification styling
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

// Functional component to display error messages
const ErrorNotification = ({ errorMessage }) => {
    return errorMessage ? ( // If there's an error message, render the notification
        <div className='error-notification' role="alert" aria-live="assertive">
            {/* Display the error message */}
            {errorMessage}
        </div>
    ) : null; // If no error message, return null (nothing is rendered)
};

// PropTypes validation to ensure 'errorMessage' is a string and is required
ErrorNotification.propTypes = {
    message: PropTypes.string.isRequired // 'errorMessage' should be a string and is required
}

export default ErrorNotification; // Export the ErrorNotification component
