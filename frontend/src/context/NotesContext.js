// context/NotesContext.js

import { createContext, useContext } from 'react';
import { CONTEXT_ERROR_MESSAGES } from '../constants';

const NotesContext = createContext(null);

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error(CONTEXT_ERROR_MESSAGES.NOTES);
    }
    return context;
};

export default NotesContext;