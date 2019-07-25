import React, { Component } from 'react';

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "name": {
                "first": "",
                "last": ""
                },
            "email": "",
            "phone": "",
            "search": ""
            };
        this.handleChange = this.handleChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    handleFilterChange(evt) {
        this.props.filterContacts(evt.target.value.trim());
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.addContact(this.state);
        this.setState({
            "name": {
                "first": "",
                "last": ""
                },
            "email": "",
            "phone": "",
            });
    }

    handleNameChange(evt) {
        let inputName = evt.target.name;
        let inputVal = evt.target.value;
        this.setState(state => {
            let copy = { ...state };
            copy.name[inputName] = inputVal;
            return { ...copy };
        });
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    render() {
        return <div>
            <h1>Contacts component</h1>
            <input type="text" name="search" placeholder="Search" onChange={this.handleFilterChange}/>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="firstname">Firstname: </label>
                <input type="text" name="first" id="firstname" 
                value={this.state.name.first} onChange={this.handleNameChange} required/>
                <label htmlFor="lastname">Lastname: </label>
                <input type="text" name="last" id="lastname" 
                value={this.state.name.last} onChange={this.handleNameChange}/>
                <label htmlFor="phone">Phone: </label>
                <input type="text" name="phone" id="phone" 
                value={this.state.phone} onChange={this.handleChange} required/>
                <label htmlFor="firstemailname">Email: </label>
                <input type="text" name="email" id="email" 
                value={this.state.email} onChange={this.handleChange}/>
                <button>Add Contact</button>
            </form>
            <ul>
                { this.props.contacts.map( contact => {
                    return <li>{ contact.name.first }</li>
                }) }
            </ul>
        </div>;
    }
}

export default Contacts;