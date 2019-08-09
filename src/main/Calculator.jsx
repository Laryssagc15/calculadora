import React, { Component } from 'react';
import './Calculator.css';
import Button from '../components/button';
import Display from '../components/Display';

const inicialState = {
  displayValue: '0', //Display começa com zero.
  clearDisplay: false, //Criar uma função que zera
  operation: null, //armazenar as operações +-/...
  value: [0, 0], //dois valores, ex; 80 e o 20
  current: 0 //Qual está manipulando o 1 ou 2 valor
};
export default class Calculator extends Component {

  state = { ...inicialState}
  //Criamos o clone para dentro do objeto

  //Limpar operação AC
  clearMemory() {
    this.setState({ ...inicialState})
  }
  //Setar se o usuário colocou /+-*
  setOperation(operation) {
    if(this.state.current === 0){
      this.setState({operation, current: 1, clearDisplay: true})
    } else {
      const equals = operation === '='
      const currentOperation = this.state.operation

      const values = [...this.state.values]
      switch(currentOperation){
        case '+':
          values [0] = values[0] + values[1]
          break
          case '-':
            values[0] = values[0] - values[1]
          break
        case '/':
          values[0] = values[0] / values[1]
          break
        case '*':
          values[0] = values[0] * values[1]
          break
          default:
      }

      this.setState({
        displayValue: values [0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      })
    }
  }
  //Adicionar digito
  addDigito(n) {
    if(n === '.' && this.state.displayValue.includes('.')){
      return //Se já tem ponto na calc, não aceite outro
    }
    //Display so valor zero, permanece zero
    const clearDisplay = this.state.displayValue === '0'
    || this.state.clearDisplay
    /*Essa const é para saber se o valor será limpo ou permanece o estado do Display*/
    const currentValue = clearDisplay ? ' ' : this.state.displayValue
    //No display terá o vaor digitado + o n digitado
    const displayValue = currentValue + n
    //Agora para mudar o display - o false e para nao zerar
    this.setState({displayValue, clearDisplay: false})
    if (n !== '.') {
      //current é a const que varia o valor
      const i = this.state.current//Converte para float
      const newValue = parseFloat(displayValue)
      //Coloquei para um novo array
      const values = [...this.state.value]
      //Coloquei para um novo valor
      values[i] = newValue
      //Coloquei tudo para state
      this.setState({ values })
      //amos ver na tela em impetor
      console.log(values)
    }
  }
  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigito = this.addDigito.bind(this);
  }

  render() {
    return (
      <div className="Calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigito} />
        <Button label="8" click={this.addDigito} />
        <Button label="9" click={this.addDigito} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigito} />
        <Button label="5" click={this.addDigito} />
        <Button label="6" click={this.addDigito} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigito} />
        <Button label="2" click={this.addDigito} />
        <Button label="3" click={this.addDigito} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigito} double />
        <Button label="." click={this.addDigito} />
        <Button label="=" click={this.setOperation} operation />
      </div>
      );
    }
  }

