import React from 'react';
import { useAuth0 } from '../react-auth0-spa';
import Profile from './Profile';
import styled from 'styled-components';

const StyledNavBar = styled.div`
    width: 15rem;
    height: 5rem;
    border: 1px dotted orange;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;

    & > * {
        margin-right: 3rem;
    }
`;

const StyledButton = styled.button`
    background: none !important;
    border: none;
    padding: 0 !important;
    text-decoration: underline;
    cursor: pointer;
    margin-right: 1rem;

    a:visited {
        color: inherit;
    }

    a:hover {
        color: rgba(10, 90, 240, 1);
    }
`;

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <StyledNavBar>
            {isAuthenticated && (
                <span>
                    <Profile />
                </span>
            )}

            {!isAuthenticated && (
                <StyledButton onClick={() => loginWithRedirect({})}>
                    Log in
                </StyledButton>
            )}

            {isAuthenticated && (
                <StyledButton onClick={() => logout()}>Log out</StyledButton>
            )}
        </StyledNavBar>
    );
};

export default NavBar;
