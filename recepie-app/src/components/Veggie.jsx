import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Veggie() {
  const [veggie, setVeggie] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");
    if (check) {
      console.log("Using cached data");
      setVeggie(JSON.parse(check));
      setLoading(false); // Set loading to false after fetching data
    } else {
      try {
        console.log("Fetching data from API");
        const response = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian&tags=vegetarian`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("API Data:", data);
        localStorage.setItem("veggie", JSON.stringify(data.recipes)); // Store the fetched data in local storage for caching purposes
        setVeggie(data.recipes);
      } catch (err) {
        setError("Failed to fetch recipes");
        console.error("Fetch error:", err); // Log the error to the console
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    }
  };

  return (
    <Wrapper>
      <h3>Veggie</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Splide
          options={{
            perPage: 3,
            arrows: true,
            pagination: false,
            drag: "free",
            gap: "3rem",
          }}
        >
          {veggie.map((recipe) => (
            <SplideSlide key={recipe.id}>
              <Card>
                <Link to={"/recipe/"+ recipe.id}>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
                <Gradient />
                </Link>
              </Card>
            </SplideSlide>
          ))}
        </Splide>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
  max-width: 1200px; /* Constrain width for better responsiveness */
  margin-left: auto;
  margin-right: auto;
`;

const Card = styled.div`
  min-height: 20rem; /* Adjust height */
  max-height: 25rem; /* Constrain height */
  display: flex;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  height: 100%;

  img {
    border-radius: 2rem;
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0%);
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem; /* Adjust the font size */
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgb(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Veggie;
