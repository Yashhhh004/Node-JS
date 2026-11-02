# File System (`fs`) in Node.js

A comprehensive, beginner-friendly guide covering file and directory management, synchronous vs asynchronous approaches, system concepts, and complete operations cheat sheets.

---

## 1. Core Operating System & File Concepts

### What is a File?
A **file** is a named collection of data or information stored permanently on a computer's storage drive (such as an SSD or Hard Drive). Files have extensions (like `.txt`, `.json`, `.js`, `.png`) that describe what type of data they store and how programs should interpret them.

### What is a Directory (Folder)?
A **directory** (commonly called a **folder**) is a special container that organizes and groups files and other subdirectories into a hierarchical tree structure. It does not hold file data directly; instead, it holds a catalog of references to files.

### What does a Filesystem do?
A **filesystem** is the operating system component responsible for:
- Controlling how data is stored, indexed, retrieved, and updated on physical hardware.
- Organizing files into directories and paths.
- Enforcing access permissions (read, write, execute) to ensure security.

### Where are files stored?
Files are stored on **non-volatile secondary storage** (Solid State Drives [SSD], Hard Disk Drives [HDD], or NVMe).
- Unlike RAM (Random Access Memory), which loses its contents when power is turned off, secondary storage retains file data permanently until explicitly deleted.

### How do applications interact with files?
Applications cannot directly write bits to physical disk hardware. Instead:
1. The application makes a request via JavaScript code (e.g., `fs.writeFile`).
2. Node.js translates this JavaScript call through C++ bindings into an operating system **System Call** (Syscall).
3. The operating system kernel validates permissions and directs the hardware controller to read/write data on the disk.
4. The OS returns the result (or error) back to Node.js.

### Browser vs Node.js Filesystem Access
- **Web Browsers**: For security reasons, JavaScript running inside a browser is **sandboxed** and strictly forbidden from directly reading or modifying files on the user's hard drive (otherwise malicious websites could steal or destroy your data).
- **Node.js**: Node.js is a server/desktop runtime environment. It has **full read, write, update, and delete access** to the filesystem through the built-in `node:fs` module.

---

## 2. Three Paradigms of `fs`: Synchronous, Callback, and Promises

Node.js provides three ways to perform filesystem operations:

### A. Synchronous API (`fs.*Sync`)
Blocks code execution until the operation completes.
- **When to use**: During initial app startup (e.g., reading a configuration file once when the server boots).
- **Drawback**: Never use inside web server request handlers; it freezes the entire server for all other users while reading/writing.
```javascript
const fs = require('node:fs');

// Synchronous Write
fs.writeFileSync('hello.txt', 'Hello, Synchronous World!');

// Synchronous Read
const content = fs.readFileSync('hello.txt', 'utf8');
console.log(content);
```

### B. Asynchronous Callback API (`fs.*`)
Non-blocking; Node.js offloads the disk task to background worker threads via `libuv` and invokes a callback function once done.
```javascript
const fs = require('node:fs');

fs.readFile('hello.txt', 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File content:", data);
});
```

### C. Asynchronous Promise API (`node:fs/promises`) ⭐ *(Modern Best Practice)*
Non-blocking and works cleanly with `async` / `await` and `try...catch` blocks.
```javascript
const fs = require('node:fs/promises');

async function handleFile() {
  try {
    await fs.writeFile('hello.txt', 'Hello with Promises!');
    const data = await fs.readFile('hello.txt', 'utf8');
    console.log("Read successfully:", data);
  } catch (error) {
    console.error("File error:", error.message);
  }
}
handleFile();
```

---

## 3. Explain All File Operations

### 1. `fs.writeFile` (Create or Overwrite File)
Creates a new file. If the file already exists, it **completely replaces** the existing content.
```javascript
const fs = require('node:fs/promises');

// Creates or overwrites 'message.txt'
await fs.writeFile('message.txt', 'Initial line of text\n', 'utf8');
```

### 2. `fs.readFile` (Read File Content)
Reads the contents of an existing file.
> [!IMPORTANT]
> If you do not provide an encoding like `'utf8'`, Node.js returns a raw binary `Buffer`. Always include `'utf8'` when reading plain text files.
```javascript
// Reading with utf8 encoding returns a string:
const text = await fs.readFile('message.txt', 'utf8');
console.log(text);
```

### 3. `fs.appendFile` (Add Content to End of File)
Adds new content to the end of a file without overwriting existing content. If the file does not exist, it creates it.
```javascript
await fs.appendFile('message.txt', 'This new line was appended!\n', 'utf8');
```

### 4. `fs.unlink` (Delete a File)
Deletes a specified file from disk.
```javascript
await fs.unlink('message.txt');
console.log('File deleted successfully');
```

### 5. `fs.copyFile` (Copy File)
Copies a file from a source path to a destination path.
```javascript
await fs.copyFile('source.txt', 'backup.txt');
console.log('File copied successfully');
```

### 6. `fs.rename` (Rename or Move a File)
Changes the name or directory location of a file.
```javascript
// Renaming a file:
await fs.rename('oldName.txt', 'newName.txt');

// Moving a file to another folder:
await fs.rename('newName.txt', 'archive/newName.txt');
```

### 7. `fs.access` (Check File Existence and Permissions)
Checks if a file or directory exists and tests whether your process has read or write permissions without opening it.
```javascript
const { constants } = require('node:fs');

try {
  await fs.access('hello.txt', constants.F_OK); // F_OK checks existence
  console.log('File exists!');
} catch {
  console.log('File does not exist!');
}
```

---

## 4. Explain All Directory Operations

### 1. `fs.mkdir` (Create Folder & Nested / Recursive Folders)
Creates a new directory. By default, it fails if parent folders do not exist.
- Use `{ recursive: true }` to create nested folders safely without throwing an error if they already exist.
```javascript
// Create a single directory:
await fs.mkdir('myFolder');

// Create nested directories recursively (e.g. parent/child/grandchild):
await fs.mkdir('parent/child/grandchild', { recursive: true });
```

### 2. `fs.readdir` (Read Directory & Listing Files)
Returns an array of file and directory names inside the target directory.
```javascript
const files = await fs.readdir('./');
console.log('Files in current directory:', files);

// With file types (distinguishes files vs folders):
const entries = await fs.readdir('./', { withFileTypes: true });
for (const entry of entries) {
  console.log(`${entry.name} - ${entry.isDirectory() ? 'Directory' : 'File'}`);
}
```

### 3. `fs.rmdir` vs `fs.rm` (Removing Directories)
- **`fs.rmdir`**: Older method; only deletes **empty** directories. Throws an error if the directory contains files.
- **`fs.rm`** *(Modern Best Practice)*: Deletes directories and their nested contents recursively:
```javascript
// Recursively remove directory and all files inside:
await fs.rm('parentFolder', { recursive: true, force: true });
```

---

## 5. File and Directory Information (`fs.stat`)

### What is "Stats" in File?
"Stats" is short for **status / metadata**. It contains operating system information about a file or directory (file size, creation time, permissions, whether it is a file or a folder).

### How to use and explain Stats:
```javascript
const fs = require('node:fs/promises');

async function checkStats() {
  const stats = await fs.stat('hello.txt');

  console.log("Is it a regular file?", stats.isFile());       // true / false
  console.log("Is it a directory?", stats.isDirectory());     // true / false
  console.log("File size in bytes:", stats.size);             // e.g. 1024
  console.log("Creation time:", stats.birthtime);             // Date object
  console.log("Last modified time:", stats.mtime);            // Date object
}
checkStats();
```

---

## 6. Rename, Copy, and Move Cheat Sheet

| Task | Promise Approach (`node:fs/promises`) | Synchronous Approach (`node:fs`) |
| :--- | :--- | :--- |
| **Rename File** | `await fs.rename('old.txt', 'new.txt')` | `fs.renameSync('old.txt', 'new.txt')` |
| **Copy File** | `await fs.copyFile('src.txt', 'copy.txt')` | `fs.copyFileSync('src.txt', 'copy.txt')` |
| **Move File** | `await fs.rename('src.txt', 'sub/src.txt')` | `fs.renameSync('src.txt', 'sub/src.txt')` |

---

## 7. Master Cheat Sheet for All `fs` Operations

| Operation | Asynchronous (Promises / `async-await`) | Synchronous (Blocking) |
| :--- | :--- | :--- |
| **Write File (Overwrite)** | `await fs.writeFile('file.txt', 'data', 'utf8')` | `fs.writeFileSync('file.txt', 'data')` |
| **Read File** | `const text = await fs.readFile('file.txt', 'utf8')` | `const text = fs.readFileSync('file.txt', 'utf8')` |
| **Append Content** | `await fs.appendFile('file.txt', 'more data')` | `fs.appendFileSync('file.txt', 'more data')` |
| **Delete File** | `await fs.unlink('file.txt')` | `fs.unlinkSync('file.txt')` |
| **Copy File** | `await fs.copyFile('a.txt', 'b.txt')` | `fs.copyFileSync('a.txt', 'b.txt')` |
| **Rename / Move** | `await fs.rename('old.txt', 'new.txt')` | `fs.renameSync('old.txt', 'new.txt')` |
| **Create Folder (Nested)**| `await fs.mkdir('a/b/c', { recursive: true })` | `fs.mkdirSync('a/b/c', { recursive: true })` |
| **List Folder Contents** | `const items = await fs.readdir('myFolder')` | `const items = fs.readdirSync('myFolder')` |
| **Delete Folder (Deep)** | `await fs.rm('myFolder', { recursive: true, force: true })` | `fs.rmSync('myFolder', { recursive: true, force: true })` |
| **Inspect File Stats** | `const stats = await fs.stat('file.txt')` | `const stats = fs.statSync('file.txt')` |
| **Check Existence** | `await fs.access('file.txt')` | `fs.existsSync('file.txt')` |

---

## Important Forgotten Concepts (Key Additions)

### 1. UTF-8 Encoding vs Buffers
If you forget to provide `'utf8'` as an encoding to `fs.readFile`, Node.js returns an instance of the `Buffer` class:
```javascript
const raw = await fs.readFile('hello.txt');
console.log(raw);
// Output: <Buffer 48 65 6c 6c 6f 2c 20 59 61 73 68>

// To convert buffer to text:
console.log(raw.toString('utf8')); // "Hello, Yash"
```

### 2. Streams for Large Files (`fs.createReadStream`)
Using `fs.readFile` loads the entire file into memory (RAM) all at once. If you read a 2 GB video or database dump, your application will crash with an out-of-memory error!
- **Solution**: Use Streams to process files in tiny 64 KB chunks:
```javascript
const fs = require('node:fs');

const readStream = fs.createReadStream('large-file.mp4');
const writeStream = fs.createWriteStream('copy.mp4');

// Pipe chunks continuously from source to destination without overflowing RAM:
readStream.pipe(writeStream);
```
