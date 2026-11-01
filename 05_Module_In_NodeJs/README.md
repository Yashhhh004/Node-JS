# Modules in Node.js

A comprehensive, beginner-friendly guide answering all core questions about Node.js modules, export/import syntaxes, CommonJS, and ES Modules.

---

## What is a Module?

A **module** is simply a separate, reusable file containing JavaScript code (functions, variables, classes, or objects) that can be shared across different parts of an application.

### Why do we use Modules?
- **Separation of Concerns**: Instead of writing thousands of lines in a single file, you break your application into smaller, manageable, and organized files (e.g., `math.js`, `auth.js`, `database.js`).
- **Reusability**: Write code once and reuse it in multiple files.
- **Avoid Global Scope Pollution**: Variables and functions inside a module are private by default; they do not leak into the global environment unless explicitly exported.
- **Maintainability**: If a bug appears in calculation logic, you only need to check and fix `math.js`.

> **Simple Analogy**: Think of a module like a Lego block or a specialized tool in a toolbox. You take out the exact tool you need, use it, and keep your workspace tidy.

---

## What is a CommonJS Module (CJS)?

**CommonJS** is the original, traditional module system built into Node.js from its inception.

### Key Characteristics:
- **Default in Node.js**: Unless specified otherwise in `package.json`, Node.js treats all `.js` files as CommonJS modules.
- **Import Syntax**: Uses the `require()` function.
- **Export Syntax**: Uses `module.exports` or `exports`.
- **Loading Behavior**: Synchronous (modules are loaded and executed sequentially at runtime).
- **Special Globals**: Built-in access to `__dirname` (current folder path) and `__filename` (current file path).

---

## What is an ECMAScript Module (ES Module / ESM)?

**ECMAScript Modules (ESM)** is the official, standardized module system introduced in JavaScript with ES6 (ECMAScript 2015). It works natively in modern browsers and in Node.js.

### Key Characteristics:
- **Import Syntax**: Uses the `import` statement.
- **Export Syntax**: Uses `export` and `export default`.
- **Loading Behavior**: Asynchronous and statically analyzed (imports are resolved before the code executes).
- **Standards-Compliant**: The standard for modern web and frontend frameworks (React, Vue, Vite, Next.js).

### How to enable ES Modules in Node.js:
Node.js supports ES Modules out of the box using either of these two methods:
1. **Option 1 (Recommended)**: Add `"type": "module"` inside your project's `package.json`:
   ```json
   {
     "name": "my-app",
     "type": "module"
   }
   ```
2. **Option 2**: Change your file extension from `.js` to `.mjs` (e.g., `server.mjs`).

---

## Explain Different Types of Exports and Imports Syntax?

Node.js supports two module formats, each with distinct syntax options:

### 1. CommonJS Export & Import Syntax

#### A. Exporting a single entity / function:
```javascript
// math.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;

// server.js
const sum = require('./math');
console.log(sum(5, 3)); // 8
```

#### B. Exporting multiple entities as an object:
```javascript
// math.js
function sum(a, b) {
  return a + b;
}
function subtraction(a, b) {
  return a - b;
}
module.exports = { sum, subtraction };

// server.js (Importing the whole object or destructuring)
const math = require('./math');
console.log(math.sum(5, 3));

// Destructuring import (Cleaner):
const { sum, subtraction } = require('./math');
console.log(subtraction(10, 4)); // 6
```

#### C. Direct `exports` property assignment:
```javascript
// math.js
exports.addition = (a, b) => a + b;
exports.pi = 3.14159;

// server.js
const { addition, pi } = require('./math');
```

---

### 2. ES Module (ES6) Export & Import Syntax

#### A. Default Export and Default Import:
Use `export default` when a file is primarily meant to export one main thing.
```javascript
// math.js
export default function sum(a, b) {
  return a + b;
}

// server.js
// With default import, you can give it any variable name you prefer:
import sum from './math.js';
console.log(sum(4, 5));
```

#### B. Named Exports and Named Imports:
Use named exports to share multiple functions, constants, or classes.
```javascript
// math.js
export const name = "Yash K";

export function subtraction(a, b) {
  return a - b;
}

// Or group named exports at the bottom:
export { subtraction, name };

// server.js
// Named imports MUST match the exported names (enclosed in curly braces {}):
import { subtraction, name } from './math.js';
console.log(subtraction(10, 2)); // 8
console.log(name);                // "Yash K"
```

#### C. Renaming / Aliasing Imports:
If an imported name collides with a local variable, rename it using `as`:
```javascript
import { subtraction as subtractNumbers } from './math.js';
console.log(subtractNumbers(20, 5)); // 15
```

#### D. Importing Everything as a Namespace (`*`):
```javascript
import * as MathUtils from './math.js';
console.log(MathUtils.name);
console.log(MathUtils.subtraction(9, 3));
```

#### E. Combining Default and Named Imports in One Line:
```javascript
import sum, { subtraction, name } from './math.js';
console.log(sum(1, 2));
console.log(subtraction(5, 2));
```

---

## CommonJS vs ES Modules (Comparison Table)

| Feature | CommonJS (CJS) | ES Modules (ESM) |
| :--- | :--- | :--- |
| **Import Syntax** | `const pkg = require('./pkg')` | `import pkg from './pkg.js'` |
| **Export Syntax** | `module.exports` or `exports.key` | `export default` or `export { key }` |
| **File Extension** | `.js` or `.cjs` | `.js` (with `"type": "module"`) or `.mjs` |
| **Path Extensions** | Can omit `.js` (`require('./math')`) | Mandatory extension (`import './math.js'`) |
| **Loading Type** | Synchronous | Asynchronous / Statically analyzed |
| **Where to use** | Traditional Node.js codebases | Modern Node.js, modern frontend (React/Vite) |
| **`__dirname` & `__filename`** | Available natively | Not available natively (use `import.meta.url`) |

---

## Important Forgotten Concepts (Key Additions)

### 1. `__dirname` and `__filename` in ES Modules
In CommonJS, `__dirname` and `__filename` are automatically provided by Node's wrapper function. In ES Modules, they are not available directly. You recreate them like this:

```javascript
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Current file:", __filename);
console.log("Current directory:", __dirname);
```

### 2. The CommonJS Module Wrapper Function
When Node.js runs a CommonJS file, it automatically wraps the entire file contents inside a hidden function before running it:

```javascript
(function (exports, require, module, __filename, __dirname) {
  // Your code lives inside here!
  // That's why 'module', 'exports', 'require', '__dirname' are accessible!
});
```

### 3. Dynamic Imports with `import()`
Both CommonJS and ES Modules support dynamic imports. Dynamic imports return a Promise and allow loading modules on demand (conditionally):

```javascript
async function loadMath() {
  const { subtraction } = await import('./math.js');
  console.log(subtraction(10, 3));
}
loadMath();
```
