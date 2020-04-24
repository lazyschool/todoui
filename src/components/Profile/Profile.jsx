import React, { Component } from 'react';
const axios = require('axios');


class Profile extends Component {
    constructor() {
        super();
        axios.defaults.headers.common["Content-Type"] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;

        this.state = {
            email: '',
            password: '',
            name: '',
            submitted: false,
            error: ''
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.back = this.back.bind(this);

    }

    back(e) {
        this.props.history.push('/dashboard')
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/user`)
            .then(res => {

                if (res.status === 200) {
                    this.setState({ email: res.data[0].email, name: res.data[0].name });
                }
            })
    }

    handleChangeName(e) {
        this.setState({ name: e });
    }

    handleChangeEmail(e) {
        this.setState({ email: e });
    }

    handleChangePassword(e) {
        this.setState({ password: e });
    }

    handleSubmit(e) {

        this.setState({ submitted: true });
        const data = { email: this.state.email, name: this.state.name, password: this.state.password }

        axios.put(`http://localhost:8080/user`, data)
            .then(res => {
                if (res.status === 200) {
                    this.props.history.push('/dashboard')
                }
            });
    }

    render() {
        return (
            <div>
                <h3 className="mr-2 mb-2">You can change your name, email and password here.</h3>
                <div className="col-md-6 col-md-offset-3">

                    <div className='form-group'>
                        <label>Name</label>
                        <input type="text" className="form-control" value={this.state.name} onChange={(e) => this.handleChangeName(e.target.value)} />
                    </div>

                    <div className='form-group'>
                        <label>Email</label>
                        <input type="text" className="form-control" value={this.state.email} onChange={(e) => this.handleChangeEmail(e.target.value)} />

                    </div>

                    <div className='form-group'>
                        <label>Password</label>
                        <input type="password" className="form-control" value={this.state.password} onChange={(e) => this.handleChangePassword(e.target.value)} />

                    </div>

                    <div className="form-group">
                        <button onClick={this.handleSubmit} className="btn btn-primary mr-2" >Save</button>
                        <button onClick={this.back} className="btn btn-primary ml-2" >Back</button>

                    </div>
                </div>
            </div>

        );
    }
}

export { Profile };