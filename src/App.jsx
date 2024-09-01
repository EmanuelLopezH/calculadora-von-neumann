import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './Card.jsx'
import { suma, exponente, guardar } from './ALU.js'
import {decode} from "./UnidadControl.js"

function App() {
  const [count, setCount] = useState(0)
  // ((2 ^ 2) + 2) ^ 2 = 36
  //               suma,      potencia,  suma,      potencia, save,      finalizar,   2,        espacio vacio    
  let memoria = ["00000110", "00110110","00000110","00110110","01100111","01110000","00000010","00000000"]
  //console.log(memoria)
  decode(memoria[0])

  
  return (
    <>
      <div>

        <Card title="Unidad de control" content="">
        </Card>
        <Card title="Unidad aritmericologica (ALU)"></Card>

        <Card title="Memoria" content={`${memoria}`}>
        </Card>
      </div>
      <h1>La suprema calculadora de Von Neumann</h1>
      <div className="card">
      </div>
    </>
  )
}

export default App
