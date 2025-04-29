# To-Do List: Film2Trakt

This document tracks planned tasks, potential improvements, and known issues for the Film2Trakt extension.

## Features & Enhancements

- [ ] **Language Support - Broaden FilmAffinity Coverage:**

  - Add locale files (`messages.json`) for other languages (e.g., English `en`).
  - Update `manifest.json` `matches` pattern to include FilmAffinity URLs for other languages (e.g., `*://www.filmaffinity.com/en/film*.html`). Requires investigation into URL structures for different languages.

- [ ] **Direct Trakt API Integration (Major Feature):**

  - Investigate using the Trakt.tv API.
  - Implement OAuth 2.0 for user authentication with Trakt.
  - Use `chrome.storage` to securely store API tokens/user state.
  - Potential features enabled by API:
    - Display watched status directly on FilmAffinity.
    - Allow marking as watched/unwatched from FilmAffinity.
    - Allow adding to Trakt watchlist/lists from FilmAffinity.
    - Provide richer feedback/UI elements instead of just opening a search tab.

- [ ] **Options Page:**
  - Create an options page (`options.html`) accessible via the extension icon.
  - Allow users to configure settings (e.g., default action on click, API connection status if implemented).

## Improvements & Refactoring

- [ ] **Robustness - DOM Selectors:**
  - Basic selectors implemented in `content_script.js` (lines 7, 24, 80).
- [ ] **Robustness - DOM Selectors (remaining tasks):**

  - Add comments to document the purpose of CSS selectors.
  - Centralize CSS selectors into constants for easier maintenance.

- [x] **Error Handling - Basic Implementation:**
  - Basic error handling with try/catch blocks implemented.
  - Error logging to console implemented.
- [ ] **Error Handling - Improvements Needed:**

  - Replace `alert()` in `openTraktUrl` with `console.error` (line 68).
  - Add non-intrusive UI notification for errors.
  - Add explicit check after `getFilmaffinityTitle()` to ensure title was extracted.
  - Add context parameters to error logging functions.

- [x] **Code Structure:**
  - Basic function organization implemented.
- [ ] **Code Quality (remaining tasks):**

  - Wrap code in IIFE to prevent global scope pollution.
  - Prettier already configured, need to add ESLint.
  - Refactor for better separation of concerns.

- [x] **UI/UX - Button Styling:**
  - CSS styles for button implemented in `main.css`.
- [ ] **UI/UX - Improvements Needed:**

  - Remove redundant JavaScript hover handling (lines 87-93).
  - Move all hover effects to CSS.

- [x] **Performance - Basic Optimizations:**
  - Basic performance considerations in place.
- [ ] **Performance - Remaining Tasks:**
  - Evaluate necessity of external 'Figtree' font (lines 73-77).
  - Monitor content script impact on page load.

## Bugs & Known Issues

- **(None currently identified in v1.0, but monitor user feedback)**

## Security

- [ ] Implement checks to prevent multiple injections of the content script if the user navigates back/forward or reloads the page quickly.

## Documentation

- [x] **Code of Conduct:**
  - File `code_of_conduct.md` exists in `docs/public/`.
- [ ] **Setup Guide Updates:**
  - Add details about Node.js/npm usage if linters/build tools are introduced.
- [ ] **API Documentation:**
  - Needed if Trakt API integration is added.
- [ ] **Diagrams:**
  - Include in `project_structure.md` when architecture evolves.
- [x] **Changelog:**
  - File `changelog.md` exists in `docs/public/`.

## Deployment & Release

- [ ] **Publish to Chrome Web Store:**
  - Publish the extension.
  - Update store link in `setup_and_installation.md`.
- [ ] **Release Date:**
  - Fill placeholder in `changelog.md`.

## Future Considerations

- [ ] **Context Menu Integration:**
  - Right-click context menu option.
- [ ] **Testing:**
  - Implement automated tests.
- [ ] **Cross-Browser Compatibility:**
  - Investigate porting to Firefox.
