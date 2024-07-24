import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

function Searched() {
  const location = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const getSearched = useCallback(async () => {
    const query = queryParams.get('query') || '';
    const time = queryParams.get('time') || '';
    const price = queryParams.get('price') || '';
    const calories = queryParams.get('calories') || '';

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}` +
        `&query=${query}` +
        `${time ? `&maxReadyTime=${time}` : ''}` +
        `${price ? `&maxPrice=${price}` : ''}` +
        `${calories ? `&maxCalories=${calories}` : ''}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const recipes = await response.json();
      setSearchedRecipes(recipes.results);
    } catch (error) {
      console.error('Failed to fetch searched recipes:', error);
    }
  }, [queryParams]);

  useEffect(() => {
    getSearched();
  }, [getSearched]);

  return (
    <Grid>
      {searchedRecipes.length > 0 ? (
        searchedRecipes.map((item) => (
          <Cart key={item.id}>
            <a href={`/recipe/${item.id}`}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
              <Details>
                {item.readyInMinutes && <p>Time: {item.readyInMinutes} mins</p>}
                {item.pricePerServing && <p>Price: ${item.pricePerServing.toFixed(2)}</p>}
                {item.calories && <p>Calories: {item.calories}</p>}
              </Details>
            </a>
          </Cart>
        ))
      ) : (
        <p>No results found</p>
      )}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Cart = styled.div`
  position: relative;

  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

const Details = styled.div`
  p {
    margin: 0.5rem 0;
    text-align: center;
    font-size: 0.9rem;
  }
`;

export default Searched;
