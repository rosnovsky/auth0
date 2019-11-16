import React from 'react';
import { useAuth0 } from '../react-auth0-spa';
import styled from 'styled-components';

const ProfileWrapper = styled.div`
    width: 7rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;

    a {
        display: flex;
        width: 80%;
        justify-content: space-around;
        align-items: center;
        text-decoration: none;
    }

    a:visited {
        color: inherit;
    }

    a:hover {
        color: rgba(10, 90, 240, 1);
    }

    a span {
        border-bottom: 1px dotted grey;
    }
`;

const Profile = () => {
    const { loading, user } = useAuth0();

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ProfileWrapper>
                <a
                    href={`https://manage.auth0.com/dashboard/us/${process.env.REACT_APP_TENANT}/users/${user.sub}`}
                >
                    <img
                        src={user.picture}
                        width="25px"
                        style={{ borderRadius: '50%' }}
                        alt="Profile"
                    />{' '}
                    <span>{user.name}</span>
                </a>
            </ProfileWrapper>
        </>
    );
};

export default Profile;
