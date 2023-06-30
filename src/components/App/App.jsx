import React, { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import { save, load } from 'utils-js/storage';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import { ThemeProvider } from '@emotion/react';
import { theme } from 'utils-style/Theme';

const LS_KEY = 'phonebook-contacts';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    if (load(LS_KEY, [])) {
      this.setState({ contacts: load(LS_KEY) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      save(LS_KEY, this.state.contacts);
    }
  }

  onChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  onFormSubmit = ({ name, number }) => {
    if (this.isContactInPhonebook(name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const id = nanoid(16);

    this.setState(({ contacts }) => {
      return {
        contacts: [...contacts, { name, number, id }],
      };
    });
  };

  filterContacts = () => {
    const { filter, contacts } = this.state;

    const filterToLowerCase = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterToLowerCase)
    );
  };

  isContactInPhonebook = name => {
    return this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter, contacts } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Container>
          <h1>Phonebook</h1>
          <ContactForm onFormSubmit={this.onFormSubmit} />

          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.onChange} />
          {contacts.length ? (
            <ContactList
              contacts={this.filterContacts()}
              onDeleteButtonClick={this.deleteContact}
            />
          ) : null}
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
