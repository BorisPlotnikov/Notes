// App.js

import React, { useState, useEffect, useRef } from 'react';                     
import './css/App.css';

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
    const [notes, setNotes] = useState([]);
    const { errorMessage, processError } = useErrorHandler();
    const [loading, setLoading] = useState(false);
    const [editingIds, setEditingIds] = useState([]);

    const inputRef = useRef(null);
    const noteInputRefs = useRef({});

    useFetchNotes(setNotes, processError, setLoading);

    const { addNote } = useAddNote(setNotes, processError, setLoading);
    const { updateNote } = useUpdateNote(setNotes, processError, setLoading);
    const { deleteNote } = useDeleteNote(setNotes, processError, setLoading);

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
        processError,
        editingIds,
        setEditingIds,
        inputRef,
        noteInputRefs,
    };

    return (
        <NotesContext.Provider value={contextValue}>
            <div className='app'>
                <h1>Notes</h1>
                <NoteForm />
                <NoteList />
                {loading && <Spinner />}
                {errorMessage && <ErrorNotification />}
            </div>
        </NotesContext.Provider>
    );
};

export default App;

