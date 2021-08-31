const valueBtn = document.querySelectorAll(".value");
const equalBtn = document.querySelector(".equal");
const allClearBtn = document.querySelector(".all-clear");
const deleteBtn = document.querySelector(".delete");
const pointBtn = document.querySelector(".point");
const currentScreen = document.querySelector(".current-screen");
const resultScreen = document.querySelector(".result-screen");
const operatorBtn = document.querySelectorAll(".operator");

let operand1, operand2, operator;

class Expression {
  constructor(operand1, operand2, operator) {
    this.operand1 = parseFloat(operand1);
    this.operand2 = parseFloat(operand2);
    this.operator = operator;
  }
  evaluate() {
    switch (this.operator) {
      case "+":
        return this.operand1 + this.operand2;
      case "-":
        return this.operand1 - this.operand2;
      case "x":
        return this.operand1 * this.operand2;
      case "÷":
        return this.operand1 / this.operand2;
      default:
        return "Syntax Error";
    }
  }
}

const expo = (x, f) => {
  return Number.parseFloat(x).toExponential(f);
};

const showValue = (n) => {
  currentScreen.innerHTML += n;
  currentScreen.scrollLeft += currentScreen.scrollLeftMax
};

const showResult = (n) => {
  let numbers = currentScreen.innerHTML.split(/\ |\+|\x|\-|\÷/);
  if (operand1 && numbers.length == 2 && !isNaN(parseInt(numbers[1]))) {
    operand1 = numbers[0];
    operand2 = numbers[1];
    evaluate();
  } else {
    operand1 = currentScreen.innerHTML;
  }
  
  if (n) {
    if (currentScreen.innerHTML.includes(operator)) {
      currentScreen.innerHTML = currentScreen.innerHTML.slice(0, -1) + n
    } else {
      currentScreen.innerHTML += n;
    }
    operator = n;
  }
};

const allClear = () => {
  currentScreen.innerHTML = "";
  resultScreen.innerHTML = "";
  operand1 = null;
  operand2 = null;
  operator = null;
};

const deleteValue = () => {
  currentScreen.innerHTML = currentScreen.innerHTML.slice(0, -1);
};

const evaluate = () => {
  currentScreen.innerHTML = resultScreen.innerHTML = new Expression(
    operand1,
    operand2,
    operator
  ).evaluate();
  resultScreen.innerHTML = currentScreen.innerHTML;
};

const calculate = (nums, operators) => {
  let result = 0;
  result = new Expression(nums[0], nums[1], operators[0]).evaluate();
  for (i = 2; i < nums.length; i++) {
    result = new Expression(result, nums[i], operators[i - 1]).evaluate();
  }
  return result;
};

const handleKeyboardInput = (e) => {
  if ((e.key >= 0 && e.key <= 9) || e.key === ".") {
    showValue(e.key);
  }
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    let key = e.key;
    if (e.key === "*") key = "x";
    if (e.key === "/") key = "÷";
    showResult(key);
  }
  if (e.key === "=" || e.key === "Enter") showResult();
  if (e.key === "Backspace") deleteValue();
  if (e.key === "Escape") allClear();
};

valueBtn.forEach((button) => {
  button.addEventListener("click", () => showValue(button.textContent));
});

allClearBtn.onclick = () => allClear();
deleteBtn.onclick = () => deleteValue();
equalBtn.onclick = () => showResult();

operatorBtn.forEach((button) => {
  button.addEventListener("click", () => showResult(button.textContent));
});

window.addEventListener("keydown", handleKeyboardInput);

