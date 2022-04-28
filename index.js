const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
  formula: "",
  temporaryOperand: null,
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
  } else if (operator === "π") {
    return Math.PI;
  } else if (operator === "%") {
    return firstOperand / 100;
  } else if (operator === "sin") {
    return Math.sin(firstOperand);
  } else if (operartor === "cos") {
    return Math.cos(firstOperand);
  } else if (operator === "tan") {
    return Math.tan(firstOperand);
  } else if (operator === "log") {
    return Math.log10(firstOperand);
  } else if (operator === "ln") {
    return Math.log(firstOperand);
  }
  return secondOperand;
}

radToDeg = (radians, formula) => {
  // console.log("before pi ", radians);
  let result2 = "";
  let pi = Math.PI;

  if (formula === "sin") {
    result2 = Math.sin((radians * pi) / 180);
  }
  if (formula === "cos") {
    result2 = Math.cos((radians * pi) / 180);
  }
  if (formula === "tan") {
    result2 = Math.tan((radians * pi) / 180);
  }
  // console.log("result2 ", result2);
  return result2;
};

degToRad = (formula) => {
  let result2 = "";
  console.log("form ", formula);
  if (formula === "sin") {
    // console.log("calculator.te ", calculator.temporaryOperand);
    result2 = Math.sin(calculator.temporaryOperand);
  } else if (formula === "cos") {
    result2 = Math.cos(calculator.temporaryOperand);
  } else if (formula === "tan") {
    result2 = Math.tan(calculator.temporaryOperand);
  }
  calculator.displayValue = result2;
};

sin = () => {
  calculator.formula = "sin";
  calculator.temporaryOperand = calculator.displayValue;
  calculator.displayValue = Math.sin(calculator.displayValue);
  //because MATH.Sin returns result in radians we call sinDegree function for button Degree to display result in Degree
  //function to call radToDeg
};

cos = () => {
  calculator.formula = "cos";
  calculator.temporaryOperand = calculator.displayValue;
  calculator.displayValue = Math.cos(calculator.displayValue);
  //because MATH.cos returns result in radians we call cosDegree function for button Degree to display result in Degree
  //function to call radToDeg
};

tan = () => {
  calculator.formula = "tan";
  calculator.temporaryOperand = calculator.displayValue;
  calculator.displayValue = Math.tan(calculator.displayValue);
  //because MATH.tan returns result in radians we call tanDegree function for button Degree to diaplay result in Degree
  //function to call radToDeg
};

sinDegree = () => {
  //console.log("calculator.displayValue ", calculator.displayValue);
  console.log(
    "calculator.temporaryOperand in sinDegree ",
    calculator.temporaryOperand
  );
  let result = calculator.temporaryOperand;
  //let result = calculator.displayValue;
  //console.info("result ", result);
  let valueReturn = radToDeg(result, "sin");
  //console.log("valReturn ", valueReturn);
  calculator.displayValue = "";
  calculator.displayValue = valueReturn;
};

cosDegree = () => {
  let result = calculator.temporaryOperand;
  let valueReturn = radToDeg(result, "cos");
  calculator.displayValue = "";
  calculator.displayValue = valueReturn;
};

tanDegree = () => {
  let result = calculator.temporaryOperand;
  let valueReturn = radToDeg(result, "tan");
  calculator.displayValue = "";
  calculator.displayValue = valueReturn;
};

degree = () => {
  if (calculator.formula === "sin") {
    sinDegree();
  } else if (calculator.formula === "cos") {
    cosDegree();
  } else if (calculator.formula === "tan") {
    tanDegree();
  }
};

radian = () => {
  console.log(" === ", calculator.formula);
  if (calculator.formula === "sin") {
    degToRad("sin");
  } else if (calculator.formula === "cos") {
    degToRad("cos");
  } else if (calculator.formula === "tan") {
    degToRad("tan");
  }
};

function per() {
  calculator.displayValue = calculator.displayValue / 100;
}

function pi() {
  calculator.displayValue = calculator.displayValue * Math.PI;
}

function log() {
  calculator.displayValue = Math.log10(calculator.displayValue);
}

function ln() {
  calculator.displayValue = Math.log(calculator.displayValue);
}

function pow() {
  calculator.displayValue = Math.pow(calculator.displayValue);
}

function sqrt() {
  calculator.displayValue = Math.sqrt(calculator.displayValue, 2);
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

  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
    case "π":
    case "%":
    case "sin":
    case "cos":
    case "tan":
    case "log":
    case "ln":
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
