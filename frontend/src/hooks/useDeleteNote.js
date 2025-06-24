// hooks/useDeleteNote.js

import useApiRequest from './useApiRequest';
import { API_ROUTES } from '../constants';

const useDeleteNote = (setLoading, handleError, setNotes) => {
    const { sendRequest } = useApiRequest(handleError, setLoading);

    const deleteNote = async (id) => {
        let backup = [];

        setNotes(prevNotes => {
            backup = prevNotes;
            return prevNotes.filter(note => note._id !== id);
        });

        try {
            await sendRequest('delete', API_ROUTES.NOTE_BY_ID(id));
        } catch {
            setNotes(backup); // rollback UI on failure
        }
    };

    return { deleteNote };
};

export default useDeleteNote;
