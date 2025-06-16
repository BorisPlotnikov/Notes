// App.js

import React, { useState, useEffect, useRef } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import ErrorNotification from './components/ErrorNotification';
import Spinner from './components/Spinner';           
import useFetchNotes from './hooks/useFetchNotes';
import useAddNote from './hooks/useAddNote';
import useDeleteNote from './hooks/useDeleteNote';
import useUpdateNote from './hooks/useUpdateNote';
import NotesContext from './context/NotesContext';                                   
import './css/App.css';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editingIds, setEditingIds] = useState([]);

    const inputRef = useRef(null);
    const noteInputRefs = useRef({});

    useFetchNotes(setNotes, setErrorMessage, setLoading);

    const { addNote } = useAddNote(setNotes, setErrorMessage, setLoading);
    const { updateNote } = useUpdateNote(setNotes, setErrorMessage, setLoading);
    const { deleteNote } = useDeleteNote(setNotes, setErrorMessage, setLoading);

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

    useEffect(() => {
        if (notes.length === 0) {
            noteInputRefs.current = {};
        }
    }, [notes.length]);    

    const contextValue = {
        notes,
        addNote,
        updateNote,
        deleteNote,
        loading,
        errorMessage,
        setErrorMessage,
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
                {errorMessage && <ErrorNotification message={errorMessage} />}
            </div>
        </NotesContext.Provider>
    );
};

export default App;

