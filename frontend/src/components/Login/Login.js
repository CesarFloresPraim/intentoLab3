import React from "react";
import './Login.css';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ApiService from "../../services/ApiService";
import FormControl from "react-bootstrap/FormControl";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Login() {

    const history = useHistory();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleUsername(e) {
        let username = e.target.value;
        setUsername(username);
    }

    function handlePassword(e) {
        let password = e.target.value;
        setPassword(password);
    }

    function log() {
        async function logUser() {
            const response = await ApiService.logUser(username, password);
            if (response.data) {
                localStorage.setItem(
                    'usernameLogged',
                    response.data['username']
                );
                localStorage.setItem(
                    'idLogged',
                    response.data['id']
                );
                history.push("/");
            }
        }
        logUser();
    }

    return (
        <div className="full-height background-blue align-middle">
            <div className="form50 p-5">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control  onChange={e => handleUsername(e)} type="text" placeholder="Enter username" value={username}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control  onChange={e => handlePassword(e)} type="password" placeholder="Password" value={password}/>
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={log}>
                        Submit
                    </Button>
                </Form>
            </div>

            <br/>
        </div>

    );
}

export default Login;