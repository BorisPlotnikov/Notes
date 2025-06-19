// hooks/useApiRequest.js

import { useRef, useEffect } from 'react';
import axios from 'axios';
import { getApiBaseUrl } from '../utils/apiConfig';

const useApiRequest = (processError, setLoading) => {
    const controllerRef = useRef(null);

    const createAbortController = () => {
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        controllerRef.current = new AbortController();
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

    const sendRequest = async (method, path, data = null) => {
        setLoading(true);
        createAbortController();

        try {
            const baseUrl = getApiBaseUrl();
            const response = await axios({
                method,
                url: `${baseUrl}${path}`,
                data,
                signal: getSignal(),
            });
            return response.data;
        } catch (error) {
            // Avoid logging canceled requests as errors
            const isCanceled = axios.isCancel?.(error) || error?.name === 'CanceledError';
            if (!isCanceled) {
                processError(error, `${method.toUpperCase()} ${path} failed`);
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { sendRequest };
};

export default useApiRequest;
