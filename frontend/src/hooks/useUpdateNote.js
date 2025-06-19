// hooks/useUpdateNote.js

import useAbortController from '../hooks/useAbortController';
import axios from 'axios';
import { getApiBaseUrl } from '../utils/apiConfig';

const useUpdateNote = (setNotes, processError, setLoading) => {
    const { createAbortController, getSignal } = useAbortController();

    const updateNote = async (id, content) => {
        setLoading(true);
        createAbortController();
        const apiBaseUrl = getApiBaseUrl();
        
        try {
            await axios.put(
                `${apiBaseUrl}/notes/${id}`,
                { content },
                { signal: getSignal() }
            );
            
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note._id === id ? { ...note, content } : note
                )
            );
        } catch (error) {
            processError(
                error,
                axios.isCancel(error) ? 'Request canceled' : 'Updating failed'
            );
        } finally {
            setLoading(false);
        }
    };

    return { updateNote }
};

export default useUpdateNote;
