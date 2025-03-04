// App.js

import React, { useState, useEffect } from 'react';
import useUpdateNote from '../hooks/useUpdateNote';
import ErrorNotification from './components/ErrorNotification';
import Spinner from './components/Spinner';
import './css/App.css';
import PropTypes from 'prop-types';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const { updateNote } = useUpdateNote(setNotes, setMessage, setLoading);

        return (
        <div className='app'>
            <h1>Notes</h1>
            <NoteList
                notes={notes}
                updateNote={updateNote}
                loading={loading}
            />
            {loading && <Spinner />}
            {message && <ErrorNotification message={message} />}  
        </div>
    );
};


export default App;