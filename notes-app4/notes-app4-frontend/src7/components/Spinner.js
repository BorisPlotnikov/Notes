// Spinner.js

import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import './Spinner.css'; // Import the CSS file for spinner styles

const Spinner = () => {
    // State to manage whether the spinner should be shown or not
    const [showSpinner, setShowSpinner] = useState(false);

    // useEffect hook to trigger the spinner display after a small delay
    useEffect(() => {
        // Set a timer to show the spinner after 300ms
        const timer = setTimeout(() => {
            setShowSpinner(true); // Show the spinner after the delay
        }, 300);

        // Cleanup function to clear the timer if the component is unmounted before the timer ends
        return () => clearTimeout(timer);
    }, []); // Empty dependency array ensures this runs only once after the initial render

    // Conditionally render the spinner after the delay (or null if not yet time)
    return showSpinner ? <div className="spinner"></div> : null;
};

export default Spinner;
