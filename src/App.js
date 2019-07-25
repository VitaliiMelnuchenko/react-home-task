import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Contacts from './Contacts';
import ContactInfo from './ContactInfo';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          contacts: [],
          filteredContacts: [],
          details: false,
          detailsTarget: {}
      };
      this.addContact = this.addContact.bind(this);
      this.filterContacts = this.filterContacts.bind(this);
      this.togglePage = this.togglePage.bind(this);
      this.updateContact = this.updateContact.bind(this);
      this.deleteContact = this.deleteContact.bind(this);
      this.findContactIndex = this.findContactIndex.bind(this);
  }

  addContact(contact) {
    contact.id = '_' + Math.random().toString(36).substr(2, 9);
    this.setState(state => ({
      contacts: [...state.contacts, contact]
    }));
  }

  updateContact(contact) {
    let foundIndex;
    for (let i = 0; i < this.state.contacts.length; i++) {
      if (contact.id === this.state.contacts[i].id) {
        foundIndex = i;
      }
    }
    this.setState(state => {
      const copy = [...state.contacts.slice(0, foundIndex), contact, ...state.contacts.slice(++foundIndex)];
      return {contacts: [...copy]};
    });
  }

  deleteContact(contact) {
    let foundIndex;
    for (let i = 0; i < this.state.contacts.length; i++) {
      if (contact.id === this.state.contacts[i].id) {
        foundIndex = i;
      }
    }
    this.setState(state => ({
      contacts: [...state.contacts.slice(0, foundIndex), ...state.contacts.slice(++foundIndex)]
    }));
  }

  findContactIndex(contact) {
    console.log(contact)
    let foundIndex;
    for (let i = 0; i < this.state.contacts.length; i++) {
      if (contact.id === this.state.contacts[i].id) {
        foundIndex = i;
      }
    }
    return foundIndex
  }

  filterContacts(name){
    let updatedList = [ ...this.state.contacts ];
    console.log(name);
    if (name) {
      updatedList = updatedList.filter(function(contact){
        return contact.first.toLowerCase().search(
          name.toLowerCase()) !== -1;
      });
      this.setState({filteredContacts: updatedList});
    } else {
      /*this.setState(state => {
        console.log(state.contact)
        const copy = [state.contacts];
        return { filteredContacts: [...copy] };
      });*/
      this.setState({filteredContacts: updatedList});
    }
  }

  togglePage(target) {
    target = target || "";
    let selectedContact = this.state.contacts.filter(contact => {
      return contact.id === target;
    })[0];
    this.setState({details: !this.state.details, detailsTarget: selectedContact});
  }

  componentDidMount() {
      fetch('https://randomuser.me/api?results=10&inc=name,phone,email,picture')
      .then(response => response.json())
      .then(data => {
        const mappedData = data.results.map(contact => {
          return {
            'id': '_' + Math.random().toString(36).substr(2, 9),
            ...contact.name, 
            'email': contact.email, 
            'phone': contact.phone,
            ...contact.picture
          }  
        });
        console.log(mappedData);
        this.setState({ contacts: mappedData, filteredContacts: mappedData }) 
      });
  }

  render() {
      return <div>
        { !this.state.details ?
        <Contacts addContact = { this.addContact } 
                  contacts = { this.state.filteredContacts } 
                  filterContacts = { this.filterContacts }
                  togglePage = { this.togglePage }/>
        : 
        <ContactInfo contacts = { this.state.filteredContacts }
                  target = { this.state.detailsTarget }
                  updateContact = { this.updateContact }
                  deleteContact = { this.deleteContact }
                  togglePage = { this.togglePage }
                  filterContacts = { this.filterContacts }
        />}
      </div>;    
  }
}

export default App;
