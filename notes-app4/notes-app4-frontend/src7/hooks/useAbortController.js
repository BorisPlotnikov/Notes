import { useRef, useEffect } from 'react';

const useAbortController = () => {
    const controllerRef = useRef(null);

    const createAbortController = () => {
        // Abort the existing controller if it exists
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        // Create and store a new AbortController
        const controller = new AbortController();
        controllerRef.current = controller;
    };

    const getSignal = () => {
        if (!controllerRef.current) {
            createAbortController(); // Ensure a controller exists
        }
        return controllerRef.current.signal; // Return the current signal
    };

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            if (controllerRef.current) {
                controllerRef.current.abort();
                controllerRef.current = null;
            }
        };
    }, []);

    return { createAbortController, getSignal };
};

export default useAbortController;
