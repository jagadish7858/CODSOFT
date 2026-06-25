const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let previousInput = '';
let operator = null;
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;
        if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = null;
            display.innerText = '0';
        } 
        else if (value === '+' || value === '-' || value === '*' || value === '/') {
            if (currentInput === '' && previousInput === '') return;
            if (previousInput !== '' && currentInput !== '') {
                calculate();
            }
            operator = value;
            if (currentInput !== '') {
                previousInput = currentInput;
            }
            currentInput = '';
        } 
        else if (value === '=') {
            if (currentInput === '' || previousInput === '' || operator === null) return;
            calculate();
        } 
        else {
            if (value === '.' && currentInput.includes('.')) return;
            currentInput += value;
            display.innerText = currentInput;
        }
    });
});
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    if (operator === '+') {
        result = prev + current;
    } else if (operator === '-') {
        result = prev - current;
    } else if (operator === '*') {
        result = prev * current;
    } else if (operator === '/') {
        if (current === 0) {
            result = "Error"; 
        } else {
            result = prev / current;
        }
    }
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    display.innerText = currentInput;
}
