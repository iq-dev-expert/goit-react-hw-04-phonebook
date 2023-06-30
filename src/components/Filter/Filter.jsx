import PropTypes from 'prop-types';
import { Label } from './Filter.styled';

function Filter({ filter, onChange }) {
  return (
    <Label>
      Find contacts by name
      <input type="text" name="filter" value={filter} onChange={onChange} />
    </Label>
  );
}

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
