import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteList from './components/NoteList';
import NoteForm  from './components/NoteForm';
import ErrorNotification from './components/ErrorNotification';
import './css/App.css';
import dotenv from 'dotenv';
dotenv.config();

const App = () => {
    const [notes, setNotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [editNote, setEditNote] = useState(null);

    useEffect(() => { 
        fetchNotes();
    }, []);

    useEffect(() => {
        if (errorMessage) {
            const timeout = setTimeout(() => setErrorMessage(null), 3000);
            return () => clearTimeout(timeout);
        }
    }, [errorMessage]);

    const fetchNotes = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/notes`);
            setNotes(response.data);
        } catch (err) {
                handleError(setErrorMessage, 'Downloading failed', err);
        }
    };

    const addNote = async (content) => {
        try  {
            const newNote = { content : content.trim() };
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/notes`, newNote);
            setNotes([...notes, response.data]);
        } catch (err) {
                handleError(setErrorMessage, 'Saving failed', err);
        }
    };

    const deleteNote = async (id) => {
        const notesBackup = [...notes];
        setDeleteId(id);
        setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/notes/${id}`);
        } catch (err) {
                handleError(setErrorMessage, 'Deleting failed', err);
                setNotes(notesBackup);
        }
    };

    const updateNote = async (updateNote) => {
        try {
            const response = await axios.put (`${process.env.REACT_APP_API_BASE_URL}/notes/${updatedNote._id}`, updatedNote);
            setNotes(notes.map(note => (note.id === updatedNote._id ? response.data : note)));
            setEditNote(null);
        } catch (err) {
            handleError(setErrorMessage, 'Failed to update note', err);
        }
    };

    return (
        <div className='app'>
            <h1>Notes</h1>
            <NoteForm addNote={addNote} errorMessage={errorMessage} setErrorMesage={setErrorMessage} editNote={editNote} updateNote={updateNote} />
            <NoteList notes={notes} deleteNote={deleteNote} deleteId={deleteId} setEditNote={setEditNote}/>
            {errorMessage && <ErrorNotification message={errorMessage} />}
        </div>
    );
};

export default App;

// Editing notes functionality
// Since Axios 1.0, cancelToken has been deprecated in favor of the AbortController API, which is now the recommended approach to cancel requests
// Implement the unique id