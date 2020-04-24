import React, { Component } from 'react';
import { ListElement } from '../ListElement';
const axios = require('axios');
const appConstants = require('../../utils/utils.js');




class Dashboard extends Component {
    constructor() {
        super();
        axios.defaults.headers.common["Content-Type"] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
        this.state = {
            isNew: false,
            word: String('ad'),
            newa: String(''),
            list: []
        }

        this.startEditing = this.startEditing.bind(this);
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openProfile = this.openProfile.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/tasks`)
            .then(res => {
                this.setState({ list: res.data });
            })
    }

    openProfile(e) {
        this.props.history.push('/profile')
    }

    logout(e) {
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        localStorage.removeItem('username');
        this.props.history.push('/login')
    }

    save(e) {
        axios.post(`http://localhost:8080/task`, { title: this.state.newa })
            .then(res => {

            }).catch(error => {
                console.log(error);

            })
        this.state.list.push({ title: this.state.newa, isCompleted: 0, date: new Date() })
        this.setState({ isNew: false , newa: ''});

    }

    startEditing(e) {
        this.setState({ isNew: true });
    }

    handleChange(value) {
        this.setState({
            newa: value
        });
    }

    render() {
        return (
            <div style={{ textAlign: "left" }}>
                <div>
                    <h3 className="mr-2 mb-2">Hello {localStorage.getItem('username')}, Here is your to do list</h3>
                    <div className="col-sm-12 mr-2">

                        {!this.state.isNew && <button className="btn btn-secondary btn-sm col-sm-2 mr-2" onClick={this.startEditing}>New</button>}

                        {this.state.isNew && <input className="col-sm-4 mr-2" type="text" value={this.state.newa} onChange={(e) => this.handleChange(e.target.value)} />}

                        {this.state.isNew && <button className="btn btn-primary btn-sm col-sm-2 mr-2" onClick={this.save}>Save</button>}

                        <button className="btn btn-primary btn-sm col-sm-2 mr-2" onClick={this.openProfile}>Profile</button>

                        <button className="btn btn-primary btn-sm col-sm-2 mr-2" onClick={this.logout}>Logout</button>
                    </div>

                    <div className="mr-4 ml-4 mx-4 my-4">
                        {this.state.list.map(listItem => <ListElement key={listItem.title} data={listItem}></ListElement>)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export { Dashboard };