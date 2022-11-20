import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { selectFilter } from 'redux/selectors';
import { nanoid } from 'nanoid';
import { StyledFilter, FilterLabel, FilterInput } from './Filter.styled';

const filterId = nanoid();

const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const onFilterChange = e =>
    dispatch(setFilter(e.currentTarget.value.toLowerCase().trim()));

  return (
    <StyledFilter>
      <FilterLabel htmlFor={filterId}>Find contacts by name</FilterLabel>
      <FilterInput
        type="text"
        name="filter"
        id={filterId}
        value={filter}
        onChange={onFilterChange}
        placeholder="Enter name"
        required
      />
    </StyledFilter>
  );
};

export default Filter;
