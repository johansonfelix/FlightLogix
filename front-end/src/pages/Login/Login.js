import React, { useState } from 'react';
import { Fragment } from "react";
import PropTypes from 'prop-types';
import classes from './Login.module.css';



async function loginUser(credentials) {  
    const response = await fetch('https://localhost:8081/app/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)

    });

    if(!response.ok){
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

    const handleSubmit = async e => {
        e.preventDefault();
        setIsAuthenticating(true);
        setError(null);
        let token;
        try{
        token = await loginUser({
            email,
            password,
            setIsAuthenticating
        });
    }
    catch(error){
        setError(error.message);
        

    }
        setIsAuthenticating(false);
        if (token)
            setToken(token);
    }

    return (
        <Fragment>
             {!isAuthenticating && 
            <div className={classes.login_wrapper}>
               
                <h1>Login</h1>

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
                        <button type="submit">Submit</button>
                    </div>
                </form>

            </div>
}
{isAuthenticating && <p>Authenticating...</p>}
{!isAuthenticating && error && <p>{error}</p>}
        </Fragment>
    );
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}