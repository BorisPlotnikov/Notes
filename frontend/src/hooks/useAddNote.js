// hooks/useAddNote.js

import useAbortController from '../hooks/useAbortController';
import axios from 'axios';
import { getApiBaseUrl } from '../utils/apiConfig';
import handleError from '../utils/errorHandler';

const useAddNote = (setNotes, setErrorMessage, setLoading) => {
    const { createAbortController, getSignal } = useAbortController();

    const addNote = async (content) => {
        setLoading(true);
        createAbortController();
        const apiBaseUrl = getApiBaseUrl();

        try {
            const newNote = { content };
            const response = await axios.post(
                `${apiBaseUrl}/notes`,
                newNote,
                { signal: getSignal() }
            );
            setNotes((prevNotes) => [...prevNotes, response.data]);
        } catch (err) {
            handleError(
                setErrorMessage,
                axios.isCancel(err) ? 'Request canceled' : 'Saving failed',
                err
            );
        } finally {
            setLoading(false);
        }
    };

    return { addNote };
};

export default useAddNote;
