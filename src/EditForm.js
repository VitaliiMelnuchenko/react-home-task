import React, { Component } from 'react';

class EditForm extends Component {
    constructor(props) {
        super(props)
        this.state = { ...this.props.curCont };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.updateContact(this.state);
        this.props.toggleFormDis();
    }

    onDelete() {
        this.props.deleteContact(this.state);
        this.props.togglePage();
    }

    render() {
        return <div>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="firstname">Firstname: </label>
                <input type="text" name="first" id="firstname" 
                value={this.state.first} onChange={this.handleChange} disabled={!this.props.isFormActiv} required/>
                <label htmlFor="lastname">Lastname: </label>
                <input type="text" name="last" id="lastname" 
                value={this.state.last} onChange={this.handleChange} disabled={!this.props.isFormActiv}/>
                <label htmlFor="phone">Phone: </label>
                <input type="text" name="phone" id="phone" 
                value={this.state.phone} onChange={this.handleChange} disabled={!this.props.isFormActiv} required/>
                <label htmlFor="firstemailname">Email: </label>
                <input type="text" name="email" id="email" 
                value={this.state.email} onChange={this.handleChange} disabled={!this.props.isFormActiv}/>
                <a onClick={ this.props.toggleFormDis }>Edit</a>
                { this.props.isFormActiv ? <button>Save</button> : null }
                <a onClick = { this.props.togglePage }>Back</a><a onClick = {this.onDelete}>delete contact</a>
            </form>
        </div>
    }
}

export default EditForm;