// COMMON JS (Uncomment to use when "type": "module" is not set in package.json)
// const math = require('./math');
// console.log(math.addition(4, 5));
// console.log(math.subtraction(4, 5));
// console.log(math.addition1(1, 2));

// ES6 MODULES (ECMAScript Modules)
// Default import:
import sum from "./math.js";

// Named imports:
import { subtraction, name } from "./math.js";

// Or import both default and named in one line:
// import sum, { subtraction, name } from "./math.js";

console.log("Sum (Default Import):", sum(3, 4));
console.log("Subtraction (Named Import):", subtraction(10, 4));
console.log("Name (Named Constant):", name);
