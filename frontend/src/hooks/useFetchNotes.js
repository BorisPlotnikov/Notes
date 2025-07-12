// hooks/useFetchNotes.js

import { useEffect } from 'react';
import useErrorHandler from './useErrorHandler';
import useApiRequest from './useApiRequest';
import { ERROR_MESSAGES, API_ROUTES } from '../constants';

const useFetchNotes = (setNotes) => {
    const handleError = useErrorHandler();
    const sendRequest = useApiRequest();

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
            } catch (error) {        
                handleError(error);
            }
        };

        fetchNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useFetchNotes;
