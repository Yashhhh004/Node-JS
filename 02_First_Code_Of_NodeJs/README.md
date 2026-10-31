# Running Your First Node.js Code

## How to run Node.js code on terminal?

### Method 1: Running a JavaScript File (Standard Way)
1. Open your terminal (PowerShell, Command Prompt, or bash).
2. Navigate (`cd`) into the folder containing your JavaScript file (e.g., `02_First_Code_Of_NodeJs`).
3. Run the file using the `node` command followed by the filename:
   ```bash
   node index.js
   ```
4. **Output for this folder's [index.js](./index.js)**:
   ```text
   Start
   JavaScript !== NodeJS
   End
   ```

---

### Method 2: Using the Node.js REPL (Interactive Mode)
**REPL** stands for **Read-Eval-Print Loop**. It allows you to quickly type and test JavaScript code directly in the terminal without creating a file.
1. Type `node` in your terminal and press `Enter`:
   ```bash
   node
   ```
2. You will see a prompt like `>`. Now you can type any JavaScript expression:
   ```javascript
   > 5 + 10
   15
   > console.log("Hello from REPL!")
   Hello from REPL!
   ```
3. **How to exit REPL**:
   - Type `.exit` and press Enter, OR
   - Press `Ctrl + C` twice, OR
   - Press `Ctrl + D`.

---

## Why "JavaScript !== NodeJS"?
- **JavaScript** is a standard programming language defined by the ECMAScript specification.
- **Node.js** is the runtime environment that implements JavaScript with system APIs (filesystem, networking, processes) so that it can run outside the browser.
- Therefore, JavaScript code written for the browser (like `document.getElementById`) does not work in Node.js, and Node.js-specific APIs (like `fs.readFile`) do not work in the browser.

---

## Important Forgotten Concepts (Key Additions)

### 1. Automatic Reloading with `--watch` (Modern Node.js)
In modern Node.js (version 18.11+), you can run your file in watch mode so that it automatically restarts whenever you save changes:
```bash
node --watch index.js
```
*(No need to install third-party tools like `nodemon` for simple projects anymore!)*

### 2. Passing Arguments via Command Line (`process.argv`)
You can pass command-line arguments to your Node script:
```bash
node index.js Yash 25
```
Inside your code:
```javascript
// process.argv contains an array of arguments
console.log(process.argv);
// process.argv[2] is "Yash"
// process.argv[3] is "25"
```

### 3. Exiting a Node Process Programmatically
To stop or exit your Node program explicitly inside your code:
```javascript
process.exit(0); // 0 means clean/successful exit
process.exit(1); // 1 (or non-zero) means an error occurred
```
