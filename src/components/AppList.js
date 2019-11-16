import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { Link, useParams } from 'react-router-dom';

const Apps = () => {
    const [apps, setApps] = useState([]);
    const { loading, user } = useAuth0();

    useEffect(() => {
        const log = () => {
            const url = `https://${process.env.REACT_APP_TENANT}/api/v2/clients`;
            const bearer = `Bearer ${process.env.REACT_APP_API_MANAGEMENT_TOKEN}`;
            fetch(url, {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {
                    Authorization: bearer,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    setApps(data);
                })

                .catch(error => console.log('BOO!'));
        };
        log();
    }, []);

    if (loading || !user) {
        return <div>Please log in</div>;
    }

    return !user ? (
        'Please login...'
    ) : (
        <>
            {' '}
            <p>All Your Apps: </p>
            <ul>
                {apps.map(app => (
                    <li key={app.client_id}>
                        <Link to={app.client_id}>{app.name}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Apps;
