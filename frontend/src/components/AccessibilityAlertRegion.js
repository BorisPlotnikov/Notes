// components/AccessibilityAlertRegion.js

import React from 'react';
import '../css/AccessibilityAlertRegion.css';
import PropTypes from 'prop-types';

const AccessibilityAlertRegion = ({ loading }) => {
    return (
        <div
            className="sr-only"
            aria-live="polite"
            aria-relevant="additions text"
        >
            {loading ? 'Loading...' : 'Changes saved successfully.'}
        </div>
    );
};

AccessibilityAlertRegion.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default AccessibilityAlertRegion;

