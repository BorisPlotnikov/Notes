// hooks/useAddNote.js

import useApiRequest from './useApiRequest';
import { API_ROUTES } from '../constants';

const useAddNote = (setNotes) => {
    const sendRequest = useApiRequest();

    return async (content) => {
        const newNote = await sendRequest('post', API_ROUTES.NOTES, { content });
        if (!newNote) return false;
        
        setNotes(prev => [...prev, newNote]);
        return true;
    };
};

export default useAddNote;
