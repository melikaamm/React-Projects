import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");

    // Use useCallback to memoize fetchDetails function
    const fetchDetails = useCallback(async () => {
        try {
            const response = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const detailRecipe = await response.json();
            setDetails(detailRecipe);
        } catch (error) {
            console.error('Failed to fetch recipe details:', error);
        }
    }, [params.name]); // Dependency is params.name

    useEffect(() => {
        fetchDetails();
    }, [fetchDetails]); // Dependency is fetchDetails

    return (
        <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} alt={details.title} />
                <TabContainer>
                    <Button 
                        className={activeTab === 'instructions' ? 'active' : ''} 
                        onClick={() => setActiveTab("instructions")}
                    >
                        Instructions
                    </Button>
                    <Button 
                        className={activeTab === 'ingredients' ? 'active' : ''} 
                        onClick={() => setActiveTab("ingredients")}
                    >
                        Ingredients
                    </Button>
                </TabContainer>
                <Content>
                    {activeTab === 'instructions' && (
                        <div>
                            <h3>Instructions:</h3>
                            <Instructions dangerouslySetInnerHTML={{ __html: details.instructions }} />
                            <Details>
                                {details.readyInMinutes && <p><strong>Time:</strong> {details.readyInMinutes} mins</p>}
                                {details.pricePerServing && <p><strong>Price:</strong> ${details.pricePerServing.toFixed(2)}</p>}
                                {details.nutrition && details.nutrition.nutrients.find(n => n.name === 'Calories') && (
                                  <p><strong>Calories:</strong> {details.nutrition.nutrients.find(n => n.name === 'Calories').amount} kcal</p>
                                )}
                            </Details>
                        </div>
                    )}
                    {activeTab === 'ingredients' && (
                        <Ingredients>
                            <h3>Ingredients:</h3>
                            <ol>
                                {details.extendedIngredients?.map((ingredient, index) => (
                                    <li key={ingredient.id}>{ingredient.original}</li>
                                ))}
                            </ol>
                        </Ingredients>
                    )}
                </Content>
            </div>
        </DetailWrapper>
    );
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-bottom: 2rem;
    font-size: 2rem;
    color: #313131;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 1rem;
    margin-bottom: 2rem;
    border: 3px solid #f5f5f5;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #fff;
  background: linear-gradient(35deg, #494949, #313131);
  border: 2px solid #313131;
  margin-right: 1rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background 0.3s ease, color 0.3s ease;

  &.active {
    background: #606060;
    color: #fff;
  }

  &:hover {
    background: #606060;
    color: #fff;
  }
`;

const Content = styled.div`
  max-width: 800px;
  width: 100%;
  padding: 0 1rem;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-top: 2rem;

  h3 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: #313131;
  }
`;

const Instructions = styled.div`
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Details = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;

  p {
    margin: 0.5rem 0;
    font-weight: bold;
    color: #313131;
  }
`;

const Ingredients = styled.div`
  margin-top: 2rem;

  h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: #313131;
  }

  ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin: 0; /* Remove default margin for cleaner spacing */
  }

  li {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
`;

export default Recipe;
