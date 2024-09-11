// src/memory.js
// import React from "react";
// import styled from "styled-components";
import "./Mcontainer.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const MContainer = ({ vector, content, content1 }) => {
  const [iluminarDirecciones, setIluminarDirecciones] = useState(false);
  const [iluminarDatos, setIluminarDatos] = useState(false);

  useEffect(() => {
    // Iluminar el elemento <p> cuando cambie el contenido
    setIluminarDirecciones(true);
    const timer = setTimeout(() => setIluminarDirecciones(false), 1000); // Remover la clase después de 1 segundo
    return () => clearTimeout(timer);
  }, [content]);
  useEffect(() => {
    // Iluminar el elemento <p> cuando cambie el contenido
    setIluminarDatos(true);
    const timer = setTimeout(() => setIluminarDatos(false), 1000); // Remover la clase después de 1 segundo
    return () => clearTimeout(timer);
  }, [content1]);

  MContainer.propTypes = {
    vector: PropTypes.array.isRequired,
    content: PropTypes.string.isRequired,
    content1: PropTypes.string.isRequired,
  };
  return (
    // <MemoryContainer>
    <div className="memory-container">
      <h4>MEMORIA</h4>
      <br />
      <br />

      <div className="content">
        <div>
          <p>
            R. direcciones: <br />
          </p>
          <p className={`data ${iluminarDirecciones ? "iluminar" : ""}`}>
            {content}
          </p>
        </div>
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
        <div>
          <p>
            R. datos: <br />
          </p>
          <p className={`data ${iluminarDatos ? "iluminar" : ""}`}>
            {content1}
          </p>
        </div>
      </div>
    </div>

    // </MemoryContainer>
  );
};

export default MContainer;
