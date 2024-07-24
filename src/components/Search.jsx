import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

function Search() {
  const [query, setQuery] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [calories, setCalories] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (query) {
      // Construct query string with filters
      const queryString = new URLSearchParams({
        query,
        time,
        price,
        calories,
      }).toString();
      navigate(`/searched?${queryString}`);
    }
  };

  return (
    <FormStyle onSubmit={handleSearch}>
      <FaSearch />
      <input
        type="text"
        placeholder="Search for recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max time (mins)"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <PriceWrapper>
        <DollarSign>$</DollarSign>
        <PriceInput
          type="number"
          placeholder="Max price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </PriceWrapper>
      <input
        type="number"
        placeholder="Max calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />
      <button type="submit">Search</button>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input, button {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
    padding: 1rem;
    border-radius: 1rem;
    outline: none;
    flex: 1;
  }

  button {
    color: #313131;
    background: white;
    border: 2px solid black;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background: #606060;
    }
  }

  svg {
    color: white;
  }
`;

const PriceWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex; /* Ensure the wrapper takes up available space */
`;

const DollarSign = styled.span`
  position: absolute;
  top: 50%;
  left: 1rem; /* Adjust to align properly */
  transform: translateY(-50%);
  color: white;
  font-size: 1rem;
`;

const PriceInput = styled.input`
  padding-left: 3rem; /* Make space for the dollar sign */
  flex: 1; /* Ensure the input takes up the available space */
`;

export default Search;
