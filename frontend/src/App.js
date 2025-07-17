// App.js

import React from 'react';                     
import './css/App.css';
import ErrorBoundary from './components/ErrorBoundary';
import Spinner from './components/Spinner';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import { useNotes } from './context/NotesContext';

const App = () => {
    const { loading } = useNotes();

    return (
            <div className='app'>
                <h1>Notes</h1>
                <ErrorBoundary>
                    <NoteForm />
                </ErrorBoundary>
                <ErrorBoundary>
                    <NoteList />
                </ErrorBoundary>
                {loading && <Spinner />}
            </div>
    );
};

export default App;

