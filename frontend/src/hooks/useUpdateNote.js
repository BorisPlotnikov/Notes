// useUpdateNote.js

import useAbortController from '../hooks/useAbortController';
import axios from 'axios';
import { getApiBaseUrl } from '../utils/apiConfig';
import handleError from '../utils/errorHandler';

const useUpdateNote = (setNotes, setErrorMessage, setLoading) => {
    const { createAbortController, getSignal } = useAbortController();

    const updateNote = async (id, content) => {
        setLoading(true);
        createAbortController();
        const apiBaseUrl = getApiBaseUrl();
        
        try {
            await axios.put(
                `${apiBaseUrl}/notes/${id}`,
                { content: content },
                { signal: getSignal() }
            );
            
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note._id === id ? { ...note, content: content } : note
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
