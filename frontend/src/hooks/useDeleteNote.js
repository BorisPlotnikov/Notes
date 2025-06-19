// hooks/useDeleteNote.js

import useApiRequest from './useApiRequest';

const useDeleteNote = (setNotes, processError, setLoading) => {
    const { sendRequest } = useApiRequest(processError, setLoading);

    const deleteNote = async (id) => {
        let backup = [];

        setNotes(prevNotes => {
            backup = prevNotes;
            return prevNotes.filter(note => note._id !== id);
        });

        try {
            await sendRequest('delete', `/notes/${id}`);
        } catch {
            setNotes(backup); // rollback UI on failure
        }
    };

    return { deleteNote };
};

export default useDeleteNote;
