let display = document.querySelector('#display');
const OPERATOR = ['+', '-', '*', '/'];

let leftOperand = "";
let rightOperand = "";
let operator = "";
let flag = false;

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
    let eraser = document.querySelectorAll(".displayLive");
    eraser.forEach((value) => {
        display.removeChild(value);
    })
}

function operate(left, right, op)
{
    clear();
    let result = 0;
    switch(op)
    {
        case "+": { 
            result = add(left, right);
            leftOperand = result
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

function removeLastOperator()
{
    display.removeChild(document.querySelector('.op'));
}

buttons.forEach(btn => btn.addEventListener("click", () => {
    let show = document.createElement('div');
    show.classList.add("displayLive")
    if(btn.textContent === "Clear")
    {
        clear();
    }
    
    else if (OPERATOR.includes(btn.textContent)) {
        if (flag) 
            if (OPERATOR.includes(btn.textContent)) removeLastOperator();
        flag = true;
        operator = btn.textContent;
        show.classList.add('op');
        show.textContent = btn.textContent;
        display.appendChild(show); 
    }
    else { 
        if (!flag) {
            matchedNum = btn.textContent.match(/[0-9]/g);
            if (matchedNum) leftOperand += matchedNum;
        }
        else {
            matchedNum = btn.textContent.match(/[0-9]/g);
            if (matchedNum) rightOperand += matchedNum;
        }
        
        if (btn.textContent === "=")
        {  
            show.textContent = operate(+leftOperand, +rightOperand, operator);
            display.appendChild(show); 
        }
        else {
            show.textContent = btn.textContent;
            display.appendChild(show); 
        }
    }
})
)