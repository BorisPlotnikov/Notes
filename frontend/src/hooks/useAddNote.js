// hooks/useAddNote.js

import useApiRequest from './useApiRequest';

const useAddNote = (setNotes, processError, setLoading) => {
    const { sendRequest } = useApiRequest(processError, setLoading);

    const addNote = async (content) => {
            try {
                const newNote = await sendRequest('post', '/notes', { content });
                setNotes(prev => [...prev, newNote]);
            } catch {
                 // Error already handled in sendRequest
            }
        };
    return { addNote };
};

export default useAddNote;
