let outputNumber = [];
let basesConverter = [2, 8, 10, 16];
let digits;
let inputBase;
let outputBases = [];
let convertedNumber = [];
let results = document.getElementById("results");
let x = 0;
let addedBase = [];
let outputWidth = 0;


function receiveNumber() {
    //receive the number and its base selected by the user
    let inputNumberElement = document.getElementById("inputNumber");
    let inputNumber = inputNumberElement.value.toString();
    digits = inputNumber.split('');

    /*if (digits.length >= 7 && digits.length <= 10) {
        inputNumberElement.style.width = (325 + (digits.length - 7) * 4) + "vw";
    }*/
    if (digits.length >= 9 && digits.length < 11) {
        inputNumberElement.style.fontSize = 6 - (digits.length - 9) + 'vw';
    }
    inputBase = document.getElementById("base");
    if (inputBase.value != "" && inputNumber != "") {

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

    results.style.opacity = '0';
    let i = 0;
    var t = 1;
    for (converted of convertedNumber) {
        //let result = document.createElement('div');
        let baseIndication = document.createElement('div');
        baseIndication.setAttribute('id', 'content-areas');

        let inputArea = document.getElementById('input-area');
        inputArea.classList.add('showed-results')
        inputArea.style.height = '30vh';

        let inputField = document.getElementById('inputNumber');
        inputField.style.animation = 'scaling-input-field 350ms ease 0s forwards';

        inputField.style.animation = 'scaling-input-font-size 150ms ease 0s forwards';




        converted = converted.reverse().join('');
        switch (outputBases[i]) {
            case '(2)':

                baseIndication.innerHTML = `<p class="base-indicator"><strong>binary</strong> base</p>
                                            <span class="divider" id="div-bin"></span>
                                            <input class="converted-number" id="bin" value="${converted}"> 
                                            <button class="copy-button" onclick="copyToClipboard('bin')"><img src="./assets/copy.svg" alt="copy">
                                            </button>`;
                //result.innerText = converted;
                results.appendChild(baseIndication);
                //results.appendChild(result);
                break;
            case '(8)':
                baseIndication.innerHTML = `<p class="base-indicator"><strong>octal</strong> base</p>
                                            <span class="divider" id="div-oct"></span>
                                            <input class="converted-number" id="oct" value="${converted}">
                                            <button class="copy-button" onclick="copyToClipboard('oct')"><img src="./assets/copy.svg" alt="copy">
                                            </button>`;
                results.appendChild(baseIndication);
                break;
            case '(10)':
                baseIndication.innerHTML = `<p class="base-indicator"><strong>decimal</strong> base</p>
                                            <span class="divider" id="div-dec"></span>
                                            <input class="converted-number" id="dec" value="${converted}">
                                            <button class="copy-button" onclick="copyToClipboard('dec')"><img src="./assets/copy.svg" alt="copy">
                                            </button>`;
                results.appendChild(baseIndication);
                break;
            case '(16)':
                baseIndication.innerHTML = `<p class="base-indicator"><strong>hexadecimal</strong> base</p>
                                            <span class="divider" id="div-hex"></span>
                                            <input class="converted-number" id="hex" value="${converted}">
                                            <button class="copy-button" onclick="copyToClipboard('hex')"><img src="./assets/copy.svg" alt="copy">
                                            </button>`;
                results.appendChild(baseIndication);
                break;
            default:
                baseIndication.innerHTML = `<p class="base-indicator"><strong>(${outputBases[i]})</strong> base</p>
                                            <span class="divider" id="div-new${t}"></span> 
                                            <input class="converted-number" id="new${t}" value="${converted}">
                                            <button class="copy-button" onclick="copyToClipboard(${t},'addedBase')">
                                            <img src="./assets/copy.svg" alt="copy">
                                            </button>`;
                results.appendChild(baseIndication);
                break;

        }


        results.style.opacity = '1';
        if (converted.length >= 7) {



            outputWidth = (320 + (converted.length - 7) * 30);

            baseIndication.style.width = outputWidth + "pt";


        }
        let wideQuotient = ((converted.length / window.innerWidth).toFixed(5)) * 100;
        //console.log(wideQuotient);
        if (wideQuotient > 1.45) {

            var overflowIndicator;

            switch (outputBases[i]) {
                case '(2)':
                    overflowIndicator = document.getElementById('div-bin');
                    break;
                case '(8)':
                    overflowIndicator = document.getElementById('div-oct');
                    break;
                case '(10)':
                    overflowIndicator = document.getElementById('div-dec');
                    break;
                case '(16)':
                    overflowIndicator = document.getElementById('div-hex');
                    break;
                default:
                    overflowIndicator = document.getElementById(`div-new${t}`);
                    ++t;
                    break;
            }
        
            overflowIndicator.style.display = 'flex';            
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

    let newBaseDiv = document.getElementById('insert-new-base');

    if (x == 0) {
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
        inputArea.classList.add('showed-results');
        inputArea.style.height = '30vh';

        let inputField = document.getElementById('inputNumber');
        inputField.style.animation = 'scaling-input-field 900ms ease 0s forwards';
        x = 1;
    }

}

function addNewBase() {
    let baseChecker = true;
    let newBase = document.getElementById('new-base-input');
    for (base of basesConverter) {
        if (parseInt(newBase.value) == base) {
            baseChecker = false;
            showAlert('this base already exists');
        }
    }
    if (!newBase.value) {
        baseChecker = false;
        showAlert('type a number');
    }
    if (newBase.value > 15 || newBase.value < 3 && newBase.value) {
        baseChecker = false;
        showAlert('type a number between 3 and 15')
    }
    console.log(parseInt(newBase.value));
    console.log(baseChecker);

    if (baseChecker) {
        basesConverter.push(parseInt(newBase.value));
        let selectTag = document.getElementById('base');
        let newOptionTag = document.createElement('option');
        newOptionTag.setAttribute('value', `${newBase.value}`);
        newOptionTag.innerHTML = `(${newBase.value})`;
        selectTag.appendChild(newOptionTag);

        selectTag.style.backgroundColor = '#FB3640';
        selectTag.style.color = '#FFF';


        setTimeout(() => {
            selectTag.removeAttribute('style');
        }, 350);

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
    let alert = 'copied to clipboard';
    showAlert(alert);
}
function showAlert(alert) {
    var copiedAlert = document.getElementById('copied-alert');
    copiedAlert.innerText = alert;
    copiedAlert.style.transition = 'opacity 150ms ease, width 150ms ease';
    copiedAlert.style.opacity = '1';
    copiedAlert.style.width = alert.length * 10 + 'px';
    copiedAlert.style.zIndex = '1';
    setTimeout(() => {
        copiedAlert.style.opacity = '0';
        copiedAlert.style.width = '150px';
    }, 1000);
}
function shareSite(socialMedia) {

    let socialMediaUrl;
    let urlSite = document.location.href;
    let postTitle = encodeURI('Hey, check this out, a real time base converter: base2base.co');
    let shareButton = document.getElementById(`${socialMedia}-btn`);

    switch (socialMedia) {
        case 'twitter':
            socialMediaUrl = `https://twitter.com/share?url=${urlSite}&text=${postTitle}`;
            shareButton.setAttribute('href', socialMediaUrl);
            break;
        case 'facebook':
            socialMediaUrl = `https://www.facebook.com/sharer.php?u=${urlSite}`;
            shareButton.setAttribute('href', socialMediaUrl);
            break;
        case 'whatsapp':
            socialMediaUrl = `https://api.whatsapp.com/send?text=${postTitle} ${urlSite}`;
            shareButton.setAttribute('href', socialMediaUrl);
            break;
        case 'copy':
            let elementUrl = document.createElement('input');
            shareButton.appendChild(elementUrl);
            elementUrl.value = urlSite;

            elementUrl.select();
            document.execCommand('copy');
            elementUrl.remove();

            showAlert('URL copied to clipboard');
            break;
    }
}