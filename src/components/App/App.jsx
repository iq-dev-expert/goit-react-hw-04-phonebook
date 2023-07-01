import { useState, useEffect } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import { save, load } from 'utils-js/storage';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import { ThemeProvider } from '@emotion/react';
import { theme } from 'utils-style/Theme';

const LS_KEY = 'phonebook-contacts';

function App() {
  const [contacts, setContacts] = useState(() => {
    return load(LS_KEY, []);
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    save(LS_KEY, contacts);
  }, [contacts]);

  const isContactInPhonebook = name => {
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const onFormSubmit = (name, number) => {
    if (isContactInPhonebook(name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const id = nanoid(16);
    setContacts(prevState => [...prevState, { name, number, id }]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const onChange = e => {
    setFilter(e.target.value);
  };

  const filterContacts = () => {
    const filterToLowerCase = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterToLowerCase)
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onFormSubmit={onFormSubmit} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={onChange} />
        {contacts.length ? (
          <ContactList
            contacts={filterContacts()}
            onDeleteButtonClick={deleteContact}
          />
        ) : null}
      </Container>
    </ThemeProvider>
  );
}

export default App;
