// hooks/useAddNote.js

import useAbortController from '../hooks/useAbortController';
import axios from 'axios';
import { getApiBaseUrl } from '../utils/apiConfig';

const useAddNote = (setNotes, processError, setLoading) => {
    const { createAbortController, getSignal } = useAbortController();

    const addNote = async (content) => {
        setLoading(true);
        createAbortController();
        const apiBaseUrl = (() => {
            try {
                return getApiBaseUrl();
            } catch (error) {
                processError(error, 'Saving a note failed');
                return null;
            }
        })();

        try {
            const newNote = { content };
            const response = await axios.post(
                `${apiBaseUrl}/notes`,
                newNote,
                { signal: getSignal() }
            );
            setNotes((prevNotes) => [...prevNotes, response.data]);
        } catch (error) {
            processError(
                error,
                axios.isCancel(error) ? 'Request canceled' : 'Saving failed'
            );
        } finally {
            setLoading(false);
        }
    };

    return { addNote };
};

export default useAddNote;
