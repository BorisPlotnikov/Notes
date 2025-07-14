// hooks/useDeleteNote.js

import useApiRequest from './useApiRequest';
import { API_ROUTES } from '../constants';

const useDeleteNote = (setNotes) => {
    const sendRequest = useApiRequest();

    const deleteNote = async (id) => {
        let backup = [];

        setNotes(prevNotes => {
            backup = [...prevNotes];
            return prevNotes.filter(note => note._id !== id);
        });

        const result = await sendRequest('delete', API_ROUTES.NOTE_BY_ID(id));
        if (!result) {
            setNotes(backup);
            return false;
        }

        return true;
    };

    return { deleteNote };
};

export default useDeleteNote;
