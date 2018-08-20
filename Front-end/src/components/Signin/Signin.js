import React, {Component} from 'react';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password:this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user.id){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
    }
        

    render() {
        return (
            <div className="SignIn__container">
                <div className="SignIn__container-form">
                    <h1 className="SignIn__container-form-title">Sign In</h1>
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
                        <button className="SignIn__container-form-signIn-button-login" type="submit" onClick={this.onSubmitSignIn}>Login</button>
                        <p className="SignIn__container-form-signIn-button-register" onClick={() => this.props.onRouteChange('register')}>Register</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;