const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay()
{
    display.value = displayValue;
    console.log('Updated Display:', displayValue);
}

keys.addEventListener('click', function(e)
{
    const element = e.target;

    if (!element.matches('button')) return;

    if(element.classList.contains('operator'))
        {
            console.log('operator clicked:',element.value);
            handleOperator(element.value);
            updateDisplay(); 
            return;
        }
    if(element.classList.contains('decimal'))
    {
        inputDecimal();
        updateDisplay();
        return;
    }
    if(element.classList.contains('clear'))
    {
        clear();
        updateDisplay();
        return;
    }
   // console.log('Number clicked:', element.value);
    inputNumber(element.value);
    updateDisplay();
});
function handleOperator(nextOperator)
{
    console.log('Handling operator:',nextOperator);
    const value = parseFloat(displayValue);

    if(operator && waitingForSecondValue)
    {
        operator = nextOperator;
        return;
    }

    if (firstValue === null)
    {
     firstValue = value;  
    }
    else if(operator)
    {
    const result = calculate(firstValue, value, operator);

    displayValue = `${parseFloat(result.toFixed(2))}`;
    firstValue = result;
    
    }
    
    waitingForSecondValue = true;
    operator = nextOperator === '=' ? null: nextOperator;

    console.log('handleOperator:', displayValue, firstValue, operator, waitingForSecondValue);
    }
    function calculate(first, second, operator)
    {
    if(operator === '+')
    {
        return first + second;
    }
    else if (operator === '-')
    {
        return first - second;
    }
    else if (operator === '*')
    {
        return first * second;
    }
    else if (operator === '/')
    {
        return first / second;
    }
    return second;
}

function inputNumber(num)
{
    if(waitingForSecondValue)
    {
     displayValue = num;
     waitingForSecondValue = false;
    } 
    else
    {
     displayValue = displayValue === '0' ? num: displayValue + num;
    }
    console.log('inputNumber:', displayValue, firstValue, operator, waitingForSecondValue);
}

function inputDecimal()
{
    if(!displayValue.includes('.'))
    {
        displayValue+= '.';
    }
}
function clear()
{
    displayValue ='0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
    console.log('Cleared all');
}