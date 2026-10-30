# Complete Node.js Learning Repository

Welcome to the **Complete Node.js** master course repository. This repository is structured into sequential modules designed for step-by-step learning of backend development with Node.js, starting from runtime fundamentals all the way to building HTTP servers and REST APIs.

---

## 📚 Curriculum & Modules Table of Contents

| # | Topic / Module | Description | Guide / Notes |
| :-: | :--- | :--- | :--- |
| **01** | **[Introduction to Node.js](./01_Introduction_Of_NodeJs)** | What Node.js is, V8 engine + C++ layer + libuv, runtime vs language, browser vs Node.js, installation (LTS, Current, nvm). | [README.md](./01_Introduction_Of_NodeJs/README.md) & [INSTALLATION.md](./01_Introduction_Of_NodeJs/INSTALLATION.md) |
| **02** | **[Running First Code](./02_First_Code_Of_NodeJs)** | Terminal commands, running scripts, the interactive Node REPL, `process.argv`, and watch mode (`--watch`). | [README.md](./02_First_Code_Of_NodeJs/README.md) |
| **03** | **[JavaScript Revision](./03_JavaScript_Revision)** | Comprehensive refresher: `let/var/const`, hoisting & TDZ, datatypes, stack vs heap, truthy/falsy, `?.` and `??`, array methods, async/await, and rest/spread. | [README.md](./03_JavaScript_Revision/README.md) |
| **04** | **[npm Guide](./04_npm)** | Node Package Manager, dependencies vs devDependencies, scripts, Semantic Versioning (SemVer: `^`, `~`, exact), and `package-lock.json`. | [README.md](./04_npm/README.md) |
| **05** | **[Modules in Node.js](./05_Module_In_NodeJs)** | What modules are, CommonJS (`require` / `module.exports`) vs ES Modules (`import` / `export`), default vs named exports, and wrapper functions. | [README.md](./05_Module_In_NodeJs/README.md) |
| **06** | **[Core & Third-Party Modules](./06_Core_And_Third_Party_Module)** | Core modules (`node:fs`, `node:path`, `node:http`), local modules, third-party libraries (Express), module caching, and security audits. | [README.md](./06_Core_And_Third_Party_Module/README.md) |
| **07** | **[File System (`fs`)](./07_File_System)** | Files and directories, sync vs callback vs promises (`fs/promises`), file CRUD operations, stats metadata, and complete operations cheat sheet. | [README.md](./07_File_System/README.md) |
| **08** | **[Thread Pool & Libuv](./08_Thread_Pool_In_NodeJs)** | Request lifecycles, blocking vs non-blocking I/O, libuv engine, Event Loop mechanics, worker thread pool sizing (`UV_THREADPOOL_SIZE`). | [README.md](./08_Thread_Pool_In_NodeJs/README.md) |
| **09** | **[Path Module](./09_Path_Module_In_NodeJs)** | Cross-platform paths, Windows (`\`) vs POSIX (`/`), `path.join` vs `path.resolve`, `path.parse`, and Node.js globals (`__dirname`, `__filename`, `process`). | [README.md](./09_Path_Module_In_NodeJs/README.md) |
| **10** | **[Server in Node.js](./10_Server_In_NodeJs)** | What a server is, HTTP servers, the client-server lifecycle, creating an HTTP server with `node:http`, `createServer`, and `server.listen`. | [README.md](./10_Server_In_NodeJs/README.md) |
| **11** | **[Server Terminologies](./11_Server_Terminologies)** | 15 essential concepts: client, server, request keys (`req.url`, `req.method`), response (`res.end`), IP address, domain, DNS, localhost, port, headers, and status codes. | [README.md](./11_Server_Terminologies/README.md) |
| **12** | **[HTTP Methods](./12_HTTP_Methods_In_NodeJs)** | HTTP verbs (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`), CRUD mapping, PUT vs PATCH differences, safe vs idempotent methods, and CORS preflight (`OPTIONS`). | [README.md](./12_HTTP_Methods_In_NodeJs/README.md) |

---

## 🚀 How to Run Any Lesson

1. Open your terminal in the root directory.
2. Navigate into the desired module folder:
   ```bash
   cd 10_Server_In_NodeJs
   ```
3. Run the script:
   ```bash
   node server.js
   ```
4. For modules that include a `package.json` with external dependencies (e.g. `06_Core_And_Third_Party_Module`), install dependencies first:
   ```bash
   cd 06_Core_And_Third_Party_Module
   npm install
   node server.js
   ```
