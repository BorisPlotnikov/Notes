// useUpdateNote.js

import useAbortController from '../hooks/useAbortController';
import axios from 'axios';
import { getApiBaseUrl } from '../utils/apiConfig';
import handleError from '../utils/errorHandler';

const useUpdateNote = (setNotes, setErrorMessage, setLoading) => {
    const { createAbortController, getSignal } = useAbortController();

    const updateNote = async (id, newContent) => {
        setLoading(true);
        createAbortController();
        const apiBaseUrl = getApiBaseUrl();
        
        try {
            await axios.put(
                `${apiBaseUrl}/notes/${id}`,
                { content: newContent },
                { signal: getSignal() }
            );
            
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === id ? { ...note, content: newContent } : note
                )
            );
        } catch (err) {
            handleError(
                setErrorMessage,
                axios.isCancel(err) ? 'Request canceled' : 'Updating failed',
                err
            );
        } finally {
            setLoading(false);
        }
    };

    return { updateNote }
};

export default useUpdateNote;
