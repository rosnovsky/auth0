import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// App List styles
const StyledList = styled.ul`
    list-style-image: url('../ul-bullet.png');
    font-size: 1.25rem;
    line-height: 2rem;
`;

const Apps = () => {
    const [apps, setApps] = useState([]);
    const { user } = useAuth0();

    // useEffect fetches applications on load
    useEffect(() => {
        const log = async () => {
            const url = `https://${process.env.REACT_APP_TENANT_DOMAIN}/api/v2/clients`;
            const bearer = `Bearer ${process.env.REACT_APP_API_MANAGEMENT_TOKEN}`;

            // You could use fetch API, however, it may lead to some CORS issues
            const data = await axios({
                method: 'get',
                url: url,
                headers: { Authorization: bearer },
            });
            setApps(data.data);
        };
        log();
    }, []);

    // We ask you to login if you're not logged in yet. If you're logged in, you'll see a list of all available apps for your tenant
    return !user ? (
        'Start by logging in ☝️'
    ) : (
        <div>
            <div style={{ marginBottom: '5rem' }}>
                <h1>All Your Apps</h1>
                <small>Click on an app to see what rules apply to it.</small>
            </div>
            <StyledList>
                {apps.map(app => (
                    <li key={app.client_id}>
                        {/* Each app has its own set of rules. Clicking on an app name will take you to its rules page  */}
                        <Link to={app.client_id}>{app.name}</Link>
                    </li>
                ))}
            </StyledList>
        </div>
    );
};

export default Apps;
