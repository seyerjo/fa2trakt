# To-Do List: Film2Trakt

This document tracks planned tasks, potential improvements, and known issues for the Film2Trakt extension.

## Features & Enhancements

- **[ ] Language Support - Broaden FilmAffinity Coverage:**
  - Add locale files (`messages.json`) for other languages (e.g., English `en`).
  - Update `manifest.json` `matches` pattern to include FilmAffinity URLs for other languages (e.g., `*://www.filmaffinity.com/en/film*.html`). Requires investigation into URL structures for different languages.
- **[ ] Direct Trakt API Integration (Major Feature):**
  - Investigate using the Trakt.tv API.
  - Implement OAuth 2.0 for user authentication with Trakt.
  - Use `chrome.storage` to securely store API tokens/user state.
  - Potential features enabled by API:
    - Display watched status directly on FilmAffinity.
    - Allow marking as watched/unwatched from FilmAffinity.
    - Allow adding to Trakt watchlist/lists from FilmAffinity.
    - Provide richer feedback/UI elements instead of just opening a search tab.
- **[ ] Options Page:**
  - Create an options page (`options.html`) accessible via the extension icon.
  - Allow users to configure settings (e.g., default action on click, API connection status if implemented).

## Improvements & Refactoring

- **[ ] Robustness - DOM Selectors:**
  - Review and potentially improve the JavaScript selectors used in `content_script.js` to make them less brittle and more resilient to changes in FilmAffinity's website structure. Consider using more stable attributes or relative paths if possible.
  - Add comments in `content_script.js` to document the purpose of CSS selectors.
  - Centralize CSS selectors used in `content_script.js` into constants for easier maintenance.
- **[ ] Error Handling:**
  - Enhance error handling for edge cases (e.g., unusual title formats, network errors during API calls if implemented).
  - Replace `alert()` in `openTraktUrl` with `console.error` for better debugging and user experience.
  - Add non-intrusive UI notification for errors.
  - Add explicit check after `getFilmaffinityTitle()` to ensure a title was successfully extracted before proceeding.
  - Add context parameters to error logging functions (e.g., pass the title to `openTraktUrl`'s error log).
- **[ ] Code Quality:**
  - Wrap `content_script.js` code in an IIFE (Immediately Invoked Function Expression) to prevent global scope pollution.
  - Consider adding linters (e.g., ESLint) and formatters (e.g., Prettier) to enforce code style consistency.
  - Explore potential refactoring in `content_script.js` for better separation of concerns as features grow.
- **[ ] UI/UX - Feature 1:**
  - Review and refine the visual feedback and interaction flow when clicking the 'Search on Trakt' button (e.g., loading indicators, clearer success/error states beyond console logs).
- **[ ] Performance:**
  - Move button hover styles from JavaScript (`mouseover`/`mouseout` listeners in `content_script.js`) to CSS (`:hover` rule in `styles/main.css`).
  - Evaluate the necessity of the external 'Figtree' font. If needed, optimize its loading; otherwise, remove it from `content_script.js`.
  - Continuously monitor the performance impact of the content script on FilmAffinity page load times, especially if new features are added.

## Bugs & Known Issues

- **(None currently identified in v1.0, but monitor user feedback)**

## Security

- [ ] Implement checks to prevent multiple injections of the content script if the user navigates back/forward or reloads the page quickly.

## Documentation

- **[ ] Add Code of Conduct:** Create a `code_of_conduct.md` file and link to it from `contribution_guidelines.md`.
- **[ ] Update Setup Guide:** Add details about Node.js/npm usage if linters/build tools are introduced.
- **[ ] Add API Documentation (if implemented):** Document API usage, authentication flow, and data structures if Trakt API integration is added.
- **[ ] Add Diagrams:** Include recommended diagrams (Sequence, ERD if applicable later) in relevant documents like `project_structure.md`.
- **[ ] Update Changelog:** Keep `changelog.md` updated with every new release.

## Deployment & Release

- **[ ] Publish to Chrome Web Store & Update Docs:**
  - Publish the extension to the Chrome Web Store.
  - Update the link placeholder in `docs/setup_and_installation.md` with the official store link.
- **[ ] Add Release Date:** Fill in the `YYYY-MM-DD` placeholder in `changelog.md` for the v1.0 release.

## Future Considerations

- **[ ] Context Menu Integration:** Explore adding an option to trigger the Trakt search via the right-click context menu on the FilmAffinity page.
- **[ ] Testing:** Implement automated testing (e.g., unit tests for helper functions, potentially integration tests for core flows).
- **[ ] Cross-Browser Compatibility:** Investigate feasibility and effort required to port to other browsers like Firefox using the WebExtensions API.
