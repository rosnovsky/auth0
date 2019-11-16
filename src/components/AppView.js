import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AppRules from './AppRules';

const AppView = () => {
    const [app, setApp] = useState([]);
    const { loading, user } = useAuth0();
    const { client_id } = useParams();

    useEffect(() => {
        const log = () => {
            const url = `https://${process.env.REACT_APP_TENANT_DOMAIN}/api/v2/clients/${client_id}`;
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
                    setApp(data);
                })

                .catch(error => console.log('BOO!'));
        };
        log();
    }, [client_id]);

    if (loading || !user) {
        return <div>Please log in</div>;
    }

    return !user ? (
        'Please login...'
    ) : (
        <>
            {' '}
            <h2>
                <Link to="/">🠐</Link>&nbsp;&nbsp;Rules for {app.name}
            </h2>
            <AppRules appName={app.name} />
        </>
    );
};

export default AppView;
