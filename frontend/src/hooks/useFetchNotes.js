// hooks/useFetchNotes.js

import { useEffect } from 'react';

import { DATA_ERROR_MESSAGES } from '../constants';

import useApiRequest from './useApiRequest';

const useFetchNotes = (setLoading, handleError, setNotes) => {
    const { sendRequest } = useApiRequest(handleError, setLoading);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await sendRequest('get', '/notes');
                if (Array.isArray(data)) {
                    setNotes(data.map(note => ({
                        ...note,
                        isEditing: false
                    })));
                } else {
                    handleError(DATA_ERROR_MESSAGES.UNEXPECTED_FORMAT);
                }
            } catch {
                // Error already handled by sendRequest
            }
        };

        fetchNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useFetchNotes;
