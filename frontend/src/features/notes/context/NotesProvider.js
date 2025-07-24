// /src/features/notes/context/NotesProvider.js

import React, { useEffect, useState, useRef } from 'react';
import NotesContext from './NotesContext';
import useNoteActions from '../hooks/useNoteActions';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { LOAD_TIMES } from '../../../constants';
import PropTypes from 'prop-types';


const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);
    const [editingIds, setEditingIds] = useState([]);

    const handleError = useErrorHandler();
    const { fetchNotes, addNote, updateNote, deleteNote } = useNoteActions(setNotes);

    const inputRef = useRef(null);
    const noteInputRefs = useRef({});

    useEffect(() => {
        const wait = (ms) => new Promise((res) => setTimeout(res, ms));

        const init = async () => {
            const start = Date.now();

            await fetchNotes();
            
            const elapsed = Date.now() - start;
            const remaining = LOAD_TIMES.MIN_LOAD_TIME - elapsed;

            if (remaining > 0) await wait(remaining);
            
            setLoading(false);
            setIsInitialized(true);
        };
        
        init();
    }, [fetchNotes]);

    useEffect(() => {
        if (editingIds.length === 0) {
            inputRef.current?.focus();
        } else {
            const lastEditedId = editingIds.at(-1);
            const lastTextarea = noteInputRefs.current[lastEditedId];
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
        isInitialized,
    };

    return (
        <NotesContext.Provider value={contextValue}>
            {children}
        </NotesContext.Provider>
    );
};

NotesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default NotesProvider;