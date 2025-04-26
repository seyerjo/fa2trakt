# Changelog: Film2Trakt

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-04-25

### Added

- **Initial Release:** First version of the Film2Trakt Chrome extension.
- **Core Functionality:**
  - Injects a "Search on Trakt" button onto FilmAffinity movie and series pages (`www.filmaffinity.com/es/film*.html`).
  - Extracts the movie/series title from the page.
  - Detects content type (movie vs. series).
  - Constructs the appropriate Trakt.tv search URL.
  - Opens the Trakt.tv search results in a new tab upon button click.
- **Internationalization (i18n):**
  - Implemented support for localized UI strings and error messages using `chrome.i18n`.
  - Added Spanish (`es`) locale file (`_locales/es/messages.json`) as the default language.
- **Styling:** Added basic CSS (`styles/main.css`) for the search button, including hover effects and basic responsiveness.
- **Error Handling:** Implemented basic error logging to the console and user alerts for critical failures (e.g., failing to open the tab), using localized messages.
- **Manifest V3:** Extension built using the Manifest V3 standard.
- **Permissions:** Uses the `activeTab` permission for minimal access.
- **Documentation:** Initial project documentation created in the `/docs` folder, including:
  - Project Overview (`project_overview.md`)
  - Requirements (`requirements.md`)
  - Tech Stack (`tech_stack.md`)
  - Setup and Installation Guide (`setup_and_installation.md`)
  - Usage Guide (`usage_guide.md`)
  - Contribution Guidelines (`contribution_guidelines.md`)
  - Code Style Guide (`code_style_guide.md`)
  - Code of Conduct (`code_of_conduct.md`)
  - Changelog (`changelog.md`)

### Changed

- Button position adjusted to appear next to the movie/series title for better context.

### Fixed

- (No specific bug fixes noted for the initial release compared to development stages, as features were being added).
