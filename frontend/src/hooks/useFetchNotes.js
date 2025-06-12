// hooks/useFetchNotes.js

import { useEffect } from 'react';
import useAbortController from '../hooks/useAbortController';
import axios from 'axios';
import { getApiBaseUrl } from '../utils/apiConfig';
import handleError from '../utils/errorHandler';

const useFetchNotes = (setNotes, setErrorMessage, setLoading) => {
    const { createAbortController, getSignal } = useAbortController();

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            createAbortController();
            const apiBaseUrl = getApiBaseUrl();

            try {
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
                    handleError(setErrorMessage, 'Unexpected data format');
                }                
            } catch (err) {
                if (axios.isCancel(err)) return;
                handleError(setErrorMessage, 'Downloading failed', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

};

export default useFetchNotes;
