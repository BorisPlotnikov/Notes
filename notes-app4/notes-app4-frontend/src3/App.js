import React, { useState, useEffect } from 'react';
import ErrorNotification from './components/ErrorNotification';
import Spinner from './components/Spinner';
import dotenv from 'dotenv';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import handleError from '../utils/errorHandler';
import './css/App.css';
dotenv.config();

const App = () => {
    const [notes, setNotes] = useState([]);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const addNote = async (content) => {
        setLoading(true);
        try {
            const indexedNote = { id : uuidv4(), content : content };
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/notes`, indexedNote);
            setNotes((prevNotes) => [...prevNotes, response.data]);
        } catch (err) {
            handleError(
                setMessage,
                err
            );
        } finally {
            setLoading(false);
        }
    };

        return (
        <div className='app'>
            <h1>Notes</h1>
            <NoteForm
                addNote={addNote}
                loading={loading}
            />
            {loading ? <Spinner /> : null}
            {message && <ErrorNotification message={message} />}  
        </div>
    );
};
export default App;