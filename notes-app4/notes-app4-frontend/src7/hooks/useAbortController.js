// useAbortController.js

// Import necessary hooks from React
import { useRef, useEffect } from 'react';

// Custom hook to manage and return an AbortController for request cancellation
const useAbortController = () => {
    // Ref to store the current AbortController instance
    const controllerRef = useRef(null);

    // Function to create a new AbortController and store it in the ref
    const createAbortController = () => {
        // Abort the existing controller if it exists, to cancel any ongoing request
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        // Create a new AbortController and store it in the ref
        const controller = new AbortController();
        controllerRef.current = controller;
    };

    // Function to get the current AbortController's signal
    const getSignal = () => {
        // If no controller exists, create one first
        if (!controllerRef.current) {
            createAbortController(); // Ensure there is an active controller
        }
        // Return the signal associated with the current AbortController
        return controllerRef.current.signal;
    };

    // useEffect to clean up on component unmount
    useEffect(() => {
        // Cleanup function to abort any ongoing requests when the component is unmounted
        return () => {
            if (controllerRef.current) {
                controllerRef.current.abort(); // Abort any request in progress
                controllerRef.current = null; // Reset the controller
            }
        };
    }, []); // Empty dependency array ensures cleanup only happens on unmount

    // Return functions to create a controller and get the current signal
    return { createAbortController, getSignal };
};

// Export the custom hook for use in other components
export default useAbortController;
