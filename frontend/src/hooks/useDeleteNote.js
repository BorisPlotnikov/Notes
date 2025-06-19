// hooks/useDeleteNote.js

import useAbortController from '../hooks/useAbortController';
import axios from 'axios';
import { getApiBaseUrl } from '../utils/apiConfig';

const useDeleteNote = (setNotes, processError, setLoading) => {   
    const { createAbortController, getSignal } = useAbortController();

    const deleteNote = async (id) => {

        setLoading(true);
        createAbortController();
        
        const apiBaseUrl = (() => {
            try {
                return getApiBaseUrl();
            } catch (error) {
                processError(error, 'Deleting a note failed');
                return null;
            }
        })();

        if (!apiBaseUrl) return;

        let backup = [];

        setNotes(prevNotes => {
            backup = prevNotes;
            return prevNotes.filter(note => note._id !== id);
        });

        try {
            await axios.delete(
                `${apiBaseUrl}/notes/${id}`,
                { signal: getSignal() }
            );
        } catch (error) {
            processError(
                error,
                axios.isCancel(error) ? 'Request canceled' : 'Deleting failed'
            );
            setNotes(backup);
        } finally {
            setLoading(false);
        }
    };

    return { deleteNote }
};

export default useDeleteNote;

