# Implementation Guide: Film2Trakt

This document outlines the development approach, coding standards, timeline considerations, and technical guidelines for building and maintaining the Film2Trakt extension.

## 1. Development Approach

- **Methodology:** Given the focused scope of the initial version (v1.0) and potential future enhancements, an **Iterative Development** approach is suitable.
  - **v1.0:** Focus on implementing the core functionality as defined in the requirements (`/docs/02_requirements.md`) and features (`/docs/12_features.md`). This includes button injection, title extraction, type detection, URL construction, tab opening, and basic i18n (Spanish).
  - **Future Iterations:** Subsequent features (e.g., broader language support, Trakt API integration, options page) listed in the To-Do list (`/docs/10_to_do_list.md`) will be tackled in separate iterations based on priority.
- **Branching Strategy:** A simple Git branching model is recommended:
  - `main`: Represents the latest stable, released version.
  - `develop` (Optional for initial phase, but recommended for future): Integration branch for upcoming release features.
  - `feat/feature-name`: Branches for developing new features.
  - `fix/bug-description`: Branches for fixing bugs.
  - Pull Requests (PRs) should be used to merge feature/fix branches into `develop` (or `main` initially), requiring review (see Contribution Guidelines).
- **Testing:** Manual testing is the primary method for v1.0. Developers should test thoroughly during development using the "Load unpacked" method in Chrome across various FilmAffinity movie and series pages. Automated testing should be considered for future iterations (see To-Do list).

## 2. Coding Standards

- **Core Principle:** All code MUST adhere strictly to the rules and conventions defined in the project's `.roo/rules/` directory. This includes:
  - General best practices for Chrome Extension development (`01_general.md`).
  - JavaScript/TypeScript style, naming conventions, functional patterns (`02_coding_style.md`).
  - UI/CSS guidelines (`03_ui_style.md`).
  - Performance considerations (`04_performance.md`).
  - Browser API usage patterns (`05_api_usage.md`).
  - Testing and debugging approaches (`06_test_and_debug.md`).
- **Key Highlights:**
  - Use Manifest V3.
  - Prioritize minimal permissions (`activeTab` for now).
  - Employ `chrome.i18n` for all user-facing strings and descriptive error messages.
  - Write clear, concise, and appropriately commented vanilla JavaScript (ES6+).
  - Ensure CSS is clean and follows conventions outlined.
  - Handle errors gracefully, providing informative logs and user feedback where necessary.

## 3. Timeline Estimates

- **v1.0 (Core Functionality):** Considered complete as per the initial documentation phase. The focus was on defining the existing state.
- **Future Enhancements:** Timelines for features listed in `/docs/11_to_do_list.md` are **To Be Determined (TBD)**. Estimation will occur when a specific feature is prioritized for development. Factors influencing estimates will include:
  - Complexity (e.g., Trakt API integration is significantly more complex than adding a new language).
  - Dependency on external factors (e.g., FilmAffinity website structure stability, Trakt API availability/changes).
  - Developer availability.

## 4. Technical Guidelines & Best Practices

- **Manifest V3 Compliance:** Strictly adhere to Manifest V3 requirements and limitations (e.g., background service workers instead of persistent pages if background tasks become necessary).
- **DOM Interaction Caution:** Be mindful that the extension's core logic relies heavily on the FilmAffinity page's DOM structure.
  - Use specific but potentially stable selectors (e.g., IDs like `#main-title` are preferred over complex CSS paths or index-based selectors).
  - Implement null checks and error handling around all DOM queries and manipulations (`querySelector`, `appendChild`, `textContent`, etc.).
  - Comment clearly which parts of the DOM are being targeted.
- **Asynchronous Operations:** Properly handle promises returned by Chrome APIs (like `chrome.tabs.create`) using `.then()/.catch()` or `async/await` syntax. Check `chrome.runtime.lastError` where applicable, especially within callbacks.
- **Security:**
  - Maintain the principle of least privilege for permissions. Only request permissions essential for functionality.
  - Sanitize any data potentially derived from the web page if it were ever used in a sensitive context (not currently applicable, but important for future features).
  - Keep the Content Security Policy (`content_security_policy` in `manifest.json`) as restrictive as possible while allowing necessary operations.
- **Internationalization (i18n):**
  - Ensure _all_ new user-visible strings or descriptive error/log messages are added to `messages.json` files and accessed via `chrome.i18n.getMessage()`.
  - Maintain consistency in naming message keys.
- **Performance:**
  - Content scripts should execute quickly and avoid blocking the main thread of the host page.
  - Minimize complex computations or heavy DOM manipulation on page load. Defer actions to user interaction (like the button click) whenever possible.
- **Code Reviews:** All code contributions (via Pull Requests) must be reviewed by at least one other team member (if applicable) or the maintainer, focusing on adherence to standards, functionality, and potential issues.
