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
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const fetchNotes = async () => {
            setProcessing(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/notes`, { signal: controller.signal });
                if (Array.isArray(response.data)) {
                    setNotes(response.data);
                } else {
                    handleError(setErrorMessage, 'Unexpected data format');
                }              
            } catch (err) {
                handleError(
                    setErrorMessage,
                    axios.isCancel(err) ? 'Request is canceled' : 'Downloading failed',
                    err
                );
            } finally {
                setLoading(false);
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
            setProcessing(true);
            try  {
                const newNote = { id : uuidv4(), noteContent : noteContent.trim() };
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/notes`, newNote, { signal });
                setNotes((prevNotes) => [...prevNotes, response.data]);
            } catch (err) {
                handleError(
                    setErrorMessage,
                    axios.isCancel(err) ? 'Request is canceled' : 'Saving failed',
                    err
                );
            } finally {
                setProcessing(false);
            }
        };

    const deleteNote = async (id) => {
        setProcessing(true);
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
        } finally {
            setProcessing(false);
        }

        return controller;
    };

    const updateNote = async (updateNote, signal) => {
        setProcessing(true);
        const controller = new AbortController();
        try {
            const response = await axios.put (`${process.env.REACT_APP_API_BASE_URL}/notes/${updateNote.id}`, updateNote, { signal });
            setNotes((prevNotes) => prevNotes.map(note => (note.id === updateNote.id ? response.data : note)));
            setEditNote(null);
        } catch (err) {
            handleError(
                setErrorMessage,
                axios.isCancel(err) ? 'Request is canceled' : 'Updating failed',
                err
            );
        } finally {
            setProcessing(false);
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