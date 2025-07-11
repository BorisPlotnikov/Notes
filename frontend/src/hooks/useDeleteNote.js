// hooks/useDeleteNote.js

import useErrorHandler from './useErrorHandler';
import useApiRequest from './useApiRequest';
import { API_ROUTES } from '../constants';

const useDeleteNote = (setLoading, setNotes) => {
    const handleError = useErrorHandler();
    const { sendRequest } = useApiRequest(setLoading);

    const deleteNote = async (id) => {
        let backup = [];

        setNotes(prevNotes => {
            backup = [...prevNotes];
            return prevNotes.filter(note => note._id !== id);
        });

        try {
            await sendRequest('delete', API_ROUTES.NOTE_BY_ID(id));
            return true;
        } catch (error){
            setNotes(backup);
            handleError(error);
            return false;
        }
    };

    return { deleteNote };
};

export default useDeleteNote;
