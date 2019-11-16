import React from 'react';
import { useAuth0 } from '../react-auth0-spa';

const Footer = () => {
    const { loading, user } = useAuth0();

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>&copy; {new Date().getFullYear()}</p>
        </div>
    );
};

export default Footer;
