// hooks/useDeleteNote.js

import useAbortController from '../hooks/useAbortController';
import axios from 'axios';
import { getApiBaseUrl } from '../utils/apiConfig';
import handleError from '../utils/errorHandler';

const useDeleteNote = (setNotes, setErrorMessage, setLoading) => {   
    const { createAbortController, getSignal } = useAbortController();

    const deleteNote = async (id) => {
        let backup;

        setLoading(true);
        createAbortController();
        const apiBaseUrl = getApiBaseUrl();

        setNotes(prevNotes => {
            backup = [...prevNotes];
            return prevNotes.filter(note => note._id !== id);
        });

        try {
            await axios.delete(
                `${apiBaseUrl}/notes/${id}`,
                { signal: getSignal() }
            );
        } catch (err) {
            handleError(
                setErrorMessage,
                axios.isCancel(err) ? 'Request canceled' : 'Deleting failed',
                err
            );
            setNotes(backup);
        } finally {
            setLoading(false);
        }
    };

    return { deleteNote }
};

export default useDeleteNote;

