// Seleccionar elementos del DOM
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = ''; // Almacena la entrada actual
let operator = null;   // Almacena el operador seleccionado
let previousInput = ''; // Almacena el valor anterior
let resultDisplayed = false; // Indica si el resultado ya se mostró

// Función para actualizar la pantalla
function updateDisplay(value) {
    display.textContent = value;
}

// Función para realizar cálculos
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                updateDisplay("No se puede dividir para cero");
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    resultDisplayed = true;
    updateDisplay(currentInput);
}

// Agregar event listeners a los botones
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        // Si es un número o un punto
        if (!isNaN(value) || value === '.') {
            if (resultDisplayed) {
                currentInput = value;
                resultDisplayed = false;
            } else {
                currentInput += value;
            }
            updateDisplay(currentInput);
        }
        // Si es un operador
        else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput === '') return; // No hacer nada si no hay entrada
            if (previousInput !== '') {
                calculate();
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '';
        }
        // Si es el botón de igual
        else if (value === '=') {
            if (operator === null || currentInput === '') return; // No hacer nada si no hay operador o entrada
            calculate();
        }
        // Si es el botón de limpiar (C)
        else if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = null;
            updateDisplay('0');
        }
        /*
        // Si es el botón de cambiar signo (±)
        else if (value === '±') {
            if (currentInput !== '') {
                currentInput = (parseFloat(currentInput) * -1).toString();
                updateDisplay(currentInput);
            }
        }*/

        // Si es el botón de borrar (del)
        else if (value === 'del') {
            if (currentInput !== '') {
                currentInput = currentInput.slice(0, -1); // Elimina el último carácter
                updateDisplay(currentInput || '0'); // Si está vacío, mostrar 0
            }
        }

        // Si es el botón de porcentaje (%)
        else if (value === '%') {
            if (currentInput !== '') {
                currentInput = (parseFloat(currentInput) / 100).toString();
                updateDisplay(currentInput);
            }
        }
    });
});