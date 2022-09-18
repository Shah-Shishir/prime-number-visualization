// DOM Selectors
const wrapper = document.querySelector("#wrapper");
const primeTable = document.querySelector("#prime-table");
const primeTableBody = document.querySelector("#prime-table-body");

// Constants and variables
const MAX = 201;
let check = new Array(MAX).fill(true);

function getNumberRowColumn(number) {
    let row, column;

    if (number % 20) {
        row = Math.floor(number / 20);
        column = (number % 20) - 1;
    } else {
        row = (number / 20) - 1;
        column = 19;
    }

    return [row, column];
}

function generateNumbersOnDOM() {
    for (let i = 1; i < MAX; i += 20) {
        const numberRow = document.createElement("tr");
        numberRow.classList.add('number-row');

        for (let j = i; j < i + 20; j++) {
            const number = document.createElement("td");
            number.innerText = j;
            number.classList.add('each-number');
            numberRow.appendChild(number);
        }

        primeTableBody.appendChild(numberRow);
    }
}

function sieve() {
    const allRows = primeTableBody.children;

    allRows[0].children[0].classList.add('composite');

    for (let i = 2; i < MAX; i++) {
        let rc = getNumberRowColumn(i);
        let row = rc[0];
        let column = rc[1];
        let element = allRows[row].children[column];

        if (check[i]) {
            element.classList.add('prime');

            for (let j = i * i; j < MAX; j += i) {
                check[j] = false;
                rc = getNumberRowColumn(j);
                row = rc[0];
                column = rc[1];
                element = allRows[row].children[column];
                element.classList.add('composite');
            }
        }
    }
}

// Generating numbers and calling sieve
function initialize() {
    generateNumbersOnDOM();
    sieve();
}

initialize();