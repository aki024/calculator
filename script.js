const display = document.querySelector('.result'); //Display the numbers
const numbers = document.querySelectorAll('.number'); //Number buttons
const addNumber = document.querySelector('#numberAdd'); // plus button
const subtractNumber = document.querySelector("#numberSubtract"); //minus button
const multiplyNumber = document.querySelector("#numberMultiply"); //multiply button
const divideNumber = document.querySelector("#numberDivide"); // divide button
const result = document.querySelector('#numberResult') // equals button
const allClear = document.querySelector('#numberAC'); // All clear button
const backspace = document.querySelector("#numberBackspace"); //Delete one button
const decimal = document.querySelector('#numberDot'); //Decimal button
const displayCheck = document.querySelectorAll('button');

let numberResult;

let operation = ""; //Operation ()
let saveOperation = ""; // variable to store operation once its cleared

const operatorButtons = document.querySelectorAll('.operator') //operator buttons (+ - / *)

let storeNumberA = null; // we need to store numbers so here are two variables for that
let storeNumberB = null;

let previousCalcOperation = null; //we also need to store variables so this is that
let calcOperation = null;

//On each operator click we get the button value (+ - / *)
operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        operation = e.target.textContent;
    })
})

//Setting up the display to show clicked numbers
numbers.forEach(number => {
    number.addEventListener('click', (e) => {


        display.innerHTML += e.target.textContent;
        //first click of a number 
        if (calcOperation === null && operation === "") {
            calcOperation = "numberPress"; //curent thing that is happening is numberPress
            storeNumberA = parseFloat(display.innerHTML); // store input number from the display


        } else if (calcOperation === "numberPress" && storeNumberB === null && operation === "") {
            calcOperation = "numberPress";
            storeNumberA = parseFloat(display.innerHTML);

            //second number click

            //check if divided by zero
        } else if (previousCalcOperation === "operation" && calcOperation === "numberPress" && operation === "" && display.innerHTML.includes('Lma')) {
            display.innerHTML = "";
            clearDisplay();

        } else if (previousCalcOperation === "operation" && calcOperation === "numberPress" && operation === "") {
            storeNumberA = parseFloat(display.innerHTML); //storing purposes

            //check if operation has a value
        } else if (operation === "+" || operation === "-" || operation === "*" || operation === "/") {
            saveOperation = operation; //save the operation value
            operation = ""; //clear so we can input more numbers
            display.innerHTML = ""; // display is empty after we click a sign
            display.innerHTML += e.target.textContent; //add numbers
            storeNumberA = parseFloat(display.innerHTML); //store numbers
            previousCalcOperation = calcOperation; //get value of previus operation and store it in a var
            calcOperation = "numberPress"; //add the number press operation as current

        }

    })
});

//THE OPERATIONS
// Function that does all this is down
addNumber.addEventListener('click', calculateWithoutEqual)
    //Subtraction
subtractNumber.addEventListener('click', calculateWithoutEqual)
    //Multiplication
multiplyNumber.addEventListener('click', calculateWithoutEqual)
    //Division
divideNumber.addEventListener('click', calculateWithoutEqual)

//RESULT FUNCTIONALITY
result.addEventListener('click', () => {
    //because we clear the value of the button click so it works we need to use saveOperation which was stored in button click
    if (saveOperation === "+" && storeNumberA !== null) {
        numberResult = parseFloat(storeNumberB) + parseFloat(storeNumberA);
        display.innerHTML = Math.round((numberResult) * 100) / 100;
        //quick math round it to 2 decimals
    } else if (saveOperation === "-" && storeNumberA !== null) {
        numberResult = parseFloat(storeNumberB) - parseFloat(storeNumberA);
        display.innerHTML = Math.round((numberResult) * 100) / 100;
    } else if (saveOperation === "*" && storeNumberA !== null) {
        numberResult = parseFloat(storeNumberB) * parseFloat(storeNumberA);
        display.innerHTML = Math.round((numberResult) * 100) / 100;
    } else if (saveOperation === "/" && storeNumberA !== null) {
        if (storeNumberA === 0) {
            display.innerHTML = "Lmao";
            //divide by 0
        } else {
            numberResult = parseFloat(storeNumberB) / parseFloat(storeNumberA);

            display.innerHTML = Math.round((numberResult) * 100) / 100;
        }
    } else if (saveOperation === "" && storeNumberB === null && storeNumberA === null) {
        display.innerHTML = "";
        //equal sign before everything 
    } else {

    }

})

allClear.addEventListener('click', clearDisplay);
//Delete one character
backspace.addEventListener('click', () => {
    display.innerHTML = display.innerHTML.slice(0, -1);
    storeNumberA = parseFloat(display.innerHTML);
})

//All clear
function clearDisplay() {
    display.innerHTML = "";
    storeNumberB = null;
    storeNumberA = null;
    operation = "";
    saveOperation = "";
    calcOperation = null;
    previousCalcOperation = null;
}
//Decimal support
decimal.addEventListener('click', () => {
    //limit to 1 decimal
    if (display.innerHTML.includes('.')) {

    } else {
        display.textContent += '.';
    }
})

function calculate() {
    if (saveOperation === "+") {
        numberResult = parseFloat(storeNumberB) + parseFloat(storeNumberA);
        //take the saved operator which i stored on number click and do the math

    } else if (saveOperation === "-") {
        numberResult = parseFloat(storeNumberB) - parseFloat(storeNumberA);

    } else if (saveOperation === "*") {
        numberResult = parseFloat(storeNumberB) * parseFloat(storeNumberA);

    } else if (saveOperation === "/") {
        if (storeNumberA === 0) {
            display.innerHTML = "Lmao"; //divide by 0 again
        } else {
            numberResult = parseFloat(storeNumberB) / parseFloat(storeNumberA);
        }

    } else {
        display.innerHTML = display.innerHTML;
    }
    display.innerHTML = Math.round((numberResult) * 100) / 100;
}
//This is where the magic happens
function calculateWithoutEqual() { //First run trough
    if (calcOperation === "numberPress" && previousCalcOperation === null && storeNumberA === null || storeNumberB === null) {
        previousCalcOperation = calcOperation; //numberPress becomes previousCalculation
        calcOperation = "operation"; // operation becomes the new calcOperation
        storeNumberB = storeNumberA; // We store our number
        storeNumberA = null; //we delete the old one and store another one up in the code

    } else if (previousCalcOperation === "operation" && calcOperation === "numberPress") {
        //if our previus operation was (+-/*) and our new operation is numberPress
        display.innerHTML = ""; //clear number

        calculate(); //run calculate function

        previousCalcOperation = calcOperation; // previusCalculation becomes this value
        calcOperation = "operation"; // 
        storeNumberB = parseFloat(display.innerHTML);
        storeNumberA = null;

    }
}

displayCheck.forEach(button => {
    button.addEventListener('click', () => {
        if (display.innerHTML.length > 14) { //limit to 14 digits
            display.innerHTML = display.innerHTML.substring(0, 14);
        }
    })


})