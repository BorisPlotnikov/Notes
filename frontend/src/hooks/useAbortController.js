// hooks/useAbortController.js

import { useRef, useEffect } from 'react';

const useAbortController = () => {
    const controllerRef = useRef(null);

    const createAbortController = () => {
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        const controller = new AbortController();
        controllerRef.current = controller;
    };

    const getSignal = () => {
        if (!controllerRef.current) {
            createAbortController();
        }
        return controllerRef.current.signal;
    };

    useEffect(() => {
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
