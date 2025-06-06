// App.js

import React, { useState, useEffect, useRef } from 'react';
import useFetchNotes from './hooks/useFetchNotes';
import useUpdateNote from './hooks/useUpdateNote';
import useAddNote from './hooks/useAddNote';
import useDeleteNote from './hooks/useDeleteNote';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import ErrorNotification from './components/ErrorNotification';
import Spinner from './components/Spinner';                                               
import './css/App.css';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editingStack, setEditingStack] = useState([]);
    const inputRefs = useRef({});
    const inputRef = useRef(null);

    const { addNote } = useAddNote(setNotes, setErrorMessage, setLoading);
    const { updateNote } = useUpdateNote(setNotes, setErrorMessage, setLoading);
    const { deleteNote } = useDeleteNote(setNotes, setErrorMessage, setLoading);

    const setNoteEditingState = (noteId, isEditing) => {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note._id === noteId ? { ...note, isEditing } : note
            )
        );

        setEditingStack(prevStack => {
            const newStack = isEditing
            ? [...prevStack.filter(id => id !== noteId), noteId]
            : prevStack.filter(id => id !== noteId);
            return newStack;
        });
    };

    useFetchNotes(setNotes, setErrorMessage, setLoading);

    useEffect(() => {
        const latestEditingNoteId = editingStack[editingStack.length - 1];

        if (latestEditingNoteId && !inputRefs.current[latestEditingNoteId]) {
            console.warn(`No input ref found for noteId: ${latestEditingNoteId}`);
        }        

        if (latestEditingNoteId && inputRefs.current[latestEditingNoteId]) {
            inputRefs.current[latestEditingNoteId].focus();
        } else if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingStack]);

    return (
        <div className='app'>
            <h1>Notes</h1>
            <NoteForm
                addNote={addNote}
                setErrorMessage={setErrorMessage}
                loading={loading}
                inputRef={inputRef}
            />

            <NoteList
                notes={notes}
                updateNote={updateNote}
                deleteNote={deleteNote}
                loading={loading}
                setNoteEditingState={setNoteEditingState}
                inputRefs={inputRefs}
            />
            {loading && <Spinner />}
            {errorMessage && <ErrorNotification message={errorMessage} />}
        </div>
    );
};

export default App;
