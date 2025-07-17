// context/NotesContext.js

import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { ERROR_MESSAGES } from '../constants';
import useErrorHandler from '../hooks/useErrorHandler';
import useNoteActions from '../hooks/useNoteAction';

const NotesContext = createContext(null);

export const NotesProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [editingIds, setEditingIds] = useState([]);
    const [notes, setNotes] = useState([]);

    const handleError = useErrorHandler();
    const { fetchNotes, addNote, updateNote, deleteNote } = useNoteActions(setNotes);

    const inputRef = useRef(null);
    const noteInputRefs = useRef({});

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    useEffect(() => {
        if (editingIds.length === 0) {
            inputRef.current?.focus();
        } else {
            const lastEditedid = editingIds.at(-1);
            const lastTextarea = noteInputRefs.current[lastEditedid];
            if (lastTextarea) {
                lastTextarea.focus();
                const length = lastTextarea.value.length;
                lastTextarea.setSelectionRange(length, length);
            }
        }
    }, [editingIds, notes.length]);

    const contextValue = {
        notes,
        addNote,
        updateNote,
        deleteNote,
        loading,
        setLoading,
        editingIds,
        setEditingIds,
        setNotes,
        handleError,
        inputRef,
        noteInputRefs,
    };

    return (
        <NotesContext.Provider value={contextValue}>
            {children}
        </NotesContext.Provider>
    );
}

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error(ERROR_MESSAGES.CONTEXT.NOTES);
    }
    return context;
};

export default NotesContext;