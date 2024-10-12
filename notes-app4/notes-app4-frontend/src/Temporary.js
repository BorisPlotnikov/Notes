import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState(null);

    const getErrorMessage = (error) => {
        switch (true) {
            case error?.response?.data?.message:
            return error.response.data.message;

            case error?.message:
                return error.message;

            case typeof error === 'string':
                return error;

            default:
                return 'An unexpected error occurred';
        }
    };

    const fetchUsers = async() => {
        setLoading(true);
        controller && controller.abort();

        const newController = new AbortController();
        setController(newController);

        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users', {
                signal: newController.signal
            });
            setUsers(response.data);
            setError(null);
        } catch (err) {
            axios.isCancel(err) ?
            setError('Request canceled') :
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => controller && controller.abort();
    }, [controller]);

    return (
        <div>
            <button onClick={fetchUsers} disabled={loading}>{loading ? 'Loading...' : 'Fetch Users'}</button>
            <button onClick={() => controller && controller.abort()} disabled={!controller}>Cancel Request</button>
            {error && <p>{getErrorMessage(error)}</p>}
            <ul>
                {users.map(user => <li key={user.id}>{user.name}</li>)}
            </ul>
        </div>
    );
};

export default FetchUsers;