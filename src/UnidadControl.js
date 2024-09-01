let contador = "0"
let registroInstrucciones = "0"
function decode(instruccion){
    const opCode = instruccion.slice(0, 4);
    console.log(opCode)
    if(opCode == "0000"){
        console.log("suma")
    }
    if(opCode == "0011"){
        console.log("potencia")
    }
    if(opCode == "0111"){
        console.log("finalizar")
    }
    if(opCode == "0110"){
        console.log("guardar")
    }
    
}
export { decode};