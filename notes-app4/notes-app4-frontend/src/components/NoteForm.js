import React, { useState } from 'react';
import '../css/NoteForm.css';

const NoteForm = ({ addNote }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            addNote(content);
            setContent('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='note-form'>
            <input
            type='text'
            value={content}
            onChange={(e) => {
                setContent(e.target.value);
                // if (errorMessage) setErrorMessage(null);
            }}
            placeholder='Add a new note'
            />
            <button type='submit' disabled={!content.trim()}>Add</button>
        </form>
    );
}

export default NoteForm;