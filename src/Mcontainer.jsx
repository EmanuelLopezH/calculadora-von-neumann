// src/memory.js
import React from 'react';
import styled from 'styled-components';

// Definir el componente de la tarjeta con estilos
const MemoryContainer = styled.div`
  background-color: #2ecc71; /* Verde brillante */
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  max-width: 300px;
  margin: 20px auto;
  text-align: center;
`;

const MContainer = ({ vector, content }) => {
    return (
        <MemoryContainer>
            <h1>Memoria</h1>
            <p>{content}</p>
            <table>
                <thead>
                    <tr>
                        <th>Índice</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {vector.map((dato, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{dato}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </MemoryContainer>
    );
};

export default MContainer;