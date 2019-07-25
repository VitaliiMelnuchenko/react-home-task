import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Contacts from './Contacts';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          contacts: [],
          filteredContacts: []
      };
      this.addContact = this.addContact.bind(this);
      this.filterContacts = this.filterContacts.bind(this);
  }

  addContact(contact) {
    this.setState(state => ({
      contacts: [...state.contacts, contact]
    }));
  }

  filterContacts(name){
    let updatedList = [ ...this.state.contacts ];
    console.log(name);
    if (name) {
      updatedList = updatedList.filter(function(contact){
        return contact.name.first.toLowerCase().search(
          name.toLowerCase()) !== -1;
      });
      this.setState({filteredContacts: updatedList});
    } else {
      this.setState({filteredContacts: updatedList});
    }
  }

  componentDidMount() {
      fetch('https://randomuser.me/api?results=10&inc=name,phone,email,picture')
      .then(response => response.json())
      .then(data => this.setState({ contacts: data.results, filteredContacts: data.results }) );
  }

  render() {
      return <div>
        <Contacts addContact = { this.addContact } contacts = { this.state.filteredContacts } filterContacts = {this.filterContacts}/>
      </div>;    
  }
}

export default App;
