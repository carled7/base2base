let outputNumber = [];
let basesConverter = [2, 8, 10, 16];
let digits;
let inputBase;
let outputBases = [];
let convertedNumber = [];
let results = document.getElementById("results");
let x = "something";

function receiveNumber() {
    //receive the number and its base selected by the user
    let inputNumber = document.getElementById("inputNumber");
    inputNumber = inputNumber.value.toString();
    digits = inputNumber.split('');
    inputBase = document.getElementById("base");
    if (!inputBase.value == "") {

        //if the base is different to 10, it will be converted to it
        if (inputBase.value != 10) {
            inputNumber = toDecimal(digits, inputBase.value);
        }
        convertToBase(inputNumber);
        console.log(outputBases);
        printResults();
    }
}

function convertToBase(num) {
    //this function converts the 'inputNumber' into the default bases
    convertedNumber = [];
    outputBases = [];
    for (let base of basesConverter) {
        if (base != inputBase.value) {
            switch (base) {
                case 2:
                    outputBases.push('(2)');
                    break;
                case 8:
                    outputBases.push('(8)');
                    break;
                case 10:
                    outputBases.push('(10)');
                    break;
                case 16:
                    outputBases.push('(16)');
                    break;
            }
            convertedNumber.push(fromDecimal(num, base));
        }
    }
}

function printResults() {

    results.innerHTML = '';
    let i = 0;
    for (converted of convertedNumber) {
        //let result = document.createElement('div');
        let baseIndication = document.createElement('div');
        baseIndication.setAttribute('id', 'content-areas');
        let inputArea = document.getElementById('input-area');
        let inputField = document.getElementById('inputNumber');
        inputArea.classList.add('showed-results')
        inputArea.style.animation = 'scaling-input-area 150ms ease 0s forwards';
        inputField.style.animation = 'scaling-input-field 150ms ease 0s forwards';
        converted = converted.reverse().join('');
        switch (outputBases[i++]) {
            case '(2)':

                baseIndication.innerHTML = `<p id="base-indicator"><strong>binary</strong> base</p>
                                            <div id="divider"></div>
                                            <p id="converted-number">${converted}</p>
                                            <button>copy</button>`;
                //result.innerText = converted;
                results.appendChild(baseIndication);
                //results.appendChild(result);
                break;
            case '(8)':
                baseIndication.innerHTML = `<p id="base-indicator"><strong>octal</strong> base</p>
                                            <div id="divider"></div>
                                            <p id="converted-number">${converted}</p>
                                            <button>copy</button>`;
                results.appendChild(baseIndication);
                break;
            case '(10)':
                baseIndication.innerHTML = `<p id="base-indicator"><strong>decimal</strong> base</p>
                                            <div id="divider"></div>
                                            <p id="converted-number">${converted}</p>
                                            <button>copy</button>`;
                results.appendChild(baseIndication);
                break;
            case '(16)':
                baseIndication.innerHTML = `<p id="base-indicator"><strong>hexadecimal</strong> base</p>
                                            <div id="divider"></div> 
                                            <p id="converted-number">${converted}</p>
                                            <button>copy</button>`;
                results.appendChild(baseIndication);
                break;
        }
        //result.innerText = outputBases[i].toString() + ": " + converted;
        //results.appendChild(result);
    }

}

function toDecimal(digits, base) {

    //this function converts the 'inputNumber' into the 10 base
    digits.reverse();
    let i = 0;
    let numDecimal = 0;
    if (base > 10) {
        //if the base is greater than 10, it is necessary to add new algorisms (a-f)
        digits.forEach(replaceChar)
    }
    for (digit of digits) {
        numDecimal = numDecimal + digit * Math.pow(base, i);
        i++;
    }
    return numDecimal;
}
function fromDecimal(num, base) {

    //this function converts numbers in the 10 base to others
    outputNumber = [];

    if (num < base) {
        outputNumber.push(num);
        outputNumber.forEach(replaceNum);
    }
    while (num >= base) {
        outputNumber.push(num % base);
        num = Math.floor(num / base);
        if (num < base) {
            outputNumber.push(num);
        }
    }
    if (base > 10) {
        outputNumber.forEach(replaceNum);
    }
    return outputNumber;
}
function replaceChar(digit) {

    //this function replace the letters (A-F) to the correspondent number
    let modChar = digit.toUpperCase();
    switch (modChar) {
        case "A":
            digits.splice(digits.indexOf(digit), 1, 10);
            break;
        case 'B':
            digits.splice(digits.indexOf(digit), 1, 11);
            break;
        case "C":
            digits.splice(digits.indexOf(digit), 1, 12);
            break;
        case 'D':
            digits.splice(digits.indexOf(digit), 1, 13);
            break;
        case "E":
            digits.splice(digits.indexOf(digit), 1, 14);
            break;
        case 'F':
            digits.splice(digits.indexOf(digit), 1, 15);
            break;
    }
}

function replaceNum(digit) {

    //this function replace the digits greater than 10 to letters
    let modNum = Number(digit);
    switch (modNum) {
        case 10:
            outputNumber.splice(outputNumber.indexOf(digit), 1, 'A');
            break;
        case 11:
            outputNumber.splice(outputNumber.indexOf(digit), 1, 'B');
            break;
        case 12:
            outputNumber.splice(outputNumber.indexOf(digit), 1, 'C');
            break;
        case 13:
            outputNumber.splice(outputNumber.indexOf(digit), 1, 'D');
            break;
        case 14:
            outputNumber.splice(outputNumber.indexOf(digit), 1, 'E');
            break;
        case 15:
            outputNumber.splice(outputNumber.indexOf(digit), 1, 'F');
            break;
    }
}