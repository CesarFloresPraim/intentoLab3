import React, {useEffect} from 'react';
import './App.css';
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

function App() {

  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/" render={({}) => {
                    let username = localStorage.getItem('usernameLogged');
                    let id = localStorage.getItem('idLogged');

                    if (username && id) {
                        return <Layout />;
                    }
                    return <Redirect to='/login'/>;
                }}>
                </Route>
                <Route path="*">
                    <Login />
                </Route>
            </Switch>
        </Router>

    </div>
  );
}

export default App;
