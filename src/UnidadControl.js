export class UnidadControl {
  constructor() {
    this.decodificador = "";
    this.contadorPrograma = 0;
    this.registroInstrucciones = 0;
  }
  decode() {
    const tupla = {}
    const opCode = this.registroInstrucciones.slice(0, 4);
    if (opCode == "0000") {
      tupla['opNombre'] = "suma"
    }
    if (opCode == "0011") {
      tupla['opNombre'] = "potencia"
    }
    if (opCode == "0111") {
      tupla['opNombre'] = "finalizar"
    }
    if (opCode == "0110") {
      tupla['opNombre'] = "save"
    }
     tupla['operando'] = this.registroInstrucciones.slice(4,8)
     return tupla
  }
}
