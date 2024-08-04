export function numberWithCommas(x) {
    // Convert the number to a string and split it into integer and decimal parts
    let [integerPart, decimalPart] = x.toString().split('.');

    // Add commas to the integer part
    let lastThree = integerPart.slice(-3);
    let otherParts = integerPart.slice(0, -3);

    if (otherParts !== '') {
        lastThree = ',' + lastThree;
    }

    otherParts = otherParts.replace(/\B(?=(\d{2})+(?!\d))/g, ",");

    return otherParts + lastThree + (decimalPart ? '.' + decimalPart : '');
}
