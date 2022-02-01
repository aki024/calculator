const display = document.querySelector('.result');
const numbers = document.querySelectorAll('.number');
const addNumber = document.querySelector('#numberAdd');
const subtractNumber = document.querySelector("#numberSubtract");
const multiplyNumber = document.querySelector("#numberMultiply");
const divideNumber = document.querySelector("#numberDivide");
const result = document.querySelector('#numberResult')
const allClear = document.querySelector('#numberAC');
const backspace = document.querySelector("#numberBackspace");
let operation = "";
let storeNumberA = null;
let storeNumberB = null;

//Setting up the display to show clicked numbers
numbers.forEach(number => {
    number.addEventListener('click', (e) => {


        display.innerHTML += e.target.textContent;

    });
})

//THE OPERATIONS
// Storing first number clearing the display and setting the operation for result to value
addNumber.addEventListener('click', () => {

        storeNumberA = display.innerHTML;
        clearDisplay();
        operation = "add";
    })
    //Subtraction
subtractNumber.addEventListener('click', () => {
        storeNumberA = display.innerHTML;
        clearDisplay();
        operation = "subtract";
    })
    //Multiplication
multiplyNumber.addEventListener('click', () => {
        storeNumberA = display.innerHTML;
        clearDisplay();
        operation = "multiply";
    })
    //Division
divideNumber.addEventListener('click', () => {
        storeNumberA = display.innerHTML;
        clearDisplay();
        operation = "divide";
    })
    //RESULT FUNCTIONALITY
result.addEventListener('click', () => {

    storeNumberB = display.innerHTML;
    clearDisplay();
    if (operation === "add") {
        display.innerHTML = parseInt(storeNumberA) + parseInt(storeNumberB);
    } else if (operation === "subtract") {
        display.innerHTML = parseInt(storeNumberA) - parseInt(storeNumberB);
    } else if (operation === "multiply") {
        display.innerHTML = parseInt(storeNumberA) * parseInt(storeNumberB);
    } else if (operation === "divide") {
        display.innerHTML = parseInt(storeNumberA) / parseInt(storeNumberB);
    }

})

allClear.addEventListener('click', clearDisplay);
backspace.addEventListener('click', () => {
    display.innerHTML = display.innerHTML.slice(0, -1);
})


function clearDisplay() {
    display.innerHTML = "";
}