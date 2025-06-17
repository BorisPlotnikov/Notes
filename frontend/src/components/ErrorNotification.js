// components/ErrorNotification.js

import React from 'react';
import { useNotes } from '../context/NotesContext';
import '../css/ErrorNotification.css';

const ErrorNotification = () => {
    const { errorMessage } = useNotes();
    return errorMessage ? (
        <div className='error-notification' role="alert" aria-live="assertive">
            {errorMessage}
        </div>
    ) : null;
};

export default ErrorNotification;
