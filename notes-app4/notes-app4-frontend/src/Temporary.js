import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchUsers = () => {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [controller, setController] = useState(null);

    const fetchUsers = async () => {

        if (controller) {
            controller.abort();
        }

        const newController = new AbortController();
        setController(newController);

        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users', {
                signal: newController.signal,
            });
            setUsers(response.data);
            setError(null);
        } catch (err) {
            if (axios.isCancel(err)) {
                setError ('Request is canceled');
            } else {
                setError(err);
            }
        }
    };

    useEffect(() => {
        return () => {
            if (controller) {
                controller.abort();
            }
        };
    }, [controller]);

    return (
        <div>
            <button onClick={fetchUsers} disabled={loading}>Fetch Users</button>
            <button onClick={() => controller && controller.abort()}>Cancel Request</button>
            {error && <p>{error.response?.data?.message || (typeof error === 'string' ? error : error.message)}</p>}
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default FetchUsers;
