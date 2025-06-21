// hooks/useFetchNotes.js

import { useEffect } from 'react';

import useApiRequest from './useApiRequest';

const useFetchNotes = (setLoading, handleError, setNotes) => {
    const { sendRequest } = useApiRequest(handleError, setLoading);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await sendRequest('get', '/notes');
                if (Array.isArray(data)) {
                    setNotes(data.map(note => ({
                        ...note,
                        isEditing: false
                    })));
                } else {
                    handleError('Unexpected data format');
                }
            } catch {
                // Error already handled by sendRequest
            }
        };

        fetchNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useFetchNotes;
