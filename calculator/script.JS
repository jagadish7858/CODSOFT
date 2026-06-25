// Select the display and all buttons
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Variables to store calculation state
let currentInput = '';
let previousInput = '';
let operator = null;

// Loop through each button to add an event listener
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        // 1. Handle Clear Button
        if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = null;
            display.innerText = '0';
        } 
        
        // 2. Handle Operators (+, -, *, /)
        else if (value === '+' || value === '-' || value === '*' || value === '/') {
            if (currentInput === '' && previousInput === '') return;
            
            // If there's already a previous input, calculate before applying the new operator
            if (previousInput !== '' && currentInput !== '') {
                calculate();
            }
            
            operator = value;
            if (currentInput !== '') {
                previousInput = currentInput;
            }
            currentInput = '';
        } 
        
        // 3. Handle Equals Button
        else if (value === '=') {
            if (currentInput === '' || previousInput === '' || operator === null) return;
            calculate();
        } 
        
        // 4. Handle Numbers and Decimals
        else {
            // Prevent multiple decimals
            if (value === '.' && currentInput.includes('.')) return;
            
            currentInput += value;
            display.innerText = currentInput;
        }
    });
});

// Function to perform the math using if-else statements and operators
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    // Ensure we are working with valid numbers
    if (isNaN(prev) || isNaN(current)) return;

    // Perform calculation based on the selected operator
    if (operator === '+') {
        result = prev + current;
    } else if (operator === '-') {
        result = prev - current;
    } else if (operator === '*') {
        result = prev * current;
    } else if (operator === '/') {
        // Prevent division by zero
        if (current === 0) {
            result = "Error"; 
        } else {
            result = prev / current;
        }
    }

    // Update state with the result
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    display.innerText = currentInput;
}