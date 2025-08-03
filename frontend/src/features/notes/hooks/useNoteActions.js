import { useApiRequest } from '../hooks';
import { ERROR_MESSAGES, API_ROUTES } from '../../../constants';

const useNotesActions = (setNotes, setLoading) => {
    const sendRequest = useApiRequest(setLoading);

    const fetchNotes = async () => {
        const data = await sendRequest('get', API_ROUTES.NOTES);

        if (!data) {
            throw new Error('fetchNotes: No data received.');
        }

        if (!Array.isArray(data)) {
            throw new Error(ERROR_MESSAGES.DATA.UNEXPECTED_FORMAT);
        }
            setNotes(data.map(note => ({
                ...note,
                isEditing: false
            })));
            
            return true;
    };
    

    const addNote = async (content) => {
        const newNote = await sendRequest('post', API_ROUTES.NOTES, { content });
        if (!newNote) return false;
        
        setNotes(prev => [...prev, newNote]);
        return true;
    };

    const updateNote = async (id, content) => {
        const result = await sendRequest('put', API_ROUTES.NOTE(id), { content });
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

        const result = await sendRequest('delete', API_ROUTES.NOTE(id));
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