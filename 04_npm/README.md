# npm (Node Package Manager) Guide

A comprehensive, beginner-friendly guide answering all core npm questions with clear explanations and examples.

---

## `npm -v`
The command used in your terminal to check the currently installed version of npm.
```bash
npm -v
# Output example: 10.8.2
```

---

## What is npm?
**npm** stands for **Node Package Manager**. It is the default package management system for Node.js and the largest software registry in the world. It consists of:
1. **CLI (Command Line Tool)**: The `npm` command installed on your computer to download, update, and manage dependencies.
2. **Registry**: A public cloud database hosting hundreds of thousands of open-source packages ([npmjs.com](https://www.npmjs.com)).
3. **Website**: A portal to browse packages, view documentation, and inspect security alerts.

---

## How to install a dependency?
To install a package that your application needs to run in production (regular dependency):
```bash
npm install <package-name>
# or shorthand:
npm i <package-name>
```
*Example:*
```bash
npm i express
```
This adds the package under `"dependencies"` in your `package.json` and downloads the files into the `node_modules/` folder.

---

## How to install a Dev-dependency?
Dev-dependencies are packages only needed during **development and testing** (such as linters, testing frameworks, compilers, or reloaders like nodemon). They are not needed when running the app in production.

To install a dev-dependency, use the `-D` or `--save-dev` flag:
```bash
npm install <package-name> --save-dev
# or shorthand:
npm i -D <package-name>
```
*Example:*
```bash
npm i -D nodemon
```
This adds the package under `"devDependencies"` in your `package.json`.

---

## How to delete dependencies?
To remove an installed dependency from both your `node_modules/` and your `package.json`:
```bash
npm uninstall <package-name>
# or shorthand:
npm un <package-name>
```
*Example:*
```bash
npm un lodash
```

---

## How to run scripts?
In your `package.json`, there is a `"scripts"` section where you can define custom terminal commands:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "build": "webpack"
}
```

### To execute a custom script:
```bash
npm run <script-name>
# Example:
npm run dev
npm run build
```

### Special shortcuts:
For `start` and `test`, you do **not** need the word `run`:
```bash
npm start   # directly runs whatever is defined in "start"
npm test    # directly runs whatever is defined in "test"
```

---

## Why do we use npm?
1. **Dependency Management**: Easily install, update, and remove third-party libraries with single commands.
2. **Version Control**: Ensures all developers and production servers use compatible package versions via `package.json` and `package-lock.json`.
3. **Task Automation**: Run custom build, test, and dev scripts via `npm run`.
4. **Code Sharing**: Allows you to publish and share your own libraries with the global developer community.

---

## Why do we use npm packages?
- **Avoid Reinventing the Wheel**: High-quality packages already exist for common tasks (e.g., password hashing with `bcrypt`, handling HTTP requests, date formatting).
- **Time Savings**: Focus on building your unique application features instead of writing low-level utilities from scratch.
- **Community Tested**: Popular packages are tested by thousands of developers, with bugs and security vulnerabilities reported and patched quickly.

---

## What is Semantic Versioning (SemVer)?
Semantic Versioning is a standardized 3-part versioning system:
$$\text{MAJOR} . \text{MINOR} . \text{PATCH}$$

*Example:* `4.18.9`

| Segment | Represents | When it changes | Example |
| :--- | :--- | :--- | :--- |
| **MAJOR** (`4`) | Breaking changes | Incompatible API changes that may break older code | `5.0.0` |
| **MINOR** (`18`) | New features | Added functionality in a backwards-compatible manner | `4.19.0` |
| **PATCH** (`9`) | Bug fixes | Backwards-compatible bug fixes and patches | `4.18.10` |

---

## How to install a particular version of libs in npm?
Use the `@` symbol followed by the specific version number:
```bash
npm install <package-name>@<version>
```
*Examples:*
```bash
npm i express@4.18.2
npm i mongoose@7.0.0
npm i react@18.2.0
```

---

## What are the version symbols and Explain Each of them?

When dependencies are saved in `package.json`, symbols prefix the version numbers:

### 1. Caret (`^`) ⭐ *(Default in npm)*
Allows updates to newer **Minor** and **Patch** versions, but **not Major** (breaking) versions.
- Example: `^4.18.9` permits any version from `>=4.18.9` up to `<5.0.0`.

### 2. Tilde (`~`)
Allows updates to newer **Patch** versions only, but freezes the Major and Minor versions.
- Example: `~4.18.9` permits any version from `>=4.18.9` up to `<4.19.0`.

### 3. Exact Version (No symbol)
Locks the dependency to that exact release only. No automatic updates.
- Example: `"express": "4.18.9"` will only ever install version `4.18.9`.

### 4. Wildcard (`*` or `x`)
Accepts any version, including breaking major releases (generally dangerous, not recommended).
- Example: `*` or `4.x`.

---

## Explain this: `^4.18.9`
- `4` is the **MAJOR** version (breaking API changes).
- `18` is the **MINOR** version (new features, backwards compatible).
- `9` is the **PATCH** version (bug fixes).
- The `^` (caret) instructs npm: *"When running `npm update` or fresh `npm install`, you may install newer bug fixes (`4.18.10`) or newer minor features (`4.19.0`), but DO NOT install version `5.0.0` or higher because it might break my application."*

---

## Important Forgotten Concepts (Key Additions)

### 1. `npm init` and `npm init -y`
Before installing any packages in a new project, you must initialize `package.json`:
- `npm init`: Interactive prompt asking for name, version, description, entry point, etc.
- `npm init -y`: Generates `package.json` immediately with all default values.

### 2. `package.json` vs `package-lock.json`
- **`package.json`**: High-level manifest listing the project's metadata, scripts, and dependencies (usually with version ranges like `^4.18.9`).
- **`package-lock.json`**: An auto-generated file that locks the **exact** dependency tree (exact version numbers down to sub-dependencies and their integrity hashes).
  > **Crucial Rule**: Always commit `package-lock.json` to Git so that everyone on your team and production servers install the exact same packages.

### 3. `npx` (Node Package Execute)
A tool bundled with npm that allows you to execute an npm package without installing it globally:
```bash
# Runs a package directly from the npm registry
npx create-react-app my-app
```

### 4. Why `node_modules` must NEVER be committed to Git
The `node_modules/` folder can easily contain tens of thousands of files and hundreds of megabytes.
- Always add `node_modules/` to your [`.gitignore`](../.gitignore).
- Anyone downloading your project simply runs `npm install`, and npm reconstructs the entire folder from `package.json`.





