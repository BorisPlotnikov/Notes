// useUpdateNote.js

import { useEffect } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
import handleError from '../utils/errorHandler';
dotenv.config();

const useUpdateNote = (setNotes, setMessage, setLoading) => {
    
    const controller = new AbortController();
    useEffect(() => { return () => controller.abort() }, []);

    const updateNote = async (id, newContent) => {
        setLoading(true);
        try {
            await axios.put(
                `${process.env.REACT_APP_API_BASE_URL}/notes/${id}`,
                { content: newContent },
                { signal: controller.signal }
            );
            
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === id ? {...note, content: newContent } : note
                )
            );
        } catch (err) {
            handleError(
                setMessage,
                axios.isCancel(err) ? 'Request canceled' : 'Updating failed',
                err
            );
        } finally {
            setLoading(false);
        }
    };

    return { updateNote };
};

export default useUpdateNote;
