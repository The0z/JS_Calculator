//Object to keep track of data
let calcMem = {
    numbers: ['0', '0'], //initial values to prevent errors
    currIndex: 0,  
    op: '',
    prevSum: 0,
}
display(); //Initial value of 0 display



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
function operate(oper, a, b){
    switch (oper) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
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
    let isOpBtnPressed = false;
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
            calcMem.op = '+';
            calcMem.currIndex = 1;
            break;
        case 'subBtn':
            calcMem.op = '-';
            calcMem.currIndex = 1;
            break;
        case 'multBtn':
            calcMem.op = '*';
            calcMem.currIndex = 1;
            break;
        case 'divBtn':
            calcMem.op = '/';
            calcMem.currIndex = 1;
            break;
        case 'clearBtn':
            clearNumField(true);   
            break;
        case 'opBtn': //aka Equals button
            let numA = parseFloat(calcMem.numbers[0]);
            let numB = parseFloat(calcMem.numbers[1]);
            calcMem.prevSum =  operate(calcMem.op, numA, numB).toString();
            isOpBtnPressed = true;
            clearNumField(false);
        case 'dotBtn':
            if(!hasDecimalDot(calcMem.numbers[calcMem.currIndex])){
                calcMem.numbers[calcMem.currIndex] += '.';
            }
            break;
        default:
            break;
    }
    display(isOpBtnPressed);

}

/**
 * Returns true if string contains a decimal
 * @param {*} str : inputted str 
 */
function hasDecimalDot(str){
    console.log(typeof str);
    return str.includes(".");
}

/**
 * Cleans up CalcMem properties for future operations.
 * @param {*} clearNums : Should prevSum and numbers be reset? 
 */
function clearNumField(clearNums){
    if (clearNums){
        calcMem.numbers = ['0', '0'];
        calcMem.prevSum = '0';
    } else {
        calcMem.numbers = [calcMem.prevSum, '0'];
    }
    calcMem.op = '';
    calcMem.currIndex = 0;
    
}

/**
 * Displays the first, second, or resulting number from the
 * calculation.
*/
function display(isOpBtnPressed = false){
    const numField = document.querySelector('#numField');
    
    //Display Initial Number Only (Operator/Second Number Not Given)
    if(calcMem.currIndex === 0){
        numField.textContent = parseFloat(calcMem.numbers[0]);
    }
    else if (calcMem.op !== '' && calcMem.numbers[1] == 0){ //Display Initial Number and Operator
        numField.textContent = `${parseFloat(calcMem.numbers[0])} ${calcMem.op}`
    }
    else { //Display First Num, Operator, and Second Num
        numField.textContent = `${parseFloat(calcMem.numbers[0])} ${calcMem.op} ${parseFloat(calcMem.numbers[1])}`; 
    }
}