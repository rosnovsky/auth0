import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { Link } from 'react-router-dom';

const Apps = () => {
    const [apps, setApps] = useState([]);
    const { loading, user } = useAuth0();

    useEffect(() => {
        const log = () => {
            const url = `https://${process.env.REACT_APP_TENANT_DOMAIN}/api/v2/clients`;
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

    return !user ? (
        ''
    ) : (
        <div>
            <div style={{ marginBottom: '5rem' }}>
                <h1>All Your Apps</h1>
                <small>Click on an app to see what rules apply to it.</small>
            </div>
            <ul>
                {apps.map(app => (
                    <li key={app.client_id}>
                        <Link to={app.client_id}>{app.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Apps;
