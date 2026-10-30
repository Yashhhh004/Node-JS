# Introduction to Node.js

## What is Node.js?
Node.js is an open-source, cross-platform JavaScript runtime environment that allows you to run JavaScript code outside of a web browser (such as on your computer or a web server).

- It was created by **Ryan Dahl** in **2009**.
- Before Node.js, JavaScript could only run inside web browsers (like Chrome, Firefox, or Safari) to make web pages interactive. Node.js brought JavaScript to the backend/server side.

---

## Why do we need Node.js?
1. **Single Language for Full Stack**: You can use JavaScript for both frontend (in the browser) and backend (on the server). You don't need to learn a separate backend language like PHP, Java, or Python if you already know JavaScript.
2. **Fast and Efficient**: It is powered by Google Chrome's V8 engine, which compiles JavaScript directly into machine code.
3. **Asynchronous & Non-Blocking**: Node.js handles multiple requests simultaneously without waiting for one task to finish before starting another (ideal for I/O-heavy applications like chat apps, APIs, and streaming services).
4. **Huge Ecosystem**: It has access to **npm** (Node Package Manager), the largest registry of free, reusable software libraries in the world.

---

## V8 + C++ = Node.js?
Yes! That is the core formula behind how Node.js was built:

- **V8 Engine**: Google Chrome's open-source JavaScript engine, written in C++, which takes JavaScript code and compiles it into fast machine code.
- **C++ Layer**: Provides low-level operating system access that JavaScript in the browser cannot do (such as reading/writing local files, managing network sockets, and accessing hardware).
- **libuv**: A C library used by Node.js to provide an asynchronous, event-driven I/O loop and thread pool.

So:
$$\text{Node.js} = \text{V8 Engine} + \text{C++ Core APIs} + \text{libuv (Event Loop)}$$

---

## Node.js is a runtime environment, not a language, library, or framework
- **Not a Language**: The language you write is **JavaScript**.
- **Not a Library**: A library is a collection of helper functions you call inside your code (like React, Lodash, or Axios).
- **Not a Framework**: A framework provides a rigid architecture and blueprint for your application (like Express.js, Nest.js, or Next.js).
- **It is a Runtime Environment**: A runtime is a complete program that provides everything needed to execute code outside the browser. It gives JavaScript access to system resources like the filesystem, network, and operating system.

---

## Browser vs Node.js

| Feature | Browser | Node.js |
| :--- | :--- | :--- |
| **Primary Purpose** | Display UI and interact with web pages | Build servers, APIs, CLI tools, scripts |
| **JavaScript Engine** | V8 (Chrome), SpiderMonkey (Firefox), JavaScriptCore (Safari) | Google Chrome V8 engine |
| **DOM / Window Objects** | Available (`window`, `document`, `HTMLElement`) | Not available (no HTML page or DOM exists) |
| **Global Object** | `window` | `global` (or `globalThis` in modern JS) |
| **Filesystem Access** | Blocked for security reasons | Full access via the built-in `fs` module |
| **Operating System Access** | Blocked | Full access via built-in `os` and `process` modules |
| **Module System** | ES Modules (`import` / `export`) | CommonJS (`require` / `module.exports`) and ES Modules |

---

## Important Forgotten Concepts (Key Additions)

### 1. How Node.js Works: The Event Loop & Single Thread
- Node.js runs on a **single main thread** using an **Event Loop**.
- For heavy tasks like file reading or network requests, Node.js delegates the work to the background (via the `libuv` thread pool) and continues executing other code.
- Once the background work is ready, a callback function is pushed to the Event Loop to return the result. This prevents the server from freezing or getting blocked.

### 2. What Can You Build with Node.js?
- **RESTful APIs & Web Servers**: Fast backend APIs (commonly using Express.js).
- **Real-Time Applications**: Chat applications, live multiplayer games, and collaborative tools (using WebSockets / Socket.io).
- **Command-Line Tools (CLI)**: Utilities you run in the terminal.
- **Microservices & Automation Scripts**: Automating file handling, web scraping, and database management.