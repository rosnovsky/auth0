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
                <a
                    href={`https://manage.auth0.com/dashboard/us/${process.env.REACT_APP_TENANT}/users/${user.sub}`}
                >
                    <img
                        src={user.picture}
                        width="25px"
                        style={{ borderRadius: '50%' }}
                        alt="Profile"
                    />{' '}
                    {user.name}
                </a>
            </p>
        </>
    );
};

export default Profile;
