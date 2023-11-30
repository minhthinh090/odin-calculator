let display = document.querySelector('#display');
const OPERATOR = ['+', '-', '*', '/'];
const roundNumber = 10000; //Round 10^x number of decimal

let leftOperand = "";
let rightOperand = "";
let operator = "";
let flag = false;
let dividedByZero = false;

let chainCalculate = false;

let buttons = document.querySelectorAll('button');

function add(a, b)
{
    return a + b;
}

function subtract(a, b)
{
    return a - b;
}

function multiply(a, b)
{
    return a * b;
}

function divide(a, b)
{
    return a / b;
}


function clear()
{
    leftOperand = "";
    rightOperand = "";
    operator = "";
    flag = false;
    chainCalculate = false;
    let eraser = document.querySelectorAll(".displayLive");
    eraser.forEach((value) => {
        display.removeChild(value);
    })
}

function operate(left, right, op)
{
    clear();
    let result = 0;
    chainCalculate = true;
    switch(op)
    {
        case "+": { 
            result = add(left, right);
            leftOperand = result;
            return result;
        }
        case "-": {
            result = subtract(left, right);
            leftOperand = result;
            return result;
        }
        case "*": {
            result = multiply(left, right);
            leftOperand = result;
            return result;
        }
        case "/": {
            result = divide(left, right);
            leftOperand = result;
            return result;
        }
        default:
            return "Undefined";
    }
}

function removeElementByClass(className)
{
    display.removeChild(document.querySelector('.' + className));
}

buttons.forEach(btn => btn.addEventListener("click", () => {
    let show = document.createElement('div');
    show.classList.add("displayLive")
    if (dividedByZero) {
        display.removeChild(document.querySelector('.zeroDivisor'));
        dividedByZero = false;
    }

    if(btn.textContent === "Clear")
    {
        clear();
    }
    else if (dividedByZero) {
        display.removeChild(document.querySelector('.zeroDivisor'));
        dividedByZero = false;
    }
    
    else if (OPERATOR.includes(btn.textContent)) {
        if (flag && !rightOperand) 
            if (OPERATOR.includes(btn.textContent)) removeElementByClass("op");
        if (flag && rightOperand && rightOperand !== '0')
        {
            leftOperand = Math.round(operate(+leftOperand, +rightOperand, operator)*roundNumber) / roundNumber;

            
            let div = document.createElement('div');
            div.classList.add("displayLive");
            div.textContent = leftOperand;
            display.appendChild(div);
        }
        else if (flag && rightOperand && rightOperand === '0')
        {
            clear();
            show.classList.add('zeroDivisor');
            show.textContent += "Cannot divide a number by 0.";
            display.appendChild(show);
            dividedByZero = true;
        }
        flag = true;
        operator = btn.textContent;
        show.classList.add('op');
        show.textContent = btn.textContent;
        display.appendChild(show); 
    }
    else { 
        
        if (!flag && !chainCalculate) {
            matchedNum = btn.textContent.match(/[0-9]/g);
            if (matchedNum) leftOperand += matchedNum;
        }
        else if (!flag && chainCalculate)
        {
            if (!OPERATOR.includes(btn.textContent))
            {
                if(!(btn.textContent === "=")) {
                    clear();
                    leftOperand += btn.textContent.match(/[0-9]/g);
                    console.log(leftOperand);
                }
            }
        }
        else if (flag) {
            matchedNum = btn.textContent.match(/[0-9]/g);
            if (matchedNum) rightOperand += matchedNum;
        }

        if (btn.textContent === "=")
        {  
            if (flag && rightOperand !== '0') {
                show.textContent = Math.round(operate(+leftOperand, +rightOperand, operator)*roundNumber) / roundNumber;
                display.appendChild(show); 
            }
            else {
                clear();
                show.classList.add('zeroDivisor');
                show.textContent += "Cannot divide a number by 0.";
                display.appendChild(show);
                dividedByZero = true;
            }
        }
        else {
            show.textContent = btn.textContent;
            display.appendChild(show); 
        }
    }
})
)