const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

let newData = "";

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }

  console.log(calculator);
}

function inputDecimal(dot) {
  //If the `displayValue` property does not contain a decimal point
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    //Append the decimal point
    calculator.displayValue += dot;
  }
  console.log(calculator);
}

function removeDigit(deleted) {
  if (calculator.firstOperand === true) {
    calculator.waitingForSecondOperand = false;
    return;
  }
}

function handleOperator(nextOperator) {
  //Destructure the properties on the calculator object
  const { firstOperand, displayValue, operator, deleted } = calculator;
  //`parseFloat` converts the string contents of `displayValue`
  //to a floating-point number
  const inputValue = parseFloat(displayValue);

  //verify that `firstOperand` is null and that the `inputValue`
  //is not a `NaN` value
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function del() {
  //   calculator.displayValue = calculator.nextOperator.slice(0, -1);
  let input = document.getElementsByClassName("input")[0].value;

  calculator.displayValue = "";
  calculator.displayValue = input.slice(0, input.length - 1) + input;

  //   onClick =
  //     "document.calculator.ans.value = document.calculator.ans.value.substring(0, document.calculator.ans.value.length - 1)";
}

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function updateDisplay() {
  if (newData === "") {
    const display = document.querySelector(".input");
    display.value = calculator.displayValue;
  } else {
    console.log("hfhfhdh", calculator.displayValue);
    const display = document.querySelector(".input");
    display.value = newData;
  }
}

updateDisplay();

const keys = document.querySelector(".btn");
keys.addEventListener("click", (e) => {
  //Access the clicked element
  const { target } = e;
  const { value } = target;

  // Check if the clicked element is a button.
  // If not, exit from the function
  if (!target.matches("button")) {
    return;
  }

  console.log(value);
  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperator(value);
      break;
    case ".":
      inputDecimal(value);
      break;
    case "all-clear":
      resetCalculator();
      break;
    case "DEL":
      del(value);
      break;
    default:
      // check if the key is an integer
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});
