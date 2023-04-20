import PropTypes from 'prop-types';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import {
  StyledSearchButton,
  StyledSearchForm,
  StyledSearchInput,
  StyledSearchbar,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setInputValue(value.toLowerCase().trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <StyledSearchbar>
      <StyledSearchForm onSubmit={handleSubmit}>
        <StyledSearchButton type="submit">
          <FiSearch />
        </StyledSearchButton>

        <StyledSearchInput
          value={inputValue}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </StyledSearchForm>
    </StyledSearchbar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
