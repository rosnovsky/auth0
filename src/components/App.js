import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import AppView from './AppView';
import AppList from './AppList';
import Footer from './Footer';
import styled from 'styled-components';

// Overall application container styles
const StyledApp = styled.div`
    width: 50vw;
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
                {/* Router displays specific component depending on the url */}
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
