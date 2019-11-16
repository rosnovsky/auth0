import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AppRules from './AppRules';
import styled from 'styled-components';

const StyledAppView = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
`;

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

    return !user ? (
        'Please login.'
    ) : (
        <StyledAppView>
            <h2>
                <Link to="/">🠐</Link>&nbsp;&nbsp;Rules for {app.name}
            </h2>
            <AppRules appName={app.name} />
        </StyledAppView>
    );
};

export default AppView;
