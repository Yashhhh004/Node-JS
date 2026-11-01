// COMMON JS

// function addition(a, b) {
//     return a + b
// }

// function subtraction(a, b) {
//     return a - b
// }


// exports.addition1 = (a, b) => {
//     return a + b
// }


// module.exports = { addition, subtraction, addition1 }


// ES6 : Type Module 
function sum(a, b) {
    return a + b
}

function subtraction(a, b) {
    return a - b;
}

export default sum;

export {
    sum,
    subtraction
}

export const name = "Yash K" 