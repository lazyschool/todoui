import React from 'react';
const axios = require('axios');



class ListElement extends React.Component {
    constructor(props) {
        super(props);
        axios.defaults.headers.common["Content-Type"] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token')}`;
        this.state = {
            chkbox: this.props.data.isCompleted == 1 ? true : false,
            isEditing: false,
            id: this.props.data.id,
            date: this.props.data.date,
            word: String(this.props.data.title),
            newa: String(this.props.data.title),
        };

        this.handleChangeChk = this.handleChangeChk.bind(this);
        this.startEditing = this.startEditing.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }



    save(e) {
        console.error("hello")
        axios.put(`http://localhost:8080/task/${this.state.id}`, { title: this.state.newa })
            .then(res => {
                this.setState({
                    word: this.state.newa,
                });
            }).catch(error => {
                console.error(error);
            });
        this.setState({ isEditing: false });
    }

    delete(e) {
        axios.delete(`http://localhost:8080/task/${this.state.id}`, { title: this.state.newa })
            .then(res => {
            }).catch(error => {
                console.error(error);
            });
    }

    startEditing(e) {
        this.setState({ isEditing: true });
    }

    handleChangeChk(e) {
        console.log("AADADA ", e.target)
        const { value } = e.target;
        axios.put(`http://localhost:8080/taskstatus/${this.state.id}`, { status: !this.state.chkbox })
            .then(res => {
                this.setState({
                    chkbox: !this.state.chkbox,
                });

            }).catch(error => {
                console.error(error);
            });
        this.setState({ chkbox: value });
    }

    handleChange(value) {
        this.setState({
            newa: value
        });
    }

    render() {
        return (
            <div>
                <input className="btn btn-primary btn-sm col-sm-1 mr-2 d-inline-block" type="checkbox" defaultChecked={this.state.chkbox} onChange={this.handleChangeChk} />
                {!this.state.isEditing && <span className="col-sm-4 mr-2 mb-2 d-inline-block">{this.state.word}</span>}
                <span className="mr-2 d-inline-block">{new Date(this.state.date).toJSON().slice(0, 10).replace(/-/g, '/')}</span>
                {!this.state.isEditing && <button className="btn btn-primary btn-sm col-sm-2 mr-2 d-inline-block" onClick={this.startEditing}> Edit</button>}
                {this.state.isEditing && <input type="text" className="col-sm-4 mr-2 d-inline-block" value={this.state.newa} onChange={(e) => this.handleChange(e.target.value)} />}
                {this.state.isEditing && <button className="btn btn-primary btn-sm col-sm-2 mr-2 d-inline-block" onClick={this.save}> Save</button>}
                <button className="btn btn-primary btn-sm col-sm-2 mr-2 d-inline-block" onClick={this.delete}> Delete</button>
                

            </div>
        );
    }
}

export { ListElement };