// hooks/useAddNote.js

import useApiRequest from './useApiRequest';
import { API_ROUTES } from '../constants';

const useAddNote = (setLoading, handleError, setNotes) => {
    const { sendRequest } = useApiRequest(handleError, setLoading);

    const addNote = async (content) => {
            try {
                const newNote = await sendRequest('post', API_ROUTES.NOTES, { content });
                setNotes(prev => [...prev, newNote]);
            } catch {
                 // Error already handled in sendRequest
            }
        };
    return { addNote };
};

export default useAddNote;
