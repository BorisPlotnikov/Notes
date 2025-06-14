import { createContext, useContext } from 'react';

const NotesContext = createContext(null);

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error('useNotes must be used within a NotesProvider');
    }
    return context;
};

export default NotesContext;