//Object to keep track of data
let calcMem = {
    nums: ['0', '0'], //initial values to prevent errors
    index: 0,  
    op: '',
    sum: '0',
    roundTo: 4,
}
display(); //Initial value of 0 display



// OPERATOR HELPER FUNCTIONS
/**  
 * Adds two nums together
 * Takes in two nums a & b. 
*/
function add(a,b){
    return a + b;
}

/**
 * Subtracts two nums
 * Takes in a & b (nums) and returns the result of  a - b
 */
function subtract(a,b){
    return a - b;
}

/**
 * Multiplies two nums
 * Takes in a & b (nums) and result of  a * b
 */
function multiply(a,b){
    return a * b;
}

/**
 * Divides two nums
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
 * Takes an operator and 2 nums and calls
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
            return calcMem.nums[0];
    }
        
}

// EVENT LISTENERS
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', (e) => updateCalculator(e)));

// EVENT LISTENER FUNCTIONS
// This will concatenate the value of the button onto either nums[0] or nums[1]
function updateCalculator(e){
    let isOpBtnPressed = false;
    switch(e.target.id) {
        case 'btn1':
            calcMem.nums[calcMem.index] += '1';
            break;
        case 'btn2':
            calcMem.nums[calcMem.index] += '2';
            break;
        case 'btn3':
            calcMem.nums[calcMem.index] += '3';
            break;
        case 'btn4':
            calcMem.nums[calcMem.index] += '4';
            break;
        case 'btn5':
            calcMem.nums[calcMem.index] += '5';
            break;
        case 'btn6':
            calcMem.nums[calcMem.index] += '6';
            break;
        case 'btn7':
            calcMem.nums[calcMem.index] += '7';
            break;
        case 'btn8':
            calcMem.nums[calcMem.index] += '8';
            break;
        case 'btn9':
            calcMem.nums[calcMem.index] += '9';
            break;
        case 'btn0':
            calcMem.nums[calcMem.index] += '0';
            break;
        case 'addBtn':
            calcMem.op = '+';
            calcMem.index = 1;
            break;
        case 'subBtn':
            calcMem.op = '-';
            calcMem.index = 1;
            break;
        case 'multBtn':
            calcMem.op = '*';
            calcMem.index = 1;
            break;
        case 'divBtn':
            calcMem.op = '/';
            calcMem.index = 1;
            break;
        case 'clearBtn':
            clearNumField(true);   
            break;
        case 'opBtn': //aka Equals button
            let numA = parseFloat(calcMem.nums[0]);
            let numB = parseFloat(calcMem.nums[1]);
            calcMem.sum =  operate(calcMem.op, numA, numB).toString();
            isOpBtnPressed = true;
            clearNumField(false);
        case 'dotBtn':
            if(!hasDecimalDot(calcMem.nums[calcMem.index])){
                calcMem.nums[calcMem.index] += '.';
            }
            break;
        case 'moreFract':
            //moreOrLessFractional(true);
            break;
        case 'lessFract':
            //moreOrLessFractional(true);
            break;
        default:
            break;
    }
    display(isOpBtnPressed);

}

/**
 * Will increase number of fractional digits if true, 
 * otherwise will decrease them.
 * @param {*} moreFract: True means increase fract 
 */
function moreOrLessFractional(moreFract){
    if(moreFract){
        calcMem.roundTo++;
    }
    calcMem.roundTo--;
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
 * @param {*} clearNums : Should sum and nums be reset? 
 */
function clearNumField(clearNums){
    if (clearNums){
        calcMem.nums = ['0', '0'];
        calcMem.sum = '0';
    } else {
        calcMem.nums = [calcMem.sum, '0'];
    }
    calcMem.op = '';
    calcMem.index = 0;
    
}

/**
 * Displays the first, second, or resulting number from the
 * calculation.
*/
function display(isOpBtnPressed = false){
    const numField = document.querySelector('#numField');

    //Display Initial Number Only (Operator/Second Number Not Given)
    if(calcMem.index === 0){
        numField.textContent = +parseFloat(calcMem.nums[0]).toFixed(calcMem.roundTo);
    }
    else if (calcMem.op !== '' && calcMem.nums[1] == 0){ //Display Initial Number and Operator
        numField.textContent = `${+parseFloat(calcMem.nums[0]).toFixed(calcMem.roundTo)} ${calcMem.op}`
    }
    else { //Display First Num, Operator, and Second Num
        numField.textContent = `${+parseFloat(calcMem.nums[0]).toFixed(4)}
                             ${calcMem.op} ${+parseFloat(calcMem.nums[1]).toFixed(calcMem.roundTo)}`; 
    }
}