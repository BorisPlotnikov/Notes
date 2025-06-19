// hooks/useApiRequest.js

import axios from 'axios';
import { getApiBaseUrl } from '../utils/apiConfig';
import useAbortController from './useAbortController';

const useApiRequest = (processError, setLoading) => {
    const { createAbortController, getSignal } = useAbortController();

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
            processError(error, `${method.toUpperCase()} ${path} failed`);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { sendRequest };
};

export default useApiRequest;