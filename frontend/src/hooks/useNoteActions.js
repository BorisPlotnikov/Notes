import useApiRequest from './useApiRequest';
import { ERROR_MESSAGES, API_ROUTES } from '../constants';

const useNotesActions = (setNotes) => {
    const sendRequest = useApiRequest();

    const fetchNotes = async () => {
        const data = await sendRequest('get', API_ROUTES.NOTES);
        if (Array.isArray(data)) {
            setNotes(data.map(note => ({
                ...note,
                isEditing: false
            })));
        } else {
            throw new Error(ERROR_MESSAGES.DATA.UNEXPECTED_FORMAT);
        }
    };

    const addNote = async (content) => {
        const newNote = await sendRequest('post', API_ROUTES.NOTES, { content });
        if (!newNote) return false;
        
        setNotes(prev => [...prev, newNote]);
        return true;
    };

    const updateNote = async (id, content) => {
        const result = await sendRequest('put', API_ROUTES.NOTE_BY_ID(id), { content });
        if (!result) return false;

        setNotes(prevNotes =>
            prevNotes.map(note =>
                note._id === id ? result : note
            )
        );
        return true;
    };

    const deleteNote = async (id) => {
        let backup = [];

        setNotes(prevNotes => {
            backup = [...prevNotes];
            return prevNotes.filter(note => note._id !== id);
        });

        const result = await sendRequest('delete', API_ROUTES.NOTE_BY_ID(id));
        if (!result) {
            setNotes(backup);
            return false;
        }

        return true;
    };

    return {
        fetchNotes,
        addNote,
        updateNote,
        deleteNote
    };
};

export default useNotesActions;