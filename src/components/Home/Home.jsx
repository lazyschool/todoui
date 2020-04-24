import React, { Component } from 'react';

class Home extends Component {
    constructor() {
        super();
        this.signin = this.signin.bind(this);
        this.signup = this.signup.bind(this);
    }

    signin(e) {
        this.props.history.push('/login')

    }

    signup(e) {
        this.props.history.push('/signup')

    }

    render() {
        return (
            <div>
                <button onClick={this.signin} className="btn btn-primary mr-2" >Login</button>
                <button onClick={this.signup} className="btn btn-primary ml-2" >Sign Up</button>
            </div>
        );
    }
}

export default Home;