# iyf-s12-week-07-Stephen-Dev254

JavaScript Best Practices
# Week 7: JavaScript Best Practices — Persistent Modular To-Do List

## Author
- **Name:** Stephen Muriu
- **GitHub:** @Stephen-Dev254
- **Date:** November 13, 2026

## Project Description
A refactored, production-ready version of my Week 5 To-Do List application built to demonstrate JavaScript best practices, clean architecture, and data persistence. The application separates business logic from DOM manipulation and storage, persists tasks and active filters across browser reloads using `localStorage`, enforces code quality with ESLint 9 and Prettier, and verifies pure functions with automated Vitest unit tests.

This repository also includes the Lesson 13 Shopping Cart build (`cart/`) featuring centralized state and an undo history stack, as well as practice exercises (`daily-challenges/`) covering `localStorage`, `sessionStorage`, state patterns, clean code, and debugging.

## Technologies Used
- **HTML5** — Semantic structure and ES Module script loading (`type="module"`)
- **CSS3** — Responsive flexbox/grid layouts, hover states, and clean class-based styling
- **JavaScript (ES2024+ / ES Modules)** — Modular separation of concerns (`app.js`, `state.js`, `storage.js`, `todo-logic.js`, `ui.js`)
- **Web Storage API** — `localStorage` and `sessionStorage` with JSON serialization and safe error recovery
- **Node.js & npm** — Package management and script automation
- **Vitest** — Fast unit testing framework for pure data-transformation functions
- **ESLint 9 & Prettier** — Automated static code analysis and consistent code formatting

## Features
- **Full Data Persistence:** Tasks, completion status, and active filter tabs survive page refreshes via `localStorage` and safely fall back to defaults if stored JSON is corrupted.
- **Modular ES Architecture:** Split into single-responsibility modules (`storage.js`, `todo-logic.js`, `state.js`, `ui.js`, and `app.js`) for maintainability and testability.
- **Interactive Task Management:** Add tasks, toggle completion via unified event delegation, double-click active tasks for inline editing, filter by All / Active / Completed, and clear completed items.
- **Automated Unit Testing:** 10 Vitest unit tests covering task creation, toggling, deletion, editing, filtering, counting, immutability, and edge cases.
- **Lesson 13 Shopping Cart (`cart/`):** Interactive product catalog and persistent cart with dynamic totals, item count badges, and an undo history stack.

## Repository Structure
```text
iyf-s12-week-07-Stephen-Dev254/
├── index.html              # Main To-Do List entry point
├── styles.css              # Application styles
├── js/
│   ├── app.js              # Entry point and DOM event wiring
│   ├── state.js            # Centralized state and persistence commit actions
│   ├── storage.js          # Safe localStorage load/save helpers
│   ├── todo-logic.js       # Pure functions (no DOM, no localStorage)
│   └── ui.js               # DOM rendering and inline editing UI
├── tests/
│   └── todo-logic.test.js  # Vitest unit tests for pure functions
├── cart/                   # Lesson 13 Shopping Cart class build
├── daily-challenges/       # Lesson 13 & 14 practice tasks
├── eslint.config.js        # ESLint 9 flat configuration
├── .prettierrc             # Prettier formatting rules
├── package.json            # Project scripts and devDependencies
├── package-lock.json       # Locked dependency tree
├── .gitignore              # Excludes node_modules/
└── README.md               # Project documentation
```

## How to Run
1. **Clone this repository:**
   ```bash
   git clone https://github.com/iyf-s12-week-07-Stephen-Dev254.git
   cd iyf-s12-week-07-Stephen-Dev254
   ```
2. **Install development dependencies (Vitest, ESLint, Prettier):**
   ```bash
   npm install
   ```
3. **Run the application in the browser:**
   - Open `index.html` using **VS Code Live Server** (or any local HTTP server, as ES Modules require HTTP rather than `file://`).
   - Open `cart/index.html` with Live Server to view the Lesson 13 Shopping Cart build.
4. **Run automated tests and code quality checks:**
   ```bash
   npm test       # Run Vitest unit tests once
   npm run lint   # Check code quality with ESLint
   npm run format # Format code with Prettier
   ```

## Lessons Learned
- **Pure Functions Enable Unit Testing:** Extracting data transformations (`addTodoItem`, `toggleTodoItem`, `deleteTodoItem`, `getFilteredTodos`) into `js/todo-logic.js` with zero DOM or `localStorage` dependencies made writing fast, reliable Vitest tests straightforward.
- **Single Source of Truth & Persistence:** Loading from `localStorage` once at startup and saving through a centralized `commit()` helper keeps in-memory state and persisted storage synchronized.
- **ESLint 9 Flat Config & Prettier:** Configuring `eslint.config.js` with strict rules (`no-var`, `eqeqeq`, `curly`) catches subtle bugs early and keeps code consistent across modules.

## Challenges Faced
- **Module Loading & CORS Restrictions:** Loading `js/app.js` with `type="module"` failed when opened directly via `file://`. Solved by serving the project over HTTP via VS Code Live Server and ensuring all relative imports include explicit `.js` extensions.
- **Handling Corrupted or Empty Storage:** Initial reads from `localStorage` could return `null` or malformed JSON. Solved by wrapping `JSON.parse` inside a `try/catch` block in `js/storage.js` and validating array types before initializing application state.

## Collaboration
- **Team / partner:** @HellenWamuciiNjue
- **PR I opened:** https://github.com/Stephen-Dev254/iyf-s12-week-07-Stephen-Dev254/pull/1
- **PR I reviewed:** https://github.com/HellenWamuciiNjue/iyf-s12-week-07-HellenWamuciiNjue/pull/1
- **Review I wrote:**https://github.com/HellenWamuciiNjue/iyf-s12-week-07-HellenWamuciiNjue/pull/1#pullrequestreview-5896297391

## Live Demo (if deployed)
[View Live Demo]   https://stephen-dev254.github.io/iyf-s12-week-07-Stephen-Dev254/


