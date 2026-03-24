# Working Memory: Film2Trakt

## Summary and Current Status

The project is a Chrome Extension currently at version `1.0.4`. It serves as a bridge between FilmAffinity and Trakt.tv. The extension injects a styled "Search on Trakt" button into Spanish FilmAffinity pages (`www.filmaffinity.com/es/film*.html`), extracting the movie or series title and opening a corresponding search query on Trakt.tv in a new tab.

The core architecture follows Manifest V3 standards. It uses a **Resilient Event-Driven Content Script** built with vanilla JavaScript (ES6+) encapsulated within an IIFE (`content_script.js`), and relies entirely on CSS for styling and hover states (`styles/main.css`). The project includes basic error handling through localized i18n messages (`es` default locale) and minimizes required permissions (currently only using `activeTab`).

The immediate goal (v1.1) is to polish foundational elements: improving the tab-opening mechanism (`window.open` -> `chrome.tabs.create`), replacing the harsh UI `alert()`, separating logic in `content_script.js`, handling edge case bugs (multiple injections), and adding English site support (`/en/`).

The next major milestone (v2.0) will shift the focus to direct Trakt API integration (OAuth, `chrome.storage`, Options Page).

## Key Implementation Details

1.  **Architecture:** All source code is housed in the `/src` folder. `manifest.json` maps directly to `src/content_script.js` and `src/styles/main.css`.
2.  **DOM Selectors:** Centralized within the `SELECTORS` object in `content_script.js` (e.g., `h1#main-title`, `.movie-type .type`) for easy maintenance if FilmAffinity changes its DOM.
3.  **UI & Styling:** Injection is done directly via DOM API. Styling and interactive states are purely CSS-driven. System fonts are utilized for performance.
4.  **Error Handling:** Currently relies on `try...catch` blocks that output localized `console.error` logs and a synchronous `alert()` if a URL fails to open.
5.  **Language Standards:** Code, files, and variables are strictly in English. Chat responses with the user are in Spanish. The extension's localization currently supports Spanish (`es`).

## Current Session Log

- Executed `Review Memory Bank` trigger, reading and analyzing the initial requirements, to-do lists, architecture overview, and change history.
- Realized the `docs/12_working_memory.md` file was missing and required creation.
- Was instructed to pause creation to read through the entire set of `docs/` files (01-11) to build a deep, contextual understanding of the project's "North Star", limitations, and future API goals.
- Was instructed to read all core configuration and code in the `src/` directory (`content_script.js`, `manifest.json`).
- Successfully created this `docs/12_working_memory.md` document from scratch, summarizing the newly learned project context and status without modifying any existing source code or application logic.
