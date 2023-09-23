let operator = '';
let previousValue = '';
let currentValue = '';

document.addEventListener('DOMContentLoaded', function() {
    let clear = document.querySelector(".clear");
    let equal = document.querySelector(".equal");
    let decimal = document.querySelector(".decimal");

    let numbers = document.querySelectorAll(".number");
    let operators = document.querySelectorAll(".operator");

    let previousScreen = document.querySelector(".previous");
    let currentScreen = document.querySelector(".current");

    //Adds a click listener to all number buttons and returns screen value.
    numbers.forEach((number) => number.addEventListener('click', function (e) {
        getNumber(e.target.textContent)
        currentScreen.textContent = currentValue;
    }))
    //Adds a click listener to all operator buttons returns screen value.
    operators.forEach((op) => op.addEventListener('click', function(e) {
        getOperator(e.target.textContent)
        previousScreen.textContent = previousValue + " " + operator;
        currentScreen.textContent = currentValue;
    }))
    //Adds a click listener to the clear button returns the screen value to empty.
    clear.addEventListener('click', function() {
        previousValue = '';
        currentValue = '';
        operator = '';
        previousScreen.textContent = currentValue;
        currentScreen.textContent = currentValue;
    })
    equal.addEventListener('click', function() {
        if (currentValue != '' && previousValue != '') {
            calculate();
            previousScreen.textContent = '';
            if (previousValue.length <= 5) {
                currentScreen.textContent = previousValue;
            } else {
                currentScreen.textContent = previousValue.slice(0,5) + "...";
            }
        }    
    })
    decimal.addEventListener('click', function() {
        addDecimal();
    })
})


//Sets up numbers and gives and character limit to 5.
function getNumber(num) {
    if (currentValue.length <= 5) {
        currentValue += num;
    }
}


//Sets up operator between numbers.
function getOperator(op) {
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}


//Changes the previousValue and currentValue from strings to numbers.
//Gives conditions for each operation.
//Returns the numbers back to strings.
function calculate() {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);
        if (operator === "+") {
           previousValue += currentValue; 
        } else if (operator === "-") {
            previousValue -= currentValue;
        } else if (operator === "/") {
            previousValue /= currentValue;
        } else if (operator === "x") {
            previousValue *= currentValue;
        }
    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = previousValue.toString();
    
}


//Rounds currentScreen value.
function roundNumber(num) {
    return Math.round(num * 1000) / 1000;
}


//Adds a decimal point to the currentValue.
function addDecimal() {
    if (!currentValue.includes(".")) {
        currentValue += '.';
    }
}