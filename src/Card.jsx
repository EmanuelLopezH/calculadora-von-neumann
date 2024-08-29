// src/Card.js
import React from 'react';
import styled from 'styled-components';

// Definir el componente de la tarjeta con estilos
const CardContainer = styled.div`
  background-color: #2ecc71; /* Verde brillante */
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  max-width: 300px;
  margin: 20px auto;
  text-align: center;
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 1.5em;d
`;

const CardContent = styled.p`
  font-size: 1em;
  margin: 10px 0;
`;

const Card = ({ title, content }) => {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardContent>{content}</CardContent>
    </CardContainer>
  );
};

export default Card;