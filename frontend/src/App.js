import React, { useState, useRef } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import ErrorNotification from './components/ErrorNotification';
import Spinner from './components/Spinner';           
import useFetchNotes from './hooks/useFetchNotes';
import useAddNote from './hooks/useAddNote';
import useDeleteNote from './hooks/useDeleteNote';
import useUpdateNote from './hooks/useUpdateNote';                                    
import './css/App.css';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editingNoteIds, setEditingNoteIds] = useState(new Set());

    const inputRef = useRef(null);

    const { addNote } = useAddNote(setNotes, setErrorMessage, setLoading);
    const { updateNote } = useUpdateNote(setNotes, setErrorMessage, setLoading);
    const { deleteNote } = useDeleteNote(setNotes, setErrorMessage, setLoading);

    useFetchNotes(setNotes, setErrorMessage, setLoading);

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
                editingNoteIds={editingNoteIds}
                setEditingNoteIds={setEditingNoteIds}
            />
            
            {loading && <Spinner />}
            {errorMessage && <ErrorNotification message={errorMessage} />}
        </div>
    );
};

export default App;
