import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import AppView from './AppView';
import AppList from './AppList';
import Footer from './Footer';
import styled from 'styled-components';

const StyledApp = styled.div`
    width: 50vw;
    height: 95vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    align-content: space-between;
`;

function App() {
    return (
        <StyledApp>
            <Router>
                <header>
                    <NavBar />
                </header>
                <Switch>
                    <Route path="/" exact component={AppList} />
                    <Route path="/:client_id" component={AppView} />
                </Switch>
                <Footer />
            </Router>
        </StyledApp>
    );
}

export default App;
