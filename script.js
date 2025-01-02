class Calculator {
  /**
   * Creates a Calculator instance.
   * @param {HTMLElement} previousOperandTextElement - The element to display the previous operand.
   * @param {HTMLElement} currentOperandTextElement - The element to display the current operand.
   */
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  /**
   * Clears the calculator display and resets the operands and operation.
   */
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  /**
   * Deletes the last character of the current operand.
   */
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  /**
   * Appends a number to the current operand.
   * @param {string} number - The number to append.
   */
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  /**
   * Selects an operation for the calculator.
   * Computes the result if there was a previous operation.
   * @param {string} operation - The operation to perform.
   */
  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  /**
   * Computes the result of the operation set between the previous and current operands.
   * Updates the current operand with the result, and clears the previous operand and operation.
   */
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  /**
   * Formats a number for display with commas as thousands separators.
   * @param {string} number - The number to format.
   * @returns {string} - The formatted number.
   */
  getDisplayNumber(number) {
    const stringNumber = number.toString();                       // convert number to string
    const integerDigits = parseFloat(stringNumber.split('.')[0]); // get the integer part of the number
    const decimalDigits = stringNumber.split('.')[1];             // get the decimal part of the number
    let integerDisplay;
    if (isNaN(integerDigits)) {                                   // if the number is NaN
      integerDisplay = '';                                        // set the display to an empty string
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 }); // format the integer part with commas
    }
    if (decimalDigits != null) {                                  // if there is a decimal part
      return `${integerDisplay}.${decimalDigits}`;                // return the formatted integer and decimal parts
    } else {
      return integerDisplay;                                      // return the formatted integer part
    }
  }

  /**
   * Updates the calculator display with the current and previous operands.
   */
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

// Query the DOM for calculator buttons and operands display elements
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Create a new Calculator instance
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Add event listeners to number buttons
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// Add event listeners to operation buttons
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

// Add event listener to equals button
equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});

// Add event listener to all clear button
allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

// Add event listener to delete button
deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});
