// hooks/useAddNote.js

import useApiRequest from './useApiRequest';
import { API_ROUTES } from '../constants';
import useErrorHandler from './useErrorHandler';

const useAddNote = (setLoading, setNotes) => {
    const handleError = useErrorHandler(); 
    const sendRequest = useApiRequest(setLoading);

    const addNote = async (content) => {
            try {
                const newNote = await sendRequest('post', API_ROUTES.NOTES, { content });
                if (newNote) {
                    setNotes(prev => [...prev, newNote]);
                    return true;
                }
                return false;
            } catch (error){
                handleError(error);
                return false;
            }
        };
    return { addNote };
};

export default useAddNote;
