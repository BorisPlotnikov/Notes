// hooks/useFetchNotes.js

import { useEffect } from 'react';
import useApiRequest from './useApiRequest';
import { ERROR_MESSAGES, API_ROUTES } from '../constants';

const useFetchNotes = (setNotes) => {
    const sendRequest = useApiRequest();

    useEffect(() => {
        const fetchNotes = async () => {
            const data = await sendRequest('get', API_ROUTES.NOTES);
            if (Array.isArray(data)) {
                setNotes(data.map(note => ({
                    ...note,
                    isEditing: false
                })));
            } else {
                throw new Error(ERROR_MESSAGES.DATA.UNEXPECTED_FORMAT);
            }
        };

        fetchNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useFetchNotes;
