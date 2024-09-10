import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Card.jsx";
import MContainer from "./Mcontainer.jsx";
import { Memoria } from "./vonNeumannArchitecture/memoria.js";
import { Alu } from "./vonNeumannArchitecture/ALU.js";
import { UnidadControl } from "./vonNeumannArchitecture/UnidadControl.js";
//fetch decode and execute
function App() {
  // ((2 ^ 2) + 2) ^ 2 = 36
  const [unidadControl, setUnidadControl] = useState(new UnidadControl());
  const [memoria, setMemoria] = useState(new Memoria());
  const [alu, setAlu] = useState(new Alu());
  const [op, setOp] = useState();
  const [contador, setContador] = useState(0);
  const [siguiente, setSiguiente] = useState(true);
  const [vector, setvector] = useState(['']);

  useEffect(() => {


    setvector(memoria.contenido)
  }, []);

  useEffect(() => {
    console.log(`case ${contador}`)
    switch (contador) {
      //Actualiza el registro de direcciones de la memoria con el contador de programa de la unidad de control
      case 0:
        setMemoria(() => {
          return ({ ...memoria, registroDirecciones: unidadControl.contadorPrograma })
        })
        setContador((contador + 1) % 8)
        break

      //Aumenta el valor del contador de programa  
      case 1:
        setUnidadControl(prevObj => {
          const nuevoObj = Object.create(Object.getPrototypeOf(prevObj))
          return Object.assign(nuevoObj, prevObj, { contadorPrograma: prevObj.contadorPrograma + 1 })
        })
        setContador((contador + 1) % 8)
        break

      //Asigna el registro de datos de la memoria con el valor obtenido en memoria[contador de programa]
      case 2:
        setMemoria(() => {
          return { ...memoria, registroDatos: memoria.contenido[parseInt(memoria.registroDirecciones)] }
        })
        setContador((contador + 1) % 8)
        break

      //Asigna al registro de instrucciones de la unidad de control el valor obtenido del registro de datos de la memoria
      case 3:
        setUnidadControl(prevObj => {
          const nuevoObj = Object.create(Object.getPrototypeOf(prevObj))
          console.log(memoria.registroDatos)
          return Object.assign(nuevoObj, prevObj, { registroInstrucciones: memoria.registroDatos })
        })
        setContador((contador + 1) % 8)
        break
      
      //la unidad de control decodifica lo que tiene en el registro de instrucciones
      // y le devuelve a la memoria la posición donde esta el operando que se necesita
      case 4:
        setOp(() => {

          const operation = unidadControl.decode()
          setMemoria({ ...memoria, registroDirecciones: operation.operando })
          return operation
        })
        setContador((contador + 1) % 8)
        break;
      
      //Se setea el registro de datos de la memoria con el operando buscado 
      case 5:
        setMemoria({ ...memoria, registroDatos: memoria.contenido[parseInt(op?.operando, 2)] })
        setContador((contador + 1) % 8)
        break;
      
        //Se le envia a la ALU el valor del  registro de datos de la memoria y la ALU
      //lo almacena en su registro de entrada
      case 6:
        setAlu(prevObj => {
          const nuevoObj = Object.create(Object.getPrototypeOf(prevObj))
          return Object.assign(nuevoObj, prevObj, { registroEntrada: memoria.registroDatos })
        })
        setContador((contador + 1) % 8)
        break;
      
      //Se realiza la operación indicada en la decodificación de la unidad de control
      //Y se almacena su resultado en el acumulador
      case 7:

        
        if (op?.opNombre == "+"){
          console.log(alu.suma());
        }
        if (op?.opNombre == "^"){
          console.log(alu.potencia());
        }
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
        <div id="procesador"> <Card
          title="Unidad de control"
          content={`contador de programa: ${unidadControl.contadorPrograma}. registro de instrucciones: ${unidadControl.registroInstrucciones}. decodificador: ${op?.opNombre}`}
        ></Card>
          <Card
            title="Unidad aritmético lógica (ALU) "
            content={`acumulador: ${alu.acumulador}. registro de entrada: ${alu.registroEntrada}.`}
          ></Card>
          </div>
        <MContainer vector={vector} content={`registro direcciones: ${memoria.registroDirecciones}. registro datos:${memoria.registroDatos}`}></MContainer>
      </div>
      <div className="card"></div>
      <button onClick={() => setSiguiente(!siguiente)}> siguiente</button>
      <a href="http://localhost:5173/"><button> reiniciar</button ></a >
    </>
  );
}
export default App;