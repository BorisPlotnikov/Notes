// hooks/useUpdateNote.js

import useApiRequest from './useApiRequest';

const useUpdateNote = (setNotes, handleError, setLoading) => {
    const { sendRequest } = useApiRequest(handleError, setLoading);

    const updateNote = async (id, content) => {
        try {
            await sendRequest('put', `/notes/${id}`, { content });
            setNotes(prevNotes =>
                prevNotes.map(note =>
                    note._id === id ? { ...note, content } : note
                )
            );
        } catch {
            // error handled inside sendRequest
        }
    };

    return { updateNote };
};

export default useUpdateNote;
