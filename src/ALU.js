export class Alu {
  constructor() {
    this.acumulador = 0;
    this.registroEntrada = 0;
  }
  suma(sumando1, sumando2 = 0) {
    return sumando1 + sumando2;
  }

  exponente(base, exponente) {}

  guardar(numero) {}
  finalizar() {}
}
