import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import NoteList from './components/NoteList';
import NoteForm  from './components/NoteForm';
import ErrorNotification from './components/ErrorNotification';
import './css/App.css';

dotenv.config();

const App = () => {
    const [notes, setNotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [editNote, setEditNote] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchNotes = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/notes`, { signal: controller.signal });
                setNotes(response.data);
            } catch (err) {
                if (axios.isCancel(err)) {
                    handleError(setErrorMessage, 'Request canceled:', err)
                } else {
                    handleError(setErrorMessage, 'Downloading failed', err);
                }
            }
        };

        fetchNotes();

        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        if (errorMessage) {
            const timeout = setTimeout(() => setErrorMessage(null), 3000);
            return () => clearTimeout(timeout);
        }
    }, [errorMessage]);

        const addNote = async (noteContent, signal) => {
            try  {
                const newNote = { id : uuidv4(), noteContent : noteContent.trim() };
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/notes`, newNote, { signal });
                setNotes((prevNotes) => [...prevNotes, response.data]);
            } catch (err) {
                if (axios.isCancel(err)) {
                    handleError(setErrorMessage, 'Request canceled', err);
                } else {
                    handleError(setErrorMessage, 'Saving failed', err);
                }
            }
        };

    const deleteNote = async (id) => {
        const controller = new AbortController();
        const notesBackup = [...notes];
        setDeleteId(id);
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
        
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/notes/${id}`, { signal: controller.signal });
        } catch (err) {
            if (axios.isCancel(err)) {
                handleError(setErrorMessage, 'Request canceled', err);
            } else {
                handleError(setErrorMessage, 'Deleting failed', err);
                setNotes(notesBackup);
            }
        }

        return controller;
    };

    const updateNote = async (updateNote, signal) => {
        const controller = new AbortController();

        try {
            const response = await axios.put (`${process.env.REACT_APP_API_BASE_URL}/notes/${updateNote.id}`, updateNote, { signal });
            setNotes((prevNotes) => prevNotes.map(note => (note.id === updateNote.id ? response.data : note)));
            setEditNote(null);
        } catch (err) {
            if (axios.isCancel(err)) {
                handleError(setErrorMessage, 'Request canceled', err);
            } else {
                handleError(setErrorMessage, 'Failed to update note', err);
            }
        }

        return controller;
    };

    return (
        <div className='app'>
            <h1>Notes</h1>
            <NoteForm addNote={addNote} errorMessage={errorMessage} setErrorMessage={setErrorMessage} editNote={editNote} updateNote={updateNote} />
            <NoteList notes={notes} deleteNote={deleteNote} deleteId={deleteId} setEditNote={setEditNote}/>
            {errorMessage && <ErrorNotification message={errorMessage} />}
        </div>
    );
};

export default App;