import React, { Component } from 'react';
const axios = require('axios');



class Login extends Component {
    constructor() {
        super();
        axios.defaults.headers.common["Content-Type"] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json';

        // userService.logout();

        this.state = {
            email: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        console.error(e)
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {

        this.setState({ submitted: true });
        const { email, password } = this.state;

        let data = { email: this.state.email, password: this.state.password }
        axios.post(`http://localhost:8080/login`, data)
            .then(res => {
                if (res.status === 200) {
                    console.error("I am here", res)
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userid', res.data.user.id);
                    localStorage.setItem('username', res.data.user.name);
                    this.props.history.push('/dashboard')
                }

            })

        // stop here if form is invalid
        if (!(email && password)) {
            return;
        }

        this.setState({ loading: true });

    }

    render() {
        const { email, password, submitted, loading, error } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">

                <h2>Login</h2>
                <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                    <label htmlFor="email">email</label>
                    <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                    {submitted && !email &&
                        <div className="help-block">email is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                    {submitted && !password &&
                        <div className="help-block">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button onClick={this.handleSubmit} className="btn btn-primary" disabled={loading}>Login</button>
                </div>
                {error &&
                    <div className={'alert alert-danger'}>{error}</div>
                }
            </div>
        );
    }
}

export { Login };