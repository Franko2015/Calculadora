import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Calculadora';

  items: any = [];
  primerNumero: number[] = [];
  segundoNumero: number[] = [];
  primerNum: number | undefined;
  segundoNum: number | undefined;
  total: number = 0;
  operacion: string = '';

  constructor() {
    this.items = [
      { valor: "%" },
      { valor: "CE" },
      { valor: "C" },
      { valor: "<-" },

      { valor: "1/X" },
      { valor: "X^2" },
      { valor: "2raizX" },
      { valor: "/" },

      { valor: 7 },
      { valor: 8 },
      { valor: 9 },
      { valor: "X" },

      { valor: 4 },
      { valor: 5 },
      { valor: 6 },
      { valor: "-" },

      { valor: 1 },
      { valor: 2 },
      { valor: 3 },
      { valor: "+" },

      { valor: "+/-" },
      { valor: 0 },
      { valor: "," },
      { valor: "=" }
    ];
  }

  calcular(valor: any) {
    switch (true) {
      case typeof valor === "number" && this.operacion === "":
        this.primerNumero.push(valor);
        this.primerNum = this.primerNumero.reduce((acc, num) => acc * 10 + num, 0);
        break;

      case typeof valor === "number" && this.operacion !== "" && this.primerNumero.length > 0:
          this.segundoNumero.push(valor);
          this.segundoNum = this.segundoNumero.reduce((acc, num) => acc * 10 + num, 0);
        break;

      case typeof valor === "string" && valor !== "=" && valor !== "CE" && valor !== "C" && valor !== "<-":
        this.operacion = valor;
        break;
      case valor === "=":
        if (this.operacion !== "" && this.primerNumero.length > 0 && this.segundoNumero.length > 0 && this.primerNum !== undefined && this.segundoNum !== undefined) {

          switch (this.operacion) {
            case "+":
              this.total = this.primerNum + this.segundoNum;
              this.segundoNumero.splice(0)
              break;
            case "-":
              this.total = this.primerNum - this.segundoNum;
              this.segundoNumero.splice(0)
              break;
            case "X":
              this.total = this.primerNum * this.segundoNum;
              this.segundoNumero.splice(0)
              break;
            case "/":
              this.total = this.primerNum / this.segundoNum;
              this.segundoNumero.splice(0)
              break;
            case "%":
              this.total = this.primerNum % this.segundoNum;
              this.segundoNumero.splice(0)
              break;
            default:
              console.log("Operación no reconocida.");
              break;
          }
          this.primerNum = this.total
          this.segundoNum = undefined
          this.operacion = ""
          this.segundoNumero.splice(0)

        } else {
          console.log("No se puede calcular el resultado. Faltan operandos.");
        }
        break;
      case valor === "<-":
        if (this.operacion === "" && this.primerNumero.length > 0) {
          this.primerNumero.splice(-1);
          this.primerNum = this.primerNumero.reduce((acc, num) => acc * 10 + num, 0);
        } else if (this.operacion !== "" && this.segundoNumero.length > 0) {
          this.segundoNumero.splice(-1);
          this.segundoNum = this.segundoNumero.reduce((acc, num) => acc * 10 + num, 0);
        }

        break;
      case valor === "CE":
        this.borrar();
        break;
      default:
        console.log("Caso no reconocido.");
        break;
    }
  }

  borrar() {
    this.operacion = "";
    this.primerNum = 0
    this.segundoNum = 0
    this.total = 0
    this.primerNumero = [];
    this.segundoNumero = [];
  }

  getCssClass(item: any) {
    return typeof item === 'string' ? 'string-class' : 'btn-primary';
  }
}
