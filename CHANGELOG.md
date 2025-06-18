# Changelog: Film2Trakt

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

### Removed

## [1.0.3] - 2025-06-18

### Added

- New src directory structure for source code organization

### Changed

- Refactored UI interaction in `content_script.js`:
  - Removed JavaScript-based hover effects; now fully handled by CSS in `styles/main.css`.
  - Removed JavaScript-based dynamic font style injection; font styles are now solely managed by `styles/main.css`.
- Updated paths in manifest.json to reflect new structure
- Modified project structure documentation

## [1.0.2] - 2025-05-09

### Added

- Complete internationalization support for all UI elements
- Performance optimizations:
  - Replaced external font with system fonts
  - Optimized DOM query efficiency
- Enhanced error handling:
  - Try-catch blocks for critical operations
  - Localized error messages
- Documentation updates:
  - Revised code style guide
  - Updated implementation details

### Changed

- Refactored DOM interaction:
  - Centralized selectors in SELECTORS constant
  - Documented expected DOM structure
- Improved button styling:
  - CSS-only hover effects
  - Better responsive design
- Updated project structure documentation

### Fixed

- Edge cases in title extraction
- Potential memory leaks in content script
- Console error reporting format

## [1.0.1] - 2025-05-02

### Changed

- Improved DOM selectors robustness in content_script.js
  - Centralized selectors in SELECTORS constant object
  - Added error handling for missing elements

## [1.0.0] - 2025-04-25

### Added

- **Initial Release:** First version of the Film2Trakt Chrome extension.
- **Core Functionality:**
  - Injects a "Search on Trakt" button onto FilmAffinity movie and series pages (`www.filmaffinity.com/es/film*.html`).
  - Extracts the movie/series title from the page.
  - Detects content type (movie vs. series).
  - Constructs the appropriate Trakt search URL.
  - Opens the Trakt search results in a new tab upon button click.
- **Internationalization (i18n):**
  - Implemented support for localized UI strings and error messages using `chrome.i18n`.
  - Added Spanish (`es`) locale file (`_locales/es/messages.json`) as the default language.
- **Styling:** Added basic CSS (`styles/main.css`) for the search button, including hover effects and basic responsiveness.
- **Error Handling:** Implemented basic error logging to the console and user alerts for critical failures (e.g., failing to open the tab), using localized messages.
- **Manifest V3:** Extension built using the Manifest V3 standard.
- **Permissions:** Uses the `activeTab` permission for minimal access.
- **Documentation:** Initial project documentation created in the `/docs` folder.

### Changed

- (No specific changes noted for the initial release).

### Fixed

- (No specific bug fixes noted for the initial release).
