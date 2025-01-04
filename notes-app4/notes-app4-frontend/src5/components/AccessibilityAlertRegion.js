import React from 'react';
import '../css/AccessibilityAlertRegion.css';

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

export default AccessibilityAlertRegion;