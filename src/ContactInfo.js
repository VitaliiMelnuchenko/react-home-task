import React, { Component } from 'react';
import EditForm from './EditForm';

class ContactInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curentContact: this.props.target,
            isFormActiv: false 
        };
        this.toggleFormDis = this.toggleFormDis.bind(this);
    }

    toggleFormDis() {
        this.setState({ isFormActiv: !this.state.isFormActiv });
    }

    render() {
        return <div>
            <EditForm curCont = { this.state.curentContact } 
                updateContact = { this.props.updateContact }
                deleteContact = { this.props.deleteContact }
                isFormActiv = { this.state.isFormActiv }
                toggleFormDis = { this.toggleFormDis }
                togglePage = { this.props.togglePage }
            />
        </div>
    }
}

export default ContactInfo;