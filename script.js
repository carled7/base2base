let digits;
function receiveNumber() {
    let inputNumber = document.getElementById("inputNumber");
    inputNumber = inputNumber.value.toString();
    digits = inputNumber.split('');
    let base = document.getElementById("base");
    if (base.value != 10) {
        toDecimal(digits, base.value);
    }
    else {

    }
}

function toDecimal(digits, base) {
    digits.reverse();
    let i = 0;
    let numDecimal = 0;
    if (base > 10) {
        replaceChar(digits)
    }
    for (digit of digits) {
        numDecimal = numDecimal + digit * Math.pow(base, i);
        i++;
    }

    console.log(numDecimal);
}
function replaceChar(digits) {
    for (digit of digits) {
        digit = digit.toUpperCase();
        switch (digit) {
            case 'A':
                digits.splice(digits.indexOf(digit), 1, 10);
            break;
            //case 'B':
        }
    }
    console.log(digits);
}