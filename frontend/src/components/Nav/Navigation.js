import React from "react";
import Nav from "react-bootstrap/Nav";
import "../Layout/Layout.css"
import { useHistory } from "react-router-dom";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function Navigation() {

    const history = useHistory();

    function logout() {
        localStorage.clear();
        history.push("/login");
    }

    return(
        <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Item className="border-bottom pb-2  pt-2">
                    <Link to="/">Home</Link>
                </Nav.Item>
                <Nav.Item className="border-bottom  pb-2  pt-2">
                    <Link to="/track">Track</Link>
                </Nav.Item>
                <Nav.Item className="border-bottom">
                    <Nav.Link onClick={logout} href="/login" className="text-danger">Logout</Nav.Link>
                </Nav.Item>
        </Nav>
    );
}

export default Navigation;