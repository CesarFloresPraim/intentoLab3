import React from "react";
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "../Nav/Navigation";
import "./Layout.css"
import Cashflow from "../Cashflow/Cashflow";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function Layout() {
    return(
        <Container fluid className="full-height">
            <Router>
                <Row className="full-height">
                    <Col xs={12} md={2} className="border-right full-height bg-light">
                        <Navigation></Navigation>
                    </Col>
                    <Col xs={12} md={10}>
                        <Switch>
                            <Route path="/track">
                                <Cashflow />
                            </Route>
                            <Route path="/">
                                <p>Hola Home!</p>
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Router>
        </Container>
    );
}

export default Layout;