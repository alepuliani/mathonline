const currentNumber = document.querySelector(".current-number")
const numberButtons = document.querySelectorAll(".number")
const resetButton = document.getElementById("reset")
const deleteButton = document.getElementById("delete")
const operationsButtons = document.querySelectorAll(".operation")
const equalButton = document.getElementById("equal")
const operator = document.querySelector(".operator")

let currentOperand = ""
let previousOperand = ""
let operation = null
const operators = ["+", "-", "×", "÷"]
let equalClicked = false

/**
 * The function `updateCurrentNumber` handles updating the current number displayed in a calculator
 * interface, ensuring proper formatting and handling of different input scenarios.
 * @param number - The `number` parameter in the `updateCurrentNumber` function represents the digit or
 * decimal point that the user has inputted. It is used to update the current number being displayed on
 * the calculator interface.
 * @returns If the current number already includes a decimal point and the input number is also a
 * decimal point, the function will return early and not update the current number.
 */
function updateCurrentNumber(number) {
  if (equalClicked) {
    currentNumber.textContent = ""
    equalClicked = false
  }
  if (operator.textContent != "") {
    currentNumber.textContent = ""
  }
  operator.textContent = ""
  if (currentNumber.textContent.includes(".") && number === ".") return
  if (currentNumber.textContent === "0" && number !== ".") {
    currentNumber.textContent = number
  } else {
    currentNumber.textContent += number
  }
  equalClicked = false
}

/**
 * The function `resetCurrentNumber` resets the current number, operator, operands, operation, and
 * equalClicked flag to their initial values.
 */
function resetCurrentNumber() {
  currentNumber.textContent = 0
  operator.textContent = ""
  previousOperand = ""
  currentOperand = ""
  operation = null
  equalClicked = false
}

/**
 * The function `deleteLastNumber` removes the last digit from the displayed number unless it is
 * already 0.
 */
function deleteLastNumber() {
  if (currentNumber.textContent != 0) {
    let numbers = [...currentNumber.textContent]
    numbers.pop()
    currentNumber.textContent = numbers.join("")
    if (currentNumber.textContent === "") currentNumber.textContent = 0
  }
}

/**
 * The function `checkOperations` updates the operation and operand values based on the button
 * operation clicked.
 * @param buttonOperation - The `buttonOperation` parameter in the `checkOperations` function
 * represents the mathematical operation that the user wants to perform. This function is responsible for setting the
 * operation to be performed and updating the display accordingly.
 * @returns If the `currentNumber.textContent` is an empty string, the function will return early and
 * not execute the rest of the code block.
 */
function checkOperations(buttonOperation) {
  if (currentNumber.textContent === "") return

  if (equalClicked) {
    previousOperand = currentNumber.textContent
    equalClicked = false
  } else if (previousOperand === "") {
    previousOperand = currentNumber.textContent
  }

  operation = buttonOperation
  operator.textContent = buttonOperation
  currentNumber.textContent = ""
}

/**
 * The function `executeOperation` performs arithmetic operations based on the previous operand,
 * current operand, and the selected operation.
 * @returns The `executeOperation` function checks if the `previousOperand`, `operation`, and the
 * content of the `currentNumber` element are all truthy. If any of these conditions are not met, the
 * function will return early without performing any operations. If all conditions are met, the
 * function will execute the operation based on the stored `operation` value (which can be addition,
 * subtraction, multiplication,
 */
function executeOperation() {
  if (!previousOperand || !operation || currentNumber.textContent === "") return

  currentOperand = currentNumber.textContent

  switch (operation) {
    case "+":
      currentNumber.textContent =
        parseFloat(previousOperand) + parseFloat(currentOperand)
      break
    case "-":
      currentNumber.textContent =
        parseFloat(previousOperand) - parseFloat(currentOperand)
      break
    case "×":
      currentNumber.textContent =
        parseFloat(previousOperand) * parseFloat(currentOperand)
      break
    case "÷":
      currentNumber.textContent =
        parseFloat(previousOperand) / parseFloat(currentOperand)
      break
  }
  equalClicked = true
  previousOperand = ""
  currentOperand = ""
}

numberButtons.forEach((button) => {
  let value = button.innerHTML
  button.addEventListener("click", () => updateCurrentNumber(value))
})
operationsButtons.forEach((button) => {
  button.addEventListener("click", () => checkOperations(button.textContent))
})
resetButton.addEventListener("click", () => resetCurrentNumber())
deleteButton.addEventListener("click", () => deleteLastNumber())
equalButton.addEventListener("click", () => executeOperation())
