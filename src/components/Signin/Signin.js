import React from 'react';

const SignIn = (props) => {
    return (
        <div className="SignIn__container">
            <div className="SignIn__container-form">
                <h1 className="SignIn__container-form-title">Sign In</h1>
                <input 
                    className="SignIn__container-form-input" 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    required/>
                <input 
                    className="SignIn__container-form-input" 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    required/>
                <div className="SignIn__container-form-signIn">
                    <button className="SignIn__container-form-signIn-button-login" type="submit" onClick={() => props.onRouteChange('home')}>Login</button>
                    <p className="SignIn__container-form-signIn-button-register" onClick={() => props.onRouteChange('register')}>Register</p>
                </div>
            </div>
        </div>
    );
}

export default SignIn;