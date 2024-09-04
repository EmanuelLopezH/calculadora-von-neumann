import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card.jsx";
import { Memoria } from "./vonNeumannArchitecture/memoria.js";
import { Alu } from "./vonNeumannArchitecture/ALU.js";
import { UnidadControl } from "./vonNeumannArchitecture/UnidadControl.js";
//fetch decode and execute
function App() {
  // ((2 ^ 2) + 2) ^ 2 = 36
  //const unidadControl = new UnidadControl();
  const [unidadControl, setUnidadControl] = useState(new UnidadControl());
  const [memoria, setMemoria] = useState(new Memoria());
  const [alu, setAlu] = useState(new Alu());
  const [op, setOp] = useState();
  const [contador, setContador] = useState(0);
  const [siguiente, setSiguiente] = useState(true);


  useEffect(() => {
    console.log(`case ${contador}`)
    switch (contador) {
      case 0:
        setMemoria(() => {
          return ({ ...memoria, registroDirecciones: unidadControl.contadorPrograma })
        })
        setContador((contador + 1) % 8)
        break

      case 1:
        setUnidadControl(prevObj => {
          const nuevoObj = Object.create(Object.getPrototypeOf(prevObj))
          return Object.assign(nuevoObj, prevObj, { contadorPrograma: prevObj.contadorPrograma + 1 })
        })
        setContador((contador + 1) % 8)
        break

      case 2:
        setMemoria(() => {
          return { ...memoria, registroDatos: memoria.contenido[parseInt(memoria.registroDirecciones)] }
        })
        setContador((contador + 1) % 8)
        break

      case 3:
        setUnidadControl(prevObj => {
          const nuevoObj = Object.create(Object.getPrototypeOf(prevObj))
          console.log(memoria.registroDatos)
          return Object.assign(nuevoObj, prevObj, { registroInstrucciones: memoria.registroDatos })
        })
        setContador((contador + 1) % 8)
        break

      case 4:
        setOp(() => {

          const andom = unidadControl.decode()
          setMemoria({ ...memoria, registroDirecciones: andom.operando })
          return andom
        })
        setContador((contador + 1) % 8)
        break;

      case 5:
        setMemoria({ ...memoria, registroDatos: memoria.contenido[parseInt(op?.operando, 2)] })
        setContador((contador + 1) % 8)
        break;

      case 6:
        setAlu(prevObj => {
          const nuevoObj = Object.create(Object.getPrototypeOf(prevObj))
          return Object.assign(nuevoObj, prevObj, { registroEntrada: memoria.registroDatos })
        })
        setContador((contador + 1) % 8)
        break;

      case 7:
        console.log(eval("alu." + op?.opNombre + "()"));
        if (op?.opNombre == "save") {
          let tpm = memoria.contenido
          tpm[parseInt(op?.operando, 2)] = alu.acumulador
          setMemoria({ ...memoria, contenido: tpm })
        }
        if (op?.opNombre == "finalizar") {
          break
        }
        setContador((contador + 1) % 8)
        break
    }
  }, [siguiente]);




  return (
    <>
      <div>
        <h1>La suprema calculadora de Von Neumann</h1>
        <Card
          title="Unidad de control"
          content={`contador de programa: ${unidadControl.contadorPrograma}. registro de instrucciones: ${unidadControl.registroInstrucciones}. decodificador: ${op?.opNombre}`}
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
      <button onClick={() => setSiguiente(!siguiente)}> siguiente</button>
      <br></br>
      <br></br>
      <button > reiniciar</button >

    </>
  );
}

export default App;

