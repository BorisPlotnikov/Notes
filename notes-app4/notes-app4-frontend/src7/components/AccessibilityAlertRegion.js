// AccessibilityAlertRegion.js

// Importing necessary dependencies
import React from 'react'; // React library for building UI components
import '../css/AccessibilityAlertRegion.css'; // Importing custom CSS for styling
import PropTypes from 'prop-types'; // Importing PropTypes for prop validation

// AccessibilityAlertRegion component, which displays a message based on the 'loading' prop
const AccessibilityAlertRegion = ({ loading }) => {
    return (
        // This div is visually hidden but still accessible to screen readers
        // It announces important updates to users with accessibility needs
        <div
            className="sr-only" // This class hides the content visually while keeping it accessible to screen readers
            aria-live="polite" // Ensures the content will be announced politely without interrupting current speech
            aria-relevant="additions text" // Specifies that additions and text changes should be announced
        >
            {/* Conditional rendering: shows 'Loading...' when 'loading' is true, otherwise shows 'Changes saved successfully.' */}
            {loading ? 'Loading...' : 'Changes saved successfully.'}
        </div>
    );
};

// Prop validation using PropTypes
// Ensures that 'loading' prop is passed and is a boolean
AccessibilityAlertRegion.propTypes = {
    loading: PropTypes.bool.isRequired // 'loading' is a required boolean prop
};

// Exporting the component for use in other parts of the application
export default AccessibilityAlertRegion;
