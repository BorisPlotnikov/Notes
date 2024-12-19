import React, { useState, useEffect } from 'react';
import dotenv from 'dotenv';
import axios from 'axios';
import NoteList from './components/NoteList';
import handleError from '../utils/errorHandler';
import './css/App.css';
dotenv.config();

const App = () => {
    const [notes, setNotes] = useState([]);
    const editNote = async (id) => {};
    const deleteNote = async (id) => {};
    const [loading, setLoading] = useState(false);

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