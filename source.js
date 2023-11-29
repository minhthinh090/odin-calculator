let display = document.querySelector('#display');

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
    return a*b;
}

function divide(a, b)
{
    return a / b;
}

let leftOperand = 0;
let rightOperand = 0;
let operator = "";

function operate()
{
    let lastResult = 0;
    let result = 0;
    switch(operator)
    {
        case "+": { 
            lastResult = result;
            result += add(leftOperand, rightOperand);
            break;
        }
        case "-": {
            lastResult = result;
            result -= subtract(leftOperand, rightOperand);
            break;
        }
        case "*": {
            lastResult = result;
            result *= multiply(leftOperand, rightOperand);
            break;
        }
        case "/": {
            lastResult = result;
            result /= divide(leftOperand, rightOperand);
            break;
        }
        case "=": return result;
    }
    return 0;
}

function clear()
{
    let eraser = document.querySelectorAll(".displayLive");
    eraser.forEach((value) => {
        display.removeChild(value);
    })
}

let btns = document.querySelectorAll('button');

btns.forEach(btn => btn.addEventListener("click", () => {
    if(btn.textContent === "Clear")
    {
        clear();
    }
    else {
        console.log(btn.textContent);
        let show = document.createElement('div');
        show.classList.add("displayLive")
        show.textContent = btn.textContent;
        display.appendChild(show); 
    } 
})
)