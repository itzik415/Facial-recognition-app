import React, {Component } from 'react';
// import { loading } from 'os';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3001/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password:this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user) {
                   this.props.loadUser(user)
                    this.props.onRouteChange('signin');
                }
            })
    }

    render () {
        return (
            <div className="SignIn__container">
                <div className="SignIn__container-form">
                    <h1 className="SignIn__container-form-title">Register</h1>
                    <input 
                        className="SignIn__container-form-input" 
                        type="text" 
                        name="name" 
                        placeholder="Full Name"
                        onChange={this.onNameChange}
                        required/>
                    <input 
                        className="SignIn__container-form-input" 
                        type="email" 
                        name="email" 
                        placeholder="Email"
                        onChange={this.onEmailChange}
                        required/>
                    <input 
                        className="SignIn__container-form-input" 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        onChange={this.onPasswordChange}
                        required/>
                    <div className="SignIn__container-form-signIn">
                        <button className="SignIn__container-form-signIn-button-login" type="submit" onClick={this.onSubmitSignIn}>Sign Up</button>
                        <p className="SignIn__container-form-signIn-button-register" onClick={() => this.props.onRouteChange('signin')}>back</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;