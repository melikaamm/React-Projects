import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';

const TelegramButton = () => {
  return (
    <Button href="https://t.me/c/1212527243/17045" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faTelegram} />
    </Button>
  );
};

const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: #0088cc;
  color: white;
  border-radius: 50%;
  text-decoration: none;
  font-size: 2rem;
  transition: background 0.3s ease;
  position: fixed; /* Fixed positioning */
  top: 20px; /* Distance from the top */
  right: 20px; /* Distance from the right */
  z-index: 1000; /* Ensure it's on top of other elements */

  &:hover {
    background: #006994;
  }
`;

export default TelegramButton;
