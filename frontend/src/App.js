// App.js

import React, { useState } from 'react';  // Import React and the useState hook
import useUpdateNote from './hooks/useUpdateNote';  // Custom hook for updating notes
import useAddNote from './hooks/useAddNote'; // Custom hook for adding notes
import useDeleteNote from './hooks/useDeleteNote';  // Custom hook for deleting notes
import NoteForm from './components/NoteForm'; // Component for note creating input form
import NoteList from './components/NoteList';  // Component for displaying the list of notes
import ErrorNotification from './components/ErrorNotification';  // Component to show error messages
import Spinner from './components/Spinner';  // Component to show a loading spinner
import './css/App.css';  // Import CSS for styling the App

const App = () => {
    // State variables
    const [notes, setNotes] = useState([]);  // Stores the list of notes
    const [errorMessage, setErrorMessage] = useState(null);  // Stores any error message
    const [loading, setLoading] = useState(false);  // Indicates whether the app is loading

    // Destructure the functions from custom hooks for updating and deleting notes
    const { addNote } = useAddNote(setNotes, setErrorMessage, setLoading);
    const { updateNote } = useUpdateNote(setNotes, setErrorMessage, setLoading);
    const { deleteNote } = useDeleteNote(setNotes, setErrorMessage, setLoading);

    return (
        <div className='app'>
            <h1>Notes</h1>  {/* Header for the app */}
            <NoteForm
                addNote={addNote} 
                setErrorMessage={setErrorMessage} 
                loading={loading}
            />
            <NoteList
                notes={notes}  // Pass the notes state to the NoteList component
                updateNote={updateNote}  // Pass the updateNote function to the NoteList component
                deleteNote={deleteNote}  // Pass the deleteNote function to the NoteList component
                loading={loading}  // Pass loading state to the NoteList component
            />
            {loading && <Spinner />}  {/* Show Spinner component if loading is true */}
            {errorMessage && <ErrorNotification message={errorMessage} />}  {/* Show error message if errorMessage exists */}
        </div>
    );
};

export default App;  // Export the App component for use in other parts of the app
