//Object to keep track of data
let calcMem = {
    numbers: ["0", "0"], //initial values to prevent errors
    currIndex: 0,  
    op: '',
    prevSum: 0,
}




// OPERATOR HELPER FUNCTIONS
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
 * Returns an error string if dividing by 0.
 */
function divide(a,b){
    if (b == 0){
        return "NEVER DIVIDE BY ZERO!"
    }
    return a / b;
}


// OPERATOR FUNCTIONS
/**
 * Takes an operator and 2 numbers and calls
 * Returns the result of either add, subtract, multiply or divide.
 * Returns the first number if no operator is provided.
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
            return calcMem.numbers[0];
    }
        
}

// EVENT LISTENERS
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', (e) => updateCalculator(e)));

// EVENT LISTENER FUNCTIONS
// This will concatenate the value of the button onto either numbers[0] or numbers[1]
function updateCalculator(e){
    switch(e.target.id) {
        case 'btn1':
            calcMem.numbers[calcMem.currIndex] += '1';
            break;
        case 'btn2':
            calcMem.numbers[calcMem.currIndex] += '2';
            break;
        case 'btn3':
            calcMem.numbers[calcMem.currIndex] += '3';
            break;
        case 'btn4':
            calcMem.numbers[calcMem.currIndex] += '4';
            break;
        case 'btn5':
            calcMem.numbers[calcMem.currIndex] += '5';
            break;
        case 'btn6':
            calcMem.numbers[calcMem.currIndex] += '6';
            break;
        case 'btn7':
            calcMem.numbers[calcMem.currIndex] += '7';
            break;
        case 'btn8':
            calcMem.numbers[calcMem.currIndex] += '8';
            break;
        case 'btn9':
            calcMem.numbers[calcMem.currIndex] += '9';
            break;
        case 'btn0':
            calcMem.numbers[calcMem.currIndex] += '0';
            break;
        case 'addBtn':
            calcMem.op = 'add';
            calcMem.currIndex = 1;
            break;
        case 'subBtn':
            calcMem.op = 'subtract';
            calcMem.currIndex = 1;
            break;
        case 'divBtn':
            calcMem.op = 'multiply';
            calcMem.currIndex = 1;
            break;
        case 'multBtn':
            calcMem.op = 'divide';
            calcMem.currIndex = 1;
            break;
        case 'clearBtn':
            clearAll();
            break;
        default:
            break;
    }  
}

function clearAll(){
    calcMem.op = '';
    calcMem.numbers = ['0', '0']
    calcMem.currIndex = 0;
}