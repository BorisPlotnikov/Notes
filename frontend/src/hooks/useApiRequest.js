// hooks/useApiRequest.js

import { useRef, useEffect } from 'react';
import axios from 'axios';
import useErrorHandler from './useErrorHandler';
import { useNotes } from '../context/NotesContext';

import { getApiBaseUrl } from '../utils/apiConfig';

const useApiRequest = () => {
    const { setLoading } = useNotes();
    const handleError = useErrorHandler();
    const controllerRef = useRef(null);

    const createAbortController = () => {
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        controllerRef.current = new AbortController();
    };

    const getSignal = () => {
        createAbortController();
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
        try {
            const baseUrl = getApiBaseUrl();
            const response = await axios({
                method,
                url: `${baseUrl}${path}`,
                data,
                signal: getSignal(),
            });
            return response?.data ?? null;
        } catch (error) {
                handleError(error);
                return null;
        } finally {
            setLoading(false);
        }
    };

    return sendRequest;
};

export default useApiRequest;
