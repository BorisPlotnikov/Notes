// context/NotesContext.js

import { createContext, useContext } from 'react';
import { ERROR_MESSAGES } from '../constants';

const NotesContext = createContext(null);

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error(ERROR_MESSAGES.CONTEXT.NOTES);
    }
    return context;
};

export default NotesContext;