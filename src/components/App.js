import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import AppView from './AppView';
import AppList from './AppList';

function App() {
    return (
        <div className="App">
            <Router>
                <header>
                    <NavBar />
                </header>
                <Switch>
                    <Route path="/" exact component={AppList} />
                    <Route path="/:client_id" component={AppView} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
