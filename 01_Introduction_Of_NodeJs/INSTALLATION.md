# Node.js & npm Installation Guide

## How to install Node.js?
1. **Official Website (Standard Way)**:
   - Go to [nodejs.org](https://nodejs.org/).
   - You will see two download options: **LTS** (recommended for most users) and **Current**.
   - Download the **LTS installer** for your operating system (Windows, macOS, or Linux).
   - Run the downloaded installer and follow the setup wizard (keep the default settings).

2. **Using a Version Manager (Recommended for Developers)**:
   - On Windows: Use **nvm-windows** ([github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)).
   - On macOS/Linux: Use **nvm** (Node Version Manager).
   - A version manager lets you easily switch between multiple Node.js versions on the same machine without uninstalling.

3. **Verify Installation**:
   Open your terminal (PowerShell, Command Prompt, or bash) and run:
   ```bash
   node -v
   # or
   node --version
   ```
   If it prints a version number (for example: `v20.18.0`), Node.js is installed successfully!

---

## How to install npm?
- **You do NOT need to install npm separately!**
- npm (Node Package Manager) comes **automatically bundled** with the official Node.js installer.
- To verify your npm installation, run:
  ```bash
  npm -v
  ```
- To update npm to the latest version at any time, run:
  ```bash
  npm install -g npm@latest
  ```

---

## Version Terms:
When you visit the Node.js website, you will encounter these terms:

### 1. LTS (Long Term Support) ⭐ *(Recommended)*
- **What it is**: A stable, battle-tested version that receives critical bug fixes and security updates for at least **30 months**.
- **When to use**: Always use the **LTS** version for real-world production projects, team development, and learning. It offers maximum stability and broad compatibility with external packages.

### 2. Current
- **What it is**: The latest release containing the newest JavaScript features, experimental APIs, and performance updates.
- **When to use**: Use Current if you want to experiment with bleeding-edge JavaScript features. It may occasionally contain breaking changes or have incomplete third-party package support.

### 3. EOL (End Of Life)
- **What it is**: An older Node.js version that is no longer supported or maintained by the Node.js core team.
- **Warning**: Never use EOL versions for production apps because they do not receive critical security patches or bug fixes.

---

## What is npm?
**npm** stands for **Node Package Manager**. It consists of three parts:
1. **The CLI (Command-Line Interface)**: The terminal command `npm` that lets you install, update, and manage code packages for your projects.
2. **The Online Registry**: A massive online public database of free, open-source JavaScript packages (accessible at [npmjs.com](https://www.npmjs.com)).
3. **The Website**: Where developers can search for packages, read documentation, and manage user profiles.

---

## Important Forgotten Concepts (Key Additions)

### 1. Useful Global vs Local Node Commands
- `node`: Opens the interactive Node.js REPL (Read-Eval-Print Loop) directly in your terminal.
- `node <filename>.js`: Runs a specific JavaScript file.
- `which node` (Mac/Linux) or `where node` (Windows): Shows the exact directory where Node.js is installed.

### 2. Managing Node.js with nvm (Cheat Sheet)
```bash
nvm list          # List installed Node versions on your machine
nvm install 20    # Install the latest version 20
nvm use 20        # Switch to Node version 20
```


