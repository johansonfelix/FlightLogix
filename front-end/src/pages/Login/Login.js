import React, { useState } from 'react';
import { Fragment } from "react";
import PropTypes from 'prop-types';
import classes from './Login.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Sidebar from '../../components/SideDrawer/SideDrawer';

async function loginUser(credentials) {
    const response = await fetch('https://localhost:8081/app/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)

    });

    if (!response.ok) {
        throw new Error('Something went wrong here');
    }
    const data = await response.json();

    return data;
}


export default function Login({ setToken }) {



    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [error, setError] = useState(null);
    const [modalShow, setModalShow] = useState(false);


    const handleSubmit = async e => {
        e.preventDefault();
        setIsAuthenticating(true);
        setError(null);
        let token;
        try {
            token = await loginUser({
                email,
                password,
                setIsAuthenticating
            });
        }
        catch (error) {
            setError(error.message);


        }
        setIsAuthenticating(false);
        if (token)
            setToken(token);
    }

    const RegistrationModal = props => {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sign Up
                        
        </Modal.Title>
        
                </Modal.Header>
                <Modal.Body>
                <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );


    }

    return (
        <Fragment>
            <Sidebar/>
            {!isAuthenticating &&
                <div className={classes.login_wrapper}>

                    <h1>Login</h1>
                    {!isAuthenticating && error && <p>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <label>
                            <p>Email</p>
                            <input type="text" onChange={e => setEmail(e.target.value)} />
                        </label>
                        <label>
                            <p>Password</p>
                            <input type="password" onChange={e => setPassword(e.target.value)} />
                        </label>
                        <div>
                            <Button type="submit">Log in</Button>
                            <Button onClick={() => setModalShow(true)}>Create New Account</Button>
                        </div>
                    </form>

                </div>
            }

            {isAuthenticating && <p>Authenticating...</p>}



            <RegistrationModal 
            show={modalShow}
            onHide={() => setModalShow(false)} />

        </Fragment>
    );
};

Login.propTypes = {
                setToken: PropTypes.func.isRequired
}