let display = document.querySelector('.display-text');
const OPERATOR = ['+', '-', '*', '/'];
const EXTRA = ['.', 'Clear', '%', '+/-'];
const NUMBER = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const roundNumber = 10000; //Round 10^x number of decimal

let leftOperand = "";
let rightOperand = "";
let operator = "";
let flag = false;
let dividedByZero = false;
let decimalDetect = false;

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

function clearScreen()
{
    let eraser = document.querySelectorAll(".displayLive");
    eraser.forEach((value) => {
        display.removeChild(value);
    })
}

function clear()
{
    leftOperand = "";
    rightOperand = "";
    operator = "";
    flag = false;
    chainCalculate = false;
    decimalDetect = false;
    if (dividedByZero) {
        display.removeChild(document.querySelector('.zeroDivisor'));
        dividedByZero = false;
    }
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

function removeLastElement(className)
{
    display.removeChild(document.querySelector('.' + className));
}

buttons.forEach(btn => btn.addEventListener("click", () => {
    let show = document.createElement('span');
    show.classList.add("displayLive")
    if (dividedByZero)
    {
        removeLastElement('zeroDivisor');
        dividedByZero = false;
    }
    if (NUMBER.includes(btn.textContent))
    {
        if (chainCalculate && !rightOperand && !flag)
        {
            leftOperand = "";
            removeLastElement('displayLive');
            chainCalculate = false;
        }
        if (!flag) {
            leftOperand += btn.textContent;
            show.textContent += btn.textContent;
        }
        else {
            rightOperand += btn.textContent;
            show.textContent += btn.textContent;
        }
    }
    else if (OPERATOR.includes(btn.textContent))
    {
        if (chainCalculate) chainCalculate = false;

        if (flag && !rightOperand) {
            removeLastElement('op');
            show.classList.add('op');
            operator = btn.textContent;
            show.textContent = btn.textContent;
        }
        else if (flag && rightOperand)
        {
            if (rightOperand === "0" && operator === "/" )
            {
                clear();
                dividedByZero = true;
                let div = document.createElement('span');
                div.classList.add('zeroDivisor');
                display.appendChild(div);
                div.textContent = "Cannot divide by 0.";
            }
            else {
                leftOperand = Math.round(operate(+leftOperand, +rightOperand, operator) * roundNumber) / roundNumber;

                operator = btn.textContent;
                show.classList.add('op');
                let div = document.createElement('span');
                div.classList.add('displayLive');
                div.textContent = leftOperand; 
                display.appendChild(div);
                show.textContent = btn.textContent;
                chainCalculate = true;
                flag = true;
            }
        }
        else
        {
            flag = true;
            operator = btn.textContent;
            show.classList.add('op');
            show.textContent = btn.textContent;
            decimalDetect=false;
        }
    }
    else if (EXTRA.includes(btn.textContent))
    {
        switch(btn.textContent)
        {
            case 'Clear': {
                clear();
                break;
            }
            case '.': {
                if (!decimalDetect)
                {
                    if (chainCalculate)
                    {
                        clear();
                        leftOperand = '0.';
                        show.textContent = '0.';
                        decimalDetect = true;
                    }
                    else
                    {
                        if (!flag && leftOperand == "")
                        {
                            leftOperand = "0."; 
                            show.textContent += leftOperand;
                            decimalDetect = true;
                        }
                        else if (flag && rightOperand == "")
                        {
                            rightOperand = "0.";
                            show.textContent += rightOperand;
                            decimalDetect = true;
                        }
                        else if (!flag && !decimalDetect) {
                            leftOperand += '.';
                            show.textContent += '.';
                            decimalDetect = true;
                        }
                        else if (flag && !decimalDetect){
                            rightOperand += '.';
                            show.textContent += '.';
                            decimalDetect = true;
                        }
                    }
                }
                break;
            }
            case '%': {
                if (!flag) 
                {
                    leftOperand = Math.round(+leftOperand/100 * roundNumber)/roundNumber
                    show.textContent = leftOperand;
                    clearScreen();
                }
                else 
                {
                    rightOperand = Math.round(+rightOperand/100 * roundNumber)/roundNumber;
                    
                    clearScreen();
                    let tmp = document.createElement('span');
                    tmp.classList.add('displayLive');
                    display.appendChild(tmp);
                    tmp = leftOperand + operator;
                    show.textContent = tmp + rightOperand;
                }
                break;
            }
            case '+/-': {
                if (!flag && leftOperand)
                {
                    leftOperand = leftOperand.toString();
                    if (leftOperand[0] != '-') leftOperand = '-' + leftOperand;
                    else leftOperand = leftOperand.slice(1);
                    clearScreen();
                    
                    show.textContent = leftOperand;
                }
                else if (flag && rightOperand)
                {
                    if (operator === '+') {
                        operator = '-';
                        clearScreen();
                        show.textContent = leftOperand + operator + rightOperand;
                    }
                    else if (operator === '-') {
                        operator = '+';
                        clearScreen();
                        show.textContent = leftOperand + operator + rightOperand;
                    }
                    else {
                        if (rightOperand[0] === '-') rightOperand = rightOperand.slice(1);
                        else rightOperand = '-' + rightOperand;
                        clearScreen();
                        let tmp = document.createElement('span');
                        tmp.classList.add('displayLive');
                        display.appendChild(tmp);
                        tmp = leftOperand + operator;
                        show.textContent = tmp + rightOperand;
                    }
                }
            }
        }
    }

    else if (btn.textContent === '=')
    {
        if (rightOperand === "0" && operator === "/" )
        {
            clear();
            dividedByZero = true;
            let div = document.createElement('span');
            div.classList.add('zeroDivisor');
            display.appendChild(div);
            div.textContent = "Cannot divide by 0.";
        }
        else if (rightOperand) {
            leftOperand = Math.round(operate(+leftOperand, +rightOperand, operator) * roundNumber) / roundNumber;
            show.textContent += leftOperand;
        }
    }
    
    //Display on screen
    display.appendChild(show);
})
)