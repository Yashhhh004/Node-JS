# Path Module in Node.js (`node:path`)

A comprehensive, beginner-friendly guide covering path manipulation, absolute vs relative paths, operating system separators, and Node.js global objects and constants.

---

## 1. What is the Path Module & Why Do We Use It?

The **Path module** is a built-in core module in Node.js (`node:path`) that provides utilities for working with and transforming file and directory paths.

### Why do we need the Path Module?
1. **Cross-Platform Compatibility**:
   - Windows uses backslashes (`\`) for file paths: `C:\Users\Yash\project`
   - Linux and macOS use forward slashes (`/`): `/home/yash/project`
   - If you manually concatenate paths with strings (e.g., `'folder/' + fileName`), your code may crash on Windows or fail unpredictably. The Path module automatically handles operating system differences.
2. **Prevent Path Traversal Vulnerabilities**: It safely resolves paths containing `.` (current directory) and `..` (parent directory).
3. **Easy Path Decomposition**: It provides instant functions to extract directory names, file names, and extensions from any path string.

---

## 2. Types of Paths

### A. Absolute Path
An **absolute path** specifies the complete location of a file or directory starting from the root of the filesystem drive:
- Windows: `C:\projects\node-app\server.js`
- Linux / macOS: `/var/www/my-app/server.js`
- **Advantage**: It always points to the exact same file regardless of what directory your terminal is currently in.
- **Check if a path is absolute**:
  ```javascript
  const path = require('node:path');
  console.log(path.isAbsolute('C:\\Users\\Yash')); // true (Windows)
  console.log(path.isAbsolute('./data.js'));       // false
  ```

### B. Relative Path
A **relative path** specifies a location relative to the current working directory or current file:
- `./data.js` (a file in the same folder)
- `../models/user.js` (a file inside a sibling folder, going up one level)
- `images/logo.png` (a file inside the `images` subfolder)
- **Advantage**: Makes projects portable; moving the project folder to another computer or drive does not break the internal links.

---

## 3. Different Types of Separators in Different Operating Systems

Operating systems use different symbols to separate folder and file names:

| System | Path Separator | Environment Path Delimiter | Example Path |
| :--- | :--- | :--- | :--- |
| **Windows** | Backslash (`\`) | Semicolon (`;`) | `C:\Users\Yash\file.txt` |
| **POSIX (Linux, macOS, Unix)** | Forward slash (`/`) | Colon (`:`) | `/home/yash/file.txt` |

### Built-in Separator Properties in Node.js:
- **`path.sep`**: Returns the platform-specific path segment separator:
  - Windows: `\`
  - Linux / macOS: `/`
- **`path.delimiter`**: Returns the platform-specific path delimiter (used in environment variables like `PATH`):
  - Windows: `;`
  - Linux / macOS: `:`
- **`path.win32` and `path.posix`**: If you specifically want Windows or POSIX formatting regardless of the host OS:
  ```javascript
  path.win32.join('folder', 'file.txt'); // "folder\\file.txt"
  path.posix.join('folder', 'file.txt'); // "folder/file.txt"
  ```

---

## 4. Most Common Path Module Methods (With Examples)

```javascript
const path = require('node:path');

const samplePath = 'user/yash/documents/data.js';

// 1. path.join: Combines multiple segments using the platform separator
const joined = path.join('user', 'yash', 'data.js');
console.log(joined); // Windows: "user\yash\data.js" | Linux: "user/yash/data.js"

// 2. path.resolve: Resolves a sequence of paths into an ABSOLUTE path
const absolute = path.resolve('user', 'yash', 'data.js');
console.log(absolute); // "C:\projects\node-app\user\yash\data.js"

// 3. path.basename: Returns the filename at the end of a path
console.log(path.basename(samplePath));         // "data.js"
console.log(path.basename(samplePath, '.js'));  // "data" (removes extension)

// 4. path.dirname: Returns the directory part of the path
console.log(path.dirname(samplePath));          // "user/yash/documents"

// 5. path.extname: Returns the extension of the path
console.log(path.extname(samplePath));          // ".js"

// 6. path.parse: Returns an object containing the path details
const parsed = path.parse(samplePath);
console.log(parsed);
/* Output:
{
  root: '',
  dir: 'user/yash/documents',
  base: 'data.js',
  ext: '.js',
  name: 'data'
}
*/

// 7. path.format: Converts a parsed path object back into a path string
console.log(path.format(parsed)); // "user/yash/documents/data.js"

// 8. path.normalize: Cleans up redundant dots and slashes
console.log(path.normalize('user//yash/../alex/data.js')); // "user/alex/data.js"
```

---

## 5. Global Objects & Constants in Node.js

Unlike web browsers which have `window` and `document`, Node.js provides a different set of global objects and variables accessible anywhere in your application without importing them:

### 1. `__dirname` (CommonJS Constant)
Stores the absolute directory path of the currently executing JavaScript file.
```javascript
console.log(__dirname); // e.g., "C:\projects\node-app\09_Path_Module_In_NodeJs"
```

### 2. `__filename` (CommonJS Constant)
Stores the absolute file path (including filename) of the currently executing file.
```javascript
console.log(__filename); // e.g., "C:\projects\node-app\09_Path_Module_In_NodeJs\server.js"
```

### 3. `global` / `globalThis`
The top-level global namespace object in Node.js (equivalent to `window` in web browsers). Variables declared on `global` are accessible across the entire application:
```javascript
global.appName = "Complete Node JS Guide";
console.log(globalThis.appName);
```

### 4. `process`
An object providing control and information about the currently running Node.js process:
- `process.env`: Access environment variables (e.g. `process.env.PORT`).
- `process.argv`: Array containing command-line arguments passed when running the script.
- `process.cwd()`: Current working directory from which the Node command was executed.
- `process.exit(0)`: Immediately terminates the process.

### 5. `Buffer`
The global class used to handle raw binary data in memory (used heavily when reading binary files, TCP streams, or images).

### 6. Timers
Global timer functions:
- `setTimeout(callback, ms)` & `clearTimeout(timerId)`
- `setInterval(callback, ms)` & `clearInterval(intervalId)`
- `setImmediate(callback)` & `clearImmediate(immediateId)`

---

## Important Forgotten Concepts (Key Additions)

### 1. `path.join()` vs `path.resolve()` (The Critical Difference)
- **`path.join()`**: Simply glues path segments together from left to right using the OS separator and normalizes the output. It does **not** make a path absolute unless one segment is already absolute.
- **`path.resolve()`**: Processes segments from right to left until an absolute path is formed. If no segment starts from the root, it prepends the **current working directory** (`process.cwd()`). It always returns an absolute path!

```javascript
// Example:
path.join('a', 'b', 'c');
// Output: "a\b\c" (Relative)

path.resolve('a', 'b', 'c');
// Output: "C:\projects\node-app\a\b\c" (Absolute)
```

### 2. Getting `__dirname` in ES Modules (Modern Node.js)
When using `"type": "module"` in `package.json`, `__dirname` and `__filename` are not defined. Use `import.meta.url`:
```javascript
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```
