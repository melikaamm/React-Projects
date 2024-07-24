import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

function Cuisine() {
    const [cuisine, setCuisine] = useState([]);
    let params = useParams();

    const getCuisine = async (name) => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const recipes = await response.json();
            setCuisine(recipes.results);
        } catch (error) {
            console.error('Failed to fetch cuisine data:', error);
        }
    };

    useEffect(() => {
        if (params.type) {
            getCuisine(params.type);
        }
    }, [params.type]);

    return (
        <Grid>
            {cuisine.map((item) => (
                <Cart key={item.id}>
                    <Link to={`/recipe/${item.id}`}>
                        <motion.img
                            src={item.image}
                            alt={item.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        />
                        <h4>{item.title}</h4>
                    </Link>
                </Cart>
            ))}
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

export default Cuisine;
