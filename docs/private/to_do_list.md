# To-Do List: Film2Trakt

This document tracks planned tasks, potential improvements, and known issues for the Film2Trakt extension.

## Features & Enhancements

### Short-term (v1.x)

- [x] **UI/UX - Button Styling:**

  - CSS styles for button implemented in `main.css`.

- [ ] **UI/UX - Improvements Needed:**

  - Remove redundant JavaScript hover handling (lines 87-93).
  - Move all hover effects to CSS.

- [ ] **Error Handling - Improvements Needed:**
  - Replace `alert()` in `openTraktUrl` with `console.error` (line 68).
  - Add non-intrusive UI notification for errors.
  - Add explicit check after `getFilmaffinityTitle()` to ensure title was extracted.
  - Add context parameters to error logging functions.

### Medium-term (v2.0)

- [ ] **Options Page:**

  - Create an options page (`options.html`) accessible via the extension icon.
  - Allow users to configure settings (e.g., default action on click, API connection status if implemented).

- [ ] **Direct Trakt API Integration (Major Feature):**
  - Investigate using the Trakt.tv API.
  - Implement OAuth 2.0 for user authentication with Trakt.
  - Use `chrome.storage` to securely store API tokens/user state.
  - Potential features enabled by API:
    - Display watched status directly on FilmAffinity.
    - Allow marking as watched/unwatched from FilmAffinity.

### Long-term

- [ ] **Language Support - Broaden FilmAffinity Coverage:**

  - Add locale files (`messages.json`) for other languages (e.g., English `en`).
  - Update `manifest.json` `matches` pattern to include FilmAffinity URLs for other languages.

- [ ] **Direct Trakt API Integration - Advanced Features:**
  - Allow adding to Trakt watchlist/lists from FilmAffinity.
  - Provide richer feedback/UI elements instead of just opening a search tab.

## Improvements & Refactoring

### Completed

- [x] **Robustness - DOM Selectors (FEAT-02, FEAT-03):**

  - Centralized selectors in `SELECTORS` constant object
  - Added error handling for missing elements
  - Documented expected DOM structure in comments
  - Supports title extraction and content type detection

- [x] **Error Handling - Basic Implementation (FEAT-05, FEAT-06):**

  - Basic try/catch error handling
  - Console logging for errors
  - Internationalized error messages

- [x] **Code Structure (FEAT-04):**

  - Basic function organization
  - Includes URL construction logic

- [x] **UI/UX - Button Styling (FEAT-01):**

  - CSS styles implemented in `main.css`
  - Complies with NFR-01, NFR-02

- [x] **Performance - Basic Optimizations:**
  - Use of system fonts
  - Replaced external font
  - Addresses NFR-03

### Short-term (v1.x)

- [ ] **UI/UX - Improvements Needed:**
  - Remove redundant JavaScript hover handling
  - Move all hover effects to CSS
- [ ] **Error Handling - Improvements:**
  - Replace alert() with console.error
  - Add non-intrusive UI notifications
  - Add context to error logs
- [ ] **Robustness - DOM Selectors:**
  - Document CSS selectors purpose
  - Centralize CSS selectors
- [ ] **Performance - Optimizations:**
  - Cache DOM selectors
  - Memoize isFilmaffinitySeries()
  - Dynamic CSS injection
  - Monitor page load impact

### Medium-term (v2.0)

- [ ] **Code Quality:**
  - Wrap code in IIFE
  - Add ESLint
  - Improve separation of concerns
- [ ] **UI/UX - Icon Design:**
  - Create and implement custom icon
  - Ensure icon guidelines compliance

## Bugs & Known Issues

### Edge Cases & Potential Issues

- [ ] **DOM Structure Changes:**

  - Button injection fails if FilmAffinity changes title element structure
  - Title extraction breaks if span hierarchy changes

- [ ] **Multiple Injections:**

  - Possible duplicate buttons if content script runs multiple times
  - Being addressed in Security improvements

- [ ] **Title Handling:**

  - Empty titles not gracefully handled in all flows
  - Special characters in titles may affect URL encoding

- [ ] **Content Type Detection:**
  - May fail on non-standard page layouts
  - No fallback mechanism for ambiguous cases

### Current Status

- No critical bugs reported in v1.0
- Monitoring user feedback for edge cases

## Security

### Short-term (v1.x)

- [ ] Implement checks to prevent multiple injections of the content script if the user navigates back/forward or reloads the page quickly.

## Documentation

### Completed

- [x] **Code of Conduct:**
  - File `code_of_conduct.md` exists in `docs/public/`.
- [x] **Changelog:**
  - File `changelog.md` exists in `docs/public/`.

### Medium-term (v2.0)

- [ ] **Setup Guide Updates:**
  - Add details about Node.js/npm usage if linters/build tools are introduced.
- [ ] **Diagrams:**
  - Include in `project_structure.md` when architecture evolves.

### Long-term

- [ ] **API Documentation:**
  - Needed if Trakt API integration is added.

## Deployment & Release

### Short-term (v1.x)

- [ ] **Publish to Chrome Web Store:**
  - Publish the extension.
  - Update store link in `setup_and_installation.md`.
- [ ] **Release Date:**
  - Fill placeholder in `changelog.md`.

## Future Considerations

### Medium-term (v2.0)

- [ ] **Keyboard Shortcuts:**

  - Add support for quick search via keyboard shortcuts
  - Map common actions to key combinations

- [ ] **UI Customization:**

  - Allow button position/style customization
  - Add theme support (light/dark mode)

- [ ] **Automatic Language Detection:**
  - Detect FilmAffinity language from URL
  - Fallback to browser language if needed

### Long-term

- [ ] **Trakt Ratings Display:**

  - Fetch and show Trakt ratings alongside FilmAffinity's
  - Cache ratings for performance

- [ ] **Context Menu Integration:**

  - Right-click context menu option.

- [ ] **Testing:**

  - Implement automated tests.

- [ ] **Cross-Browser Compatibility:**
  - Investigate porting to Firefox.
  - Replace window.open() with chrome.tabs.create()
  - Use chrome.storage for state persistence
  - Implement event delegation for interactive elements
