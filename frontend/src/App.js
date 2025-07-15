// App.js

import React, { useState, useEffect, useRef } from 'react';                     
import './css/App.css';
import ErrorBoundary from './components/ErrorBoundary';
import NotesContext from './context/NotesContext';
import useErrorHandler from './hooks/useErrorHandler';          
import useFetchNotes from './hooks/useFetchNotes';
import useAddNote from './hooks/useAddNote';
import useUpdateNote from './hooks/useUpdateNote';
import useDeleteNote from './hooks/useDeleteNote';
import Spinner from './components/Spinner';
import ErrorNotification from './components/ErrorNotification';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

const App = () => {
    const [loading, setLoading] = useState(false);
    const handleError = useErrorHandler();
    const [editingIds, setEditingIds] = useState([]);
    const [notes, setNotes] = useState([]);

    useFetchNotes(setNotes);
    const { addNote } = useAddNote(setNotes);
    const { updateNote } = useUpdateNote(setNotes);
    const { deleteNote } = useDeleteNote(setNotes);

    const inputRef = useRef(null);
    const noteInputRefs = useRef({});

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
        errorMessage,
        handleError,
        editingIds,
        setEditingIds,
        setLoading,
        setNotes,
        inputRef,
        noteInputRefs,
    };

    return (
        <NotesContext.Provider value={contextValue}>
            <div className='app'>
                <h1>Notes</h1>
                <ErrorBoundary>
                    <NoteForm />
                </ErrorBoundary>
                <ErrorBoundary>
                    <NoteList />
                </ErrorBoundary>
                {loading && <Spinner />}
                {errorMessage && <ErrorNotification />}
            </div>
        </NotesContext.Provider>
    );
};

export default App;

