import React from 'react';
import { useAuth0 } from '../react-auth0-spa';

const Profile = () => {
    const { loading, user } = useAuth0();

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <p>
                Hi <img src={user.picture} width="15px" alt="Profile" />{' '}
                {user.name}
            </p>
        </>
    );
};

export default Profile;
