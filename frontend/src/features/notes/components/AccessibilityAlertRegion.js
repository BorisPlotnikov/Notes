// components/AccessibilityAlertRegion.js

import React from 'react';
import PropTypes from 'prop-types';
import { STATUS_MESSAGES } from '../../../constants';
import '../../../css';

const AccessibilityAlertRegion = ({ loading }) => {
    return (
        <div
            className="sr-only"
            aria-live="polite"
            aria-relevant="additions text"
        >
            {loading && STATUS_MESSAGES.LOADING}
        </div>
    );
};

AccessibilityAlertRegion.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default AccessibilityAlertRegion;

