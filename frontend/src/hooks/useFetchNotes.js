// hooks/useFetchNotes.js

import { useEffect } from 'react';

import { ERROR_MESSAGES, API_ROUTES } from '../constants';

import useApiRequest from './useApiRequest';

const useFetchNotes = (setLoading, handleError, setNotes) => {
    const { sendRequest } = useApiRequest(handleError, setLoading);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await sendRequest('get', API_ROUTES.NOTES);
                if (Array.isArray(data)) {
                    setNotes(data.map(note => ({
                        ...note,
                        isEditing: false
                    })));
                } else {
                    handleError(ERROR_MESSAGES.DATA.UNEXPECTED_FORMAT);
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
