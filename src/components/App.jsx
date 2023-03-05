import { Component } from 'react';
import initialContacts from '../initialContacts.json';
import { nanoid } from 'nanoid';
import { Section } from 'components/Section/Section';
import { PhonebookForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { PhoneTitle } from './PhoneTitle/PhoneTitle';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    console.log(savedContacts);
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      this.setState({ contacts: parsedContacts });
      return;
    }
    this.setState({ contacts: initialContacts });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  // addContact = contact => {
  //   this.setState(({ contacts }) => ({
  //     contacts: [...contacts, contact],
  //   }));
  // };

  addContact = ({ name, number }) => {
    const contact = { id: nanoid(), name, number };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilterChange = event => {
    const { value } = event.currentTarget;

    this.setState({ filter: value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedValue = filter.toLowerCase().trim();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedValue)
    );
  };

  clearFilterField = () => {
    this.setState({ filter: '' });
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <>
        <PhoneTitle name="PhoneBook 3"></PhoneTitle>
        <Section title="Add new contacts">
          <PhonebookForm
            contacts={contacts}
            addContact={this.addContact}
          ></PhonebookForm>
        </Section>

        <Section title="Filter contacts">
          <Filter
            onChange={this.handleFilterChange}
            value={filter}
            onClick={this.clearFilterField}
          ></Filter>
        </Section>

        <Section title="Contact List">
          <ContactList
            contactList={this.getFilteredContacts()}
            onDelete={this.deleteContact}
          ></ContactList>
        </Section>
      </>
    );
  }
}
