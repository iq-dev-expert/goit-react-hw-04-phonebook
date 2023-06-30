import PropTypes from 'prop-types';
import { List } from './ContactList.styled';
import { Button } from '../../utils-style/Template.styled';

function ContactList({ contacts, onDeleteButtonClick }) {
  return (
    <List>
      {contacts.map(({ id, name, number }) => {
        return (
          <li key={id}>
            <p>
              {name}: {number}{' '}
            </p>
            <Button type="button" onClick={() => onDeleteButtonClick(id)}>
              Delete
            </Button>
          </li>
        );
      })}
    </List>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
};

export default ContactList;
