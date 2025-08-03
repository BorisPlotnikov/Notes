// hooks/useApiRequest.js

import axios from 'axios';
import { useErrorHandler } from '../../../hooks';

import { getApiBaseUrl } from '../../../utils/apiConfig';

const useApiRequest = (setLoading) => {
    const handleError = useErrorHandler();

    const sendRequest = async (method, path, data = null) => {
        setLoading(true);
        const controller = new AbortController();
        try {
            const baseUrl = getApiBaseUrl();
            const fullUrl = `${baseUrl}${path}`;

            const response = await axios({
                method,
                url: fullUrl,
                data,
                signal: controller.signal,
            });

            return response?.data ?? null;
        } catch (error) {
            if (!axios.isCancel(error)) handleError(error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return sendRequest;
};

export default useApiRequest;
