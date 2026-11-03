# Thread Pool & Libuv in Node.js

A comprehensive, beginner-friendly guide explaining what happens when requests arrive at a Node.js server, how libuv coordinates the Event Loop and Thread Pool, and how asynchronous non-blocking I/O works.

---

## 1. What Happens When a Request Comes to a Node.js Server?

Node.js runs your JavaScript code on a **single main thread**. When a client sends an HTTP request:

```
[Client Request]
       │
       ▼
[Node.js Server (Single Main Thread)]
       │
       ├──► Is it Synchronous (Blocking)?
       │      └──► Executed immediately on the Main Thread (Server waits; other requests must wait!)
       │
       └──► Is it Asynchronous (Non-Blocking)?
              └──► Delegated to libuv (OS Kernel or Worker Thread Pool)
                     └──► Main Thread is immediately free to serve other incoming requests!
                     └──► Once background work finishes, callback is pushed to the Event Loop.
```

### Detailed Step-by-Step Request Lifecycle:
1. **Request Received**: The request enters the Node.js event-driven server.
2. **Main Thread Inspects Task**:
   - If the task is **pure JavaScript/CPU computation** (like basic math or JSON parsing), the main thread executes it synchronously and immediately sends a response.
   - If the task is **I/O-heavy** (reading a file, querying a database, or making a network call), Node.js does **not** wait.
3. **Delegation via libuv**: Node.js hands off the heavy I/O task to **libuv**:
   - Network requests (HTTP, TCP, DNS) are delegated directly to the **Operating System Kernel** (using OS-level polling mechanisms like `epoll` on Linux, `kqueue` on macOS, or `IOCP` on Windows).
   - Filesystem operations, compression (`zlib`), and cryptography (`crypto`) are delegated to the **libuv Thread Pool**.
4. **Main Thread Remains Free**: While background workers or the OS kernel handle the heavy task, the single main thread continues handling new incoming user requests.
5. **Callback Queued**: When the background task completes, its callback function is placed into the **Event Loop Callback Queue**.
6. **Execution & Response**: As soon as the main thread call stack is empty, the Event Loop picks up the callback and executes it to return the response to the user.

---

## 2. Blocking (Synchronous) vs Non-Blocking (Asynchronous)

### A. Blocking (Synchronous)
Code that stops the execution of additional JavaScript until the current operation finishes.
- **Example**: `fs.readFileSync('large-file.txt')`
- **Impact**: While the file is being read from disk, the entire server freezes. No other user can log in, load pages, or fetch data.

### B. Non-Blocking (Asynchronous)
Code that registers a callback or promise and immediately allows the JavaScript engine to continue to the next line.
- **Example**: `fs.readFile('large-file.txt', callback)`
- **Impact**: The file is read in the background by worker threads. The server continues responding to hundreds of other users concurrently.

---

## 3. What is the Libuv Engine?

**libuv** is a high-performance, cross-platform open-source library written in the **C language**. It acts as the underlying engine beneath Node.js responsible for:
- Managing the **Event Loop**.
- Providing and managing the **Thread Pool**.
- Handling cross-platform asynchronous I/O (abstracting differences between Windows, macOS, and Linux).
- Managing file watching, timers (`setTimeout`, `setInterval`), child processes, and signal handling.

> **Analogy**: If the V8 engine is the brain that understands and executes JavaScript syntax, **libuv** is the muscle and nervous system that interacts with hardware, files, timers, and networks.

---

## 4. What is the Event Loop?

The **Event Loop** is a continuous, infinite loop managed by libuv that monitors the **Call Stack** (where JavaScript executes) and the **Callback Queues**.

### Core Rule of the Event Loop:
*"Whenever the Call Stack is empty, pick the next pending callback from the Queue and push it onto the Call Stack to be executed."*

This simple mechanism allows Node.js to achieve high concurrency without creating hundreds of expensive operating system threads.

---

## 5. What is the Thread Pool?

The **Thread Pool** is a collection of background worker threads maintained by **libuv** to perform tasks that the operating system cannot perform asynchronously at the kernel level.

### Default Size of the Thread Pool:
- The default libuv thread pool consists of **4 worker threads**.
- This means Node.js can execute up to **4 thread-pool tasks concurrently** in the background.
- If 5 heavy tasks arrive at the exact same moment, the 5th task must wait in the thread pool queue until one of the first 4 finishes.

---

## 6. When Does the Thread Pool Come Into Play?

> [!NOTE]
> **Not every asynchronous operation uses the thread pool!**

### Operations that DO use the Thread Pool:
1. **Filesystem Operations (`node:fs`)**: All asynchronous file operations (`fs.readFile`, `fs.writeFile`, `fs.stat`) because most operating systems do not provide true non-blocking file access APIs.
2. **Cryptography Functions (`node:crypto`)**: CPU-heavy tasks like `crypto.pbkdf2`, `crypto.scrypt`, and random byte generation.
3. **Compression (`node:zlib`)**: Compression and decompression algorithms (`zlib.gzip`, `zlib.deflate`).
4. **DNS Lookup (`dns.lookup`)**: Translating a hostname to an IP address uses system getaddrinfo, which runs in the thread pool.

### Operations that DO NOT use the Thread Pool:
- **Network I/O (`node:http`, `node:https`, `node:net`, WebSockets)**: Handled directly by OS asynchronous kernel mechanisms (`epoll` on Linux, `kqueue` on macOS, `IOCP` on Windows). They require zero worker threads!
- **Timers (`setTimeout`, `setInterval`)**: Handled directly by libuv's internal timer min-heap.

---

## Summary of Core Principles

- When Node.js encounters an asynchronous operation, it delegates the operation to the appropriate underlying mechanism (such as the OS kernel, libuv's Thread Pool, or its timer system) so the main JavaScript thread can continue executing.
- **Libuv** is a cross-platform open-source library written in C that handles asynchronous non-blocking operations in Node.js.
- The **Event Loop** is the mechanism that allows Node.js to keep processing JavaScript and handle asynchronous operations without waiting for each operation to finish.
- The **Thread Pool** is a group of worker threads that Node.js uses to perform certain tasks (like file I/O and crypto) in the background so the main thread doesn't have to wait. The default libuv thread pool has four workers.
- Think of **libuv** as the engine underneath Node.js that provides both the Event Loop and Thread Pool functionality.
- Not every asynchronous Node.js operation uses the thread pool; network calls use the OS kernel directly.

---

## Important Forgotten Concepts (Key Additions)

### 1. How to Change the Thread Pool Size (`UV_THREADPOOL_SIZE`)
You can increase or decrease the thread pool size up to **128 threads** using the environment variable `UV_THREADPOOL_SIZE`.
- On Windows (PowerShell):
  ```powershell
  $env:UV_THREADPOOL_SIZE = 8; node server.js
  ```
- On Linux / macOS:
  ```bash
  UV_THREADPOOL_SIZE=8 node server.js
  ```
- Inside JavaScript code (must be set before any async call):
  ```javascript
  process.env.UV_THREADPOOL_SIZE = 8;
  ```

### 2. Proving the Thread Pool Size with `crypto.pbkdf2`
Run 5 hashes simultaneously; the first 4 will finish at roughly the same time (~1 second), while the 5th will take ~2 seconds because it had to wait for an available thread in the pool of 4!
```javascript
const crypto = require('node:crypto');

const start = Date.now();
for (let i = 1; i <= 5; i++) {
  crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', () => {
    console.log(`Hash ${i} completed in: ${Date.now() - start}ms`);
  });
}
```
