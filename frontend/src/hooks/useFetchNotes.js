// hooks/useFetchNotes.js

import { useEffect } from 'react';
import useAbortController from '../hooks/useAbortController';
import axios from 'axios';
import { getApiBaseUrl } from '../utils/apiConfig';

const useFetchNotes = (setNotes, processError, setLoading) => {
    const { createAbortController, getSignal } = useAbortController();

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            createAbortController();
            const apiBaseUrl = (() => {
                try {
                    return getApiBaseUrl();
                } catch (error) {
                    processError(error, 'Loading notes failed');
                    return null;
                }
            })();

            if (!apiBaseUrl) return;

            try {
                const apiBaseUrl = getApiBaseUrl();
                const response = await axios.get(
                    `${apiBaseUrl}/notes`,
                    { signal: getSignal() }
                );
    
                if (Array.isArray(response.data)) {
                    setNotes(response.data.map(note => ({
                        ...note,
                        isEditing: false
                    })));
                } else {
                    processError('Unexpected data format');
                }                
            } catch (error) {
                if (axios.isCancel(error)) return;
                processError(error, 'Downloading failed');
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

};

export default useFetchNotes;
