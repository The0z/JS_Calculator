//Start with the Simple Functions

/**  
 * Adds two numbers together
 * Takes in two numbers a & b. 
*/
function add(a,b){
    return a + b;
}

/**
 * Subtracts two numbers
 * Takes in a & b (nums) and returns the result of  a - b
 */
function subtract(a,b){
    return a - b;
}

/**
 * Multiplies two numbers
 * Takes in a & b (nums) and result of  a * b
 */
function multiply(a,b){
    return a * b;
}

/**
 * Divides two numbers
 * Takes in a & b (nums) and result of  a / b
 */
function divide(a,b){
    return a / b;
}

/**
 * Takes an operator and 2 numbers and calls
 * either add, subtract, multiply or divide.
 * returns the result of the calls above.
 */
function operator(oper, a, b){
    switch (oper) {
        case 'add':
            return add(a,b);
        case 'subtract':
            return subtract(a,b);
        case 'multiply':
            return multiply(a,b);
        case 'divide':
            return divide(a,b);
        default:
            return 'Error';
    }
        
}
