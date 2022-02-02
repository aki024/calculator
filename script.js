const display = document.querySelector('.result'); //Display the numbers
const numbers = document.querySelectorAll('.number'); //Number buttons
const addNumber = document.querySelector('#numberAdd');
const subtractNumber = document.querySelector("#numberSubtract");
const multiplyNumber = document.querySelector("#numberMultiply");
const divideNumber = document.querySelector("#numberDivide");
const result = document.querySelector('#numberResult')
const allClear = document.querySelector('#numberAC');
const backspace = document.querySelector("#numberBackspace");
let operation = "";
let saveOperation = "";

const operatorButtons = document.querySelectorAll('.operator') //operator buttons (+ - / *)

let storeNumberA = null;
let storeNumberB = null;

let previousCalcOperation = null;
let calcOperation = null;


operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        operation = e.target.textContent;
    })
})

//Setting up the display to show clicked numbers
numbers.forEach(number => {
    number.addEventListener('click', (e) => {


        display.innerHTML += e.target.textContent;

        if (calcOperation === null && operation === "") {
            calcOperation = "numberPress";
            storeNumberA = display.innerHTML;

            console.log(previousCalcOperation, calcOperation, storeNumberA, storeNumberB, operation, 'prvi');
        } else if (calcOperation === "numberPress" && storeNumberB === null && operation === "") {
            calcOperation = "numberPress";
            storeNumberA = display.innerHTML;
            console.log('jossj');
            console.log(previousCalcOperation, calcOperation, storeNumberA, storeNumberB, operation, 'dr');
        } else if (previousCalcOperation === "numberPress" && calcOperation === "operation" && operation === "") {
            previousCalcOperation = calcOperation;
            calcOperation = "numberPress";
            storeNumberA = display.innerHTML;
            console.log(previousCalcOperation, calcOperation, storeNumberA, storeNumberB, operation, 'tr');

        } else if (previousCalcOperation === "operation" && calcOperation === "numberPress" && operation === "") {
            storeNumberA = display.innerHTML;

            console.log('opaa');
            console.log(previousCalcOperation, calcOperation, storeNumberA, storeNumberB, operation, 'cr');
        } else if (operation === "+" || operation === "-" || operation === "*" || operation === "/") {
            saveOperation = operation;
            operation = "";
            display.innerHTML = "";
            display.innerHTML += e.target.textContent;
            storeNumberA = display.innerHTML;
            previousCalcOperation = calcOperation;
            calcOperation = "numberPress";
            console.log(previousCalcOperation, calcOperation, storeNumberA, storeNumberB, operation, saveOperation, 'peti');
        }

    })
});

//THE OPERATIONS
// Storing first number clearing the display and setting the operation for result to value
addNumber.addEventListener('click', calculateWithoutEqual)
    //Subtraction
subtractNumber.addEventListener('click', calculateWithoutEqual)
    //Multiplication
multiplyNumber.addEventListener('click', calculateWithoutEqual)
    //Division
divideNumber.addEventListener('click', calculateWithoutEqual)



//RESULT FUNCTIONALITY
result.addEventListener('click', () => {

    console.log('p');

    if (saveOperation === "+") {
        display.innerHTML = parseInt(storeNumberB) + parseInt(storeNumberA);

    } else if (saveOperation === "-") {
        display.innerHTML = parseInt(storeNumberB) - parseInt(storeNumberA);
    } else if (saveOperation === "*") {
        display.innerHTML = parseInt(storeNumberB) * parseInt(storeNumberA);
    } else if (saveOperation === "/") {
        display.innerHTML = parseInt(storeNumberB) / parseInt(storeNumberA);
    } else {
        display.innerHTML = display.innerHTML;
    }

})

allClear.addEventListener('click', clearDisplay);
//Delete one character
backspace.addEventListener('click', () => {
    display.innerHTML = display.innerHTML.slice(0, -1);
})

//All clear
function clearDisplay() {
    display.innerHTML = "";
    storeNumberB = null;
    storeNumberA = null;

}

function calculate() {
    if (saveOperation === "+") {
        display.innerHTML = parseInt(storeNumberB) + parseInt(storeNumberA);


    } else if (saveOperation === "-") {
        display.innerHTML = parseInt(storeNumberB) - parseInt(storeNumberA);


    } else if (operation === "*") {
        display.innerHTML = parseInt(storeNumberB) * parseInt(storeNumberA);
    } else if (operation === "/") {
        display.innerHTML = parseInt(storeNumberB) / parseInt(storeNumberA);
    } else {
        display.innerHTML = display.innerHTML;
    }

}

function calculateWithoutEqual() {
    if (calcOperation === "numberPress" && previousCalcOperation === null) {
        previousCalcOperation = calcOperation;
        calcOperation = "operation";
        storeNumberB = storeNumberA;
        storeNumberA = null;
        display.innerHTML = "";
        console.log(previousCalcOperation, calcOperation, storeNumberA, storeNumberB, operation, 'fjedan');

    } else if (previousCalcOperation === "operation" && calcOperation === "numberPress") {



        display.innerHTML = "";

        calculate();

        previousCalcOperation = calcOperation;
        calcOperation = "operation";
        storeNumberB = display.innerHTML;
        storeNumberA = null;
        console.log(previousCalcOperation, calcOperation, storeNumberA, storeNumberB, operation, 'fdva');

    }
}