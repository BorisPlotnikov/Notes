// context/NotesContext.js

import { createContext, useContext } from 'react';
import { CONTEXT_ERRORS } from '../constants';

const NotesContext = createContext(null);

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error(CONTEXT_ERRORS.NOTES);
    }
    return context;
};

export default NotesContext;