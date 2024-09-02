import { useState } from "react";
import "./App.css";
import Card from "./Card.jsx";
import { Memoria } from "./memoria.js";
import { Alu } from "./ALU.js";
import { UnidadControl } from "./UnidadControl.js";

function App() {
  // ((2 ^ 2) + 2) ^ 2 = 36
  const memoria = new Memoria();
  const alu = new Alu();
  const unidadControl = new UnidadControl();
  let opActual = null;

  do {
    memoria.registroDirecciones = unidadControl.contadorPrograma;
    memoria.registroDatos = memoria.contenido[memoria.registroDirecciones];
    unidadControl.registroInstrucciones = memoria.registroDatos;
    const op = unidadControl.decode();
    unidadControl.contadorPrograma += 1;
    opActual = op.opNombre
    console.log(op)
  } while (opActual != "finalizar");



  return (
    <>
      <div>
        <h1>La suprema calculadora de Von Neumann</h1>
        <Card
          title="Unidad de control"
          content={`contador de programa: ${unidadControl.contadorPrograma}. registro de instrucciones: ${unidadControl.registroInstrucciones}. decodificador: {suma}`}
        ></Card>
        <Card
          title="Unidad aritmético lógica (ALU) "
          content={`acumulador: ${alu.acumulador}. registro de entrada: ${alu.registroEntrada}.`}
        ></Card>

        <Card
          title="Memoria"
          content={`registro direcciones: ${memoria.registroDirecciones}. registro datos:${memoria.registroDatos}. contenido de la memoria ${memoria.contenido}`}
        ></Card>
      </div>

      <div className="card"></div>
      <button onClick={() => console.log("yeah")}> siguiente</button>
    </>
  );
}

export default App;
