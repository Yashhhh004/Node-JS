# JavaScript Revision for Node.js

A comprehensive, beginner-friendly revision of core JavaScript concepts needed for backend Node.js development.

---

## `let`, `var`, `const`

### Comparison Table
| Feature | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Scope** | Function-scoped | Block-scoped `{}` | Block-scoped `{}` |
| **Re-declaration** | Allowed | Not allowed in same scope | Not allowed |
| **Re-assignment** | Allowed | Allowed | Not allowed |
| **Hoisting** | Hoisted with `undefined` | Hoisted in Temporal Dead Zone (TDZ) | Hoisted in Temporal Dead Zone (TDZ) |

### 1. Declaration
Declaring a variable tells JavaScript that a variable name exists in memory.
```javascript
var a;
let b;
const c = 10; // const must be initialized upon declaration
```

### 2. Initialization
Giving a declared variable an initial value.
```javascript
let count;      // Declaration
count = 0;      // Initialization
```

### 3. Hoisting
JavaScript's behavior of conceptually moving declarations to the top of their scope before code execution.
- **`var`**: Hoisted and initialized with `undefined`. You can access it before its line without a crash (it returns `undefined`).
  ```javascript
  console.log(x); // undefined
  var x = 5;
  ```
- **`let` and `const`**: Hoisted, but placed in the **Temporal Dead Zone (TDZ)** until the declaration line is reached. Accessing them early throws a `ReferenceError`.
  ```javascript
  // console.log(y); // ReferenceError: Cannot access 'y' before initialization
  let y = 10;
  ```

---

## Normal Naming Words vs Built-in Keywords
- **Normal Naming Words (Identifiers)**: Names chosen by developers for variables, functions, and classes (e.g., `userName`, `totalPrice`, `calculateTotal`). Must follow naming rules (can use letters, numbers, `_`, `$`, cannot start with a number).
- **Built-in Keywords**: Reserved words with special meaning in JavaScript that cannot be used as variable names (e.g., `let`, `const`, `function`, `return`, `class`, `if`, `while`, `new`).

---

## Datatypes
JavaScript has 8 data types divided into two main categories:

### Primitive Data Types (Immutable, Stored by Value)
1. **String**: Text data (`"hello"`, `'world'`, `` `template` ``).
2. **Number**: Integers and floating-point numbers (`42`, `3.14`).
3. **BigInt**: For arbitrarily large integers (`9007199254740991n`).
4. **Boolean**: Logical values (`true` or `false`).
5. **Undefined**: A variable that has been declared but not assigned a value.
6. **Null**: Intentional absence of any value.
7. **Symbol**: Unique and immutable identifier (`Symbol("id")`).

### Non-Primitive / Reference Data Type (Stored by Reference)
8. **Object**: Collections of key-value pairs (includes plain Objects `{}`, Arrays `[]`, Functions, Dates).

---

## Primitive vs Reference Type

### Primitive (Stored in Stack - Copy by Value)
When you assign or pass a primitive, an independent copy of the value is created:
```javascript
let a = 10;
let b = a; // b gets a copy of 10
b = 20;

console.log(a); // 10 (unchanged)
console.log(b); // 20
```

### Reference (Stored in Heap - Copy by Reference)
Objects and arrays store a reference (memory address). Copying references points to the exact same memory:
```javascript
let user1 = { name: "Yash" };
let user2 = user1; // user2 points to the same object in memory

user2.name = "Alex";
console.log(user1.name); // "Alex" (user1 was also modified!)
```

---

## Operators
- **Arithmetic**: `+`, `-`, `*`, `/`, `%` (remainder), `**` (exponent).
- **Assignment**: `=`, `+=`, `-=`, `*=`, `/=`.
- **Comparison**:
  - `==` (Loose equality: converts types before comparing; e.g., `5 == "5"` is `true`).
  - `===` (Strict equality: compares both value AND type; e.g., `5 === "5"` is `false` ⭐ *Always prefer `===`*).
  - `!=`, `!==`, `>`, `<`, `>=`, `<=`.
- **Logical**:
  - `&&` (AND): Both conditions must be true.
  - `||` (OR): At least one condition must be true.
  - `!` (NOT): Inverts boolean value.
- **Ternary Operator**: Shortcut for `if-else`:
  ```javascript
  const age = 18;
  const canVote = age >= 18 ? "Yes" : "No";
  ```

---

## Truthy vs Falsy
In JavaScript, any value evaluated in a boolean context behaves as either truthy or falsy.

### The 6 Main Falsy Values:
1. `false`
2. `0` (and `-0`)
3. `""` (empty string)
4. `null`
5. `undefined`
6. `NaN` (Not a Number)

*Everything else is **truthy***, including empty arrays `[]`, empty objects `{}`, and negative numbers like `-1`.

---

## Optional Chaining (`?.`) & Nullish Coalescing (`??`)

### Optional Chaining (`?.`)
Prevents runtime errors when accessing deeply nested properties of `null` or `undefined`:
```javascript
const user = {
  profile: {
    name: "Yash"
  }
};

// Without optional chaining: user.address.city throws TypeError
// With optional chaining: returns undefined safely
console.log(user.address?.city); // undefined
```

### Nullish Coalescing (`??`)
Returns the right-hand value only if the left-hand value is `null` or `undefined` (unlike `||`, it does not treat `0` or `""` as missing):
```javascript
const score = 0;

const result1 = score || 10; // 10 (because 0 is falsy)
const result2 = score ?? 10; // 0  (because 0 is NOT null or undefined)
```

---

## Conditionals
Used to execute different blocks of code depending on conditions.
```javascript
const role = "admin";

if (role === "admin") {
  console.log("Full access");
} else if (role === "editor") {
  console.log("Edit access");
} else {
  console.log("Read only");
}

// Switch statement for checking specific values
switch (role) {
  case "admin":
    console.log("Welcome Admin");
    break;
  default:
    console.log("Welcome Guest");
}
```

---

## Loops
Repeat a block of code multiple times.

```javascript
// 1. Standard for loop
for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2
}

// 2. while loop
let count = 0;
while (count < 3) {
  count++;
}

// 3. for...of loop (Best for iterating arrays or strings)
const fruits = ["apple", "banana", "mango"];
for (const fruit of fruits) {
  console.log(fruit);
}

// 4. for...in loop (Best for iterating object keys)
const person = { name: "Yash", age: 22 };
for (const key in person) {
  console.log(key, person[key]);
}
```

---

## Functions
Reusable blocks of code designed to perform a specific task.

```javascript
// 1. Function Declaration (Hoisted)
function greet(name) {
  return "Hello, " + name;
}

// 2. Function Expression
const greetUser = function(name) {
  return "Hello, " + name;
};

// 3. Arrow Function (ES6)
const greetArrow = (name) => `Hello, ${name}`;
```

---

## Parameters & Arguments
- **Parameters**: The variable placeholders defined inside the function signature.
- **Arguments**: The real values passed to the function when calling it.

```javascript
// 'a' and 'b' are parameters; 'b = 5' is a default parameter
function add(a, b = 5) {
  return a + b;
}

// 10 and 20 are arguments
console.log(add(10, 20)); // 30
console.log(add(10));     // 15 (uses default b = 5)
```

---

## Array Methods (`push`, `pop`, `shift`, `unshift`, `map`, `filter`)

```javascript
const numbers = [1, 2, 3, 4, 5];

// Mutating methods (change original array):
numbers.push(6);     // Adds to end: [1, 2, 3, 4, 5, 6]
numbers.pop();        // Removes from end: [1, 2, 3, 4, 5]
numbers.unshift(0);   // Adds to beginning: [0, 1, 2, 3, 4, 5]
numbers.shift();      // Removes from beginning: [1, 2, 3, 4, 5]

// Non-mutating methods (return a new array):
// map: transforms each item
const doubled = numbers.map((n) => n * 2);
// [2, 4, 6, 8, 10]

// filter: returns items that pass a test condition
const evens = numbers.filter((n) => n % 2 === 0);
// [2, 4]
```

---

## Object
An unordered collection of key-value pairs.

```javascript
const user = {
  name: "Yash",
  age: 22,
  isStudent: true,
  sayHello: function() {
    return `Hi, I am ${this.name}`;
  }
};

// Accessing properties:
console.log(user.name);      // Dot notation: "Yash"
console.log(user["age"]);    // Bracket notation: 22

// Useful Object helper methods:
console.log(Object.keys(user));    // ['name', 'age', 'isStudent', 'sayHello']
console.log(Object.values(user));  // ['Yash', 22, true, [Function]]
console.log(Object.entries(user)); // Array of [key, value] pairs
```

---

## String
Methods for working with text in JavaScript.

```javascript
const greeting = "Hello, World!";

console.log(greeting.length);           // 13
console.log(greeting.toLowerCase());    // "hello, world!"
console.log(greeting.toUpperCase());    // "HELLO, WORLD!"
console.log(greeting.includes("World"));// true
console.log(greeting.slice(0, 5));      // "Hello"
console.log(greeting.split(", "));      // ["Hello", "World!"]

// Template Literals (using backticks)
const user = "Yash";
console.log(`Welcome back, ${user}!`);
```

---

## Sync vs Async (`async` / `await`)

### Synchronous Code
Executes line-by-line, blocking the next line until the current line completes:
```javascript
console.log("1");
console.log("2");
console.log("3");
// Output: 1, 2, 3
```

### Asynchronous Code
Non-blocking; Node.js starts the task in the background and moves to the next line immediately. When the task finishes, its result is handled via Promises or `async`/`await`:
```javascript
// Simulated async task with Promise
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data received!");
    }, 1000);
  });
}

// Using async / await (clean and readable)
async function run() {
  console.log("Fetching...");
  const data = await fetchData(); // Waits for promise to resolve without freezing the app
  console.log(data);
}

run();
```

---

## Spread & Rest Operators (`...`)

Both use the same syntax (`...`), but serve opposite purposes based on context:

### 1. Spread Operator (Expands elements)
Used to unpack elements of an array or object into a new array or object (great for copying/merging):
```javascript
// Merging arrays
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

// Copying and extending objects
const person = { name: "Yash", city: "Mumbai" };
const updatedPerson = { ...person, age: 22 };
```

### 2. Rest Operator (Condenses elements)
Used in function parameters to collect multiple arguments into a single array:
```javascript
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
```

---

## Destructuring
Extract values from arrays or properties from objects into distinct variables cleanly.

### Object Destructuring
```javascript
const user = { firstName: "Yash", age: 22, country: "India" };

// Instead of: const firstName = user.firstName;
const { firstName, age } = user;
console.log(firstName, age); // "Yash" 22
```

### Array Destructuring
```javascript
const rgb = [255, 140, 0];

const [red, green, blue] = rgb;
console.log(red, green, blue); // 255 140 0
```

---

## Important Forgotten Concepts (Key Additions)

### 1. Error Handling with `try...catch...finally`
Essential for preventing server crashes in Node.js when an async operation or invalid data triggers an error:
```javascript
try {
  // Risky operation
  const parsed = JSON.parse("invalid json text");
} catch (error) {
  console.error("Caught an error safely:", error.message);
} finally {
  console.log("Cleanup code that always runs.");
}
```

### 2. Node.js Modules: CommonJS vs ES Modules
In Node.js, code is split across files using modules:
- **CommonJS (Default in Node.js)**:
  ```javascript
  // math.js
  const add = (a, b) => a + b;
  module.exports = { add };

  // app.js
  const { add } = require("./math");
  ```
- **ES Modules (Modern JavaScript)**:
  ```javascript
  // math.js
  export const add = (a, b) => a + b;

  // app.js
  import { add } from "./math.js";
  ```


