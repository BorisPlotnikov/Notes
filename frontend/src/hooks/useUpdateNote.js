// hooks/useUpdateNote.js

import useApiRequest from './useApiRequest';
import { API_ROUTES } from '../constants';

const useUpdateNote = (setNotes) => {
    const sendRequest = useApiRequest();

    return async (id, content) => {
        const result = await sendRequest('put', API_ROUTES.NOTE_BY_ID(id), { content });
        if (!result) return false;

        setNotes(prevNotes =>
            prevNotes.map(note =>
                note._id === id ? result : note
            )
        );
        return true;
    };
};

export default useUpdateNote;
