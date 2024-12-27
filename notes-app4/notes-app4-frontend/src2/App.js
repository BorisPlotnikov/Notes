import React, { useState, useEffect } from 'react';
import dotenv from 'dotenv';
import axios from 'axios';
import handleError from '../utils/errorHandler';
import './css/App.css';
dotenv.config();

const App = () => {
    const [notes, setNotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
   
    const controller = new AbortController();
    useEffect(() => { return () => controller.abort() }, []);
    
    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_BASE_URL}/notes`, 
                    { signal: controller.signal }
                );

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
    }, []);

        return (
        <div className='app'>
            <h1>Notes</h1>
        </div>
    );
};

export default App;