let outputNumber = [];
let basesConverter = [2, 8, 10, 16];
let digits;
let inputBase;
let outputBases = [];
let convertedNumber = [];
let results = document.getElementById("results");
let x = "something";
let addedBase = [];


function receiveNumber() {
    //receive the number and its base selected by the user
    let inputNumberElement = document.getElementById("inputNumber");
    let inputNumber = inputNumberElement.value.toString();
    digits = inputNumber.split('');

    if (digits.length >= 7 && digits.length <= 10) {
        inputNumberElement.style.width = (35 + (digits.length - 7) * 4) + "vw";
    }
    if (digits.length > 10 && digits.length < 14) {
        inputNumberElement.style.fontSize = 8 - (digits.length - 10) + 'vw';
    }
    inputBase = document.getElementById("base");
    if (!inputBase.value == "") {

        //if the base is different to 10, it will be converted to it
        if (inputBase.value != 10) {
            inputNumber = toDecimal(digits, inputBase.value);
        }
        convertToBase(inputNumber);
        printResults();
    }
}

function convertToBase(num) {
    //this function converts the 'inputNumber' into the default bases
    convertedNumber = [];
    outputBases = [];
    for (var base of basesConverter) {
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
                default:
                    outputBases.push(`${base}`);
                    break;
            }
            convertedNumber.push(fromDecimal(num, base));
        }
    }
}

function printResults() {

    results.innerHTML = '';
    let i = 0;
    let t = 1;
    for (converted of convertedNumber) {
        //let result = document.createElement('div');
        let baseIndication = document.createElement('div');
        baseIndication.setAttribute('id', 'content-areas');

        let inputArea = document.getElementById('input-area');
        inputArea.classList.add('showed-results')
        inputArea.style.animation = 'scaling-input-area 150ms ease 0s forwards';

        let newBaseInput = document.getElementById('insert-new-base');
        newBaseInput.style.animation = 'scaling-new-base-input 50ms ease 0s forwards';

        let inputField = document.getElementById('inputNumber');
        inputField.style.animation = 'scaling-input-field 150ms ease 0s forwards';
        try {
            let newBaseButton = document.getElementById('add-bases');
            newBaseButton.style.animation = 'new-base-button-resize 150ms ease 0s forwards';
        } catch (err) {

        }
        if (digits.length > 10) {
            inputField.style.animation = 'scaling-input-font-size 150ms ease 0s forwards';
        }

        let width = 320;
        if (converted.length >= 7) {
            width = (width + (converted.length - 7) * 30);
            baseIndication.style.width = width + "pt";
        }

        converted = converted.reverse().join('');
        switch (outputBases[i]) {
            case '(2)':

                baseIndication.innerHTML = `<p class="base-indicator"><strong>binary</strong> base</p>
                                            <div class="divider"></div>
                                            <input class="converted-number" id="bin" value="${converted}">
                                            <button class="copy-button" onclick="copyToClipboard('bin')"><img src="./assets/copy.svg" alt="copy">
                                            </button>`;
                //result.innerText = converted;
                results.appendChild(baseIndication);
                //results.appendChild(result);
                break;
            case '(8)':
                baseIndication.innerHTML = `<p class="base-indicator"><strong>octal</strong> base</p>
                                            <div class="divider"></div>
                                            <input class="converted-number" id="oct" value="${converted}">
                                            <button class="copy-button" onclick="copyToClipboard('oct')"><img src="./assets/copy.svg" alt="copy">
                                            </button>`;
                results.appendChild(baseIndication);
                break;
            case '(10)':
                baseIndication.innerHTML = `<p class="base-indicator"><strong>decimal</strong> base</p>
                                            <div class="divider"></div>
                                            <input class="converted-number" id="dec" value="${converted}">
                                            <button class="copy-button" onclick="copyToClipboard('dec')"><img src="./assets/copy.svg" alt="copy">
                                            </button>`;
                results.appendChild(baseIndication);
                break;
            case '(16)':
                baseIndication.innerHTML = `<p class="base-indicator"><strong>hexadecimal</strong> base</p>
                                            <div class="divider"></div> 
                                            <input class="converted-number" id="hex" value="${converted}">
                                            <button class="copy-button" onclick="copyToClipboard('hex')"><img src="./assets/copy.svg" alt="copy">
                                            </button>`;
                results.appendChild(baseIndication);
                break;
            default:
                baseIndication.innerHTML = `<p class="base-indicator"><strong>(${outputBases[i]})</strong> base</p>
                                            <div class="divider"></div> 
                                            <input class="converted-number" id="new${t}" value="${converted}">
                                            <button class="copy-button" onclick="copyToClipboard(${t},'addedBase')">
                                            <img src="./assets/copy.svg" alt="copy">
                                            </button>`;
                results.appendChild(baseIndication);
                ++t;
                break;

        }


        ++i;
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

function showInput() {
    let addButton = document.getElementById("add-bases");
    addButton.remove();

    let newBaseDiv = document.getElementById('insert-new-base');

    let inputNewBase = document.createElement("input");
    inputNewBase.id = "new-base-input";
    inputNewBase.setAttribute('type', 'number');
    inputNewBase.setAttribute('min', '3');
    inputNewBase.setAttribute('max', '15');
    inputNewBase.placeholder = "insert new base";
    newBaseDiv.appendChild(inputNewBase);

    let buttonNewBase = document.createElement("button");
    buttonNewBase.id = "new-base-button";
    buttonNewBase.innerText = "add";
    buttonNewBase.setAttribute('onclick', 'addNewBase()');
    newBaseDiv.appendChild(buttonNewBase);

    let inputArea = document.getElementById('input-area');
    inputArea.classList.add('showed-results')
    inputArea.style.animation = 'scaling-input-area 150ms ease 0s forwards';

    let inputField = document.getElementById('inputNumber');
    inputField.style.animation = 'scaling-input-field 150ms ease 0s forwards';


}

function addNewBase() {
    let baseChecker
    let newBase = document.getElementById('new-base-input');
    for (base of basesConverter) {
        if (newBase.value != base) {
            baseChecker = true;
        }
        else {
            baseChecker = false;
        }
    }
    if (baseChecker) {
        basesConverter.push(parseInt(newBase.value));
        let selectTag = document.getElementById('base');
        let newOptionTag = document.createElement('option');
        newOptionTag.setAttribute('value', `${newBase.value}`);
        newOptionTag.innerHTML = `(${newBase.value})`;
        selectTag.appendChild(newOptionTag);
        selectTag.style.animation = 'new-base-verifier 400ms ease 0s';

        setTimeout(() => {
            selectTag.removeAttribute('style');
        }, 1000);

        receiveNumber();
    }
}
function copyToClipboard(id, num) {

    if (num) {
        var copiedNumber = document.getElementById(`new${id}`);
        console.log(id);
        copiedNumber.select();
        document.execCommand('copy');
    } else {
        var copiedNumber = document.getElementById(id);
        copiedNumber.select();
        document.execCommand('copy');
    }
    var copiedAlert = document.getElementById('copied-alert');

    copiedAlert.style.animation = 'showing-alert 150ms'
    setTimeout(() => {
        copiedAlert.style.display = 'none';
    }, 1000);
}