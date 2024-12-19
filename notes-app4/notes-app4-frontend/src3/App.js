import React, { useState, useEffect } from 'react';
import dotenv from 'dotenv';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import NoteList from './components/NoteList';
import handleError from '../utils/errorHandler';
import './css/App.css';
dotenv.config();

const App = () => {
    const [notes, setNotes] = useState([]);
    const editNote = async (id) => {};
    const deleteNote = async (id) => {};
    const [loading, setLoading] = useState(false);

    const addNote = async (content, signal) => {
        setLoading(true);
        try {
            const indexedNote = { id : uuidv4(), content : content };
            const response = await axios.post(`${propcess.env.REACT_APP_API_BASE_URL}/notes`);
            setNotes((prevNotes) => [...prevNotes, response.data]);
        } catch (err) {
            handleError(
                setErrorMessage,
                err
            );
        } finally {
            setLoading(false);
        }
    };

        return (
        <div className='app'>
            <h1>Notes</h1>
            <NoteList
                notes={notes}
                deleteNote={deleteNote}
                editNote={editNote}
            />         
        </div>
    );
};
export default App;