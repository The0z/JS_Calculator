//Object to keep track of data
let calcMem = {
    nums: ['0', '0'], //initial values to prevent errors
    index: 0,  
    op: '',
    sum: '0',
    roundTo: 0,
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
    if( a / b < 1){ //if fraction - display 2 digits by default
        calcMem.roundTo = 2;
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
        case 'btn2':
        case 'btn3':
        case 'btn4':
        case 'btn5':
        case 'btn6':
        case 'btn7':
        case 'btn8':
        case 'btn9':
        case 'btn0':
            //Take the number off the back of the id string. i.e. press btn1 -> 1
            calcMem.nums[calcMem.index] += e.target.id.slice(-1);
            //If a decimal point exists and another number has been pressed 
            //add more fractional digits to display
            if(hasDecimalDot(calcMem.nums[calcMem.index])){
                moreOrLessFractional(true);
            }
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
            calcMem.sum =  '0' + operate(calcMem.op, numA, numB); //leading 0 for backspace operability
            isOpBtnPressed = true;
            clearNumField(false);
            break;
        case 'dotBtn':
            if(!hasDecimalDot(calcMem.nums[calcMem.index])){
                calcMem.nums[calcMem.index] += '.';
            }
            break;
        case 'moreFract':
            moreOrLessFractional(true);
            break;
        case 'lessFract':
            moreOrLessFractional(false);
            break;
        case 'backspace':
            backspace();
            //If a decimal point exists we are reducing the fractional
            if(hasDecimalDot(calcMem.nums[calcMem.index])){
                moreOrLessFractional(false);
            }
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
    if (!moreFract && calcMem.roundTo > 0){ //roundTo can never be negative!
        calcMem.roundTo--;
    } 
    else if(moreFract) {
        calcMem.roundTo++;
    }
}


function backspace(){
    let len = calcMem.nums[calcMem.index].length
    if(len >= 2){
        calcMem.nums[calcMem.index] = calcMem.nums[calcMem.index].slice(0,len - 1); //remove last element in string
        if(calcMem.nums[calcMem.index].slice(-1) === '.'){
            calcMem.nums[calcMem.index] = calcMem.nums[calcMem.index].slice(0,len - 1); //remove the decimal point  
        }
    }
}


/**
 * Returns true if string contains a decimal
 * @param {*} str : inputted str 
 */
function hasDecimalDot(str){
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
        calcMem.roundTo = 2;
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
        numField.textContent = parseFloat(calcMem.nums[0]).toFixed(calcMem.roundTo);
    }
    else if (calcMem.op !== '' && calcMem.nums[1] === '0'){ //Display Initial Number and Operator
        numField.textContent = `${parseFloat(calcMem.nums[0]).toFixed(calcMem.roundTo)} ${calcMem.op}`
    }
    else { //Display First Num, Operator, and Second Num
        numField.textContent = `${parseFloat(calcMem.nums[0]).toFixed(calcMem.roundTo)}
                             ${calcMem.op} ${parseFloat(calcMem.nums[1]).toFixed(calcMem.roundTo)}`; 
    }
}