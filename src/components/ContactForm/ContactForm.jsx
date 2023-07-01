import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from './ContactForm.styled';
import { Button } from '../../utils-style/Template.styled';

const ContactForm = ({ onFormSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onChange = e => {
    const inputName = e.target.name;
    const { value } = e.target;

    switch (inputName) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const onAddButtonClick = e => {
    e.preventDefault();

    onFormSubmit(name, number);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={onAddButtonClick}>
      <label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={onChange}
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={onChange}
        />
      </label>
      <Button type="submit">Add contact</Button>
    </Form>
  );
};

ContactForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
