# Release Notes: Film2Trakt v1.0.0

## Overview

This marks the official **v1.0.0** release of Film2Trakt, a Chrome Extension designed to seamlessly integrate FilmAffinity with Trakt.tv. This version establishes the core functionality and provides a stable foundation for future enhancements.

## Key Features (Stable in v1.0.0)

- **One-click Trakt Search**: Adds a "Search on Trakt" button directly onto FilmAffinity movie and series pages (`www.filmaffinity.com/es/film*.html`), allowing users to quickly find the corresponding title on Trakt.tv.
- **Automatic Title Extraction**: Automatically identifies and extracts the movie or series title from the FilmAffinity page to pre-populate the Trakt search query.
- **Series/Movie Detection**: Intelligently determines if the content is a movie or a series on FilmAffinity and directs the search to the appropriate section (`/movies` or `/shows`) on Trakt.tv.
- **Internationalization (i18n)**: Includes support for localized text (currently Spanish `es` is the default and only locale). UI elements and messages use Chrome's i18n system.
- **Basic Styling**: Provides clear and functional styling for the injected button, including hover effects.

## What's New in v1.0.0 (Compared to v0.9.5)

- **Formal Release:** Official stable release designation (v1.0.0).
- **Comprehensive Documentation:** Added a full suite of project documentation within the `/docs` folder, covering project overview, requirements, features, architecture, setup, usage, contribution guidelines, and more.
- **Code Structure Refinements (Internal):** Minor internal adjustments and code comments added during the documentation phase. _(Note: Major optimizations identified in `/dev_notes/P01_documentation_updating.md` and listed in `/docs/to_do_list.md` are planned for future releases)._
- **Directory Structure Reorganization:** Project folders like `dev_notes`, `releases`, and `archive` are now hidden (`/.dev_notes`, etc.) and documentation files in `/docs` no longer use numerical prefixes.

## Installation

The installation process remains the same as v0.9.5 for loading the unpacked extension:

1.  Download the release package (e.g., `film2trakt_v1.0.0.zip`).
2.  Unzip the downloaded file.
3.  Open Chrome and navigate to `chrome://extensions`.
4.  Enable "Developer mode" in the top right corner.
5.  Click "Load unpacked" and select the directory containing the unzipped extension files.
6.  The Film2Trakt extension (v1.0.0) is now installed and active.

_(Note: Installation via Chrome Web Store is planned for the future)._

## Known Issues and Future Enhancements

- The extension currently only targets Spanish FilmAffinity pages (`/es/`).
- Functionality relies on FilmAffinity's current DOM structure and may break if the site undergoes significant changes.
- For a detailed list of planned improvements (including performance optimizations, code refactoring, broader language support, and potential Trakt API integration) and known issues, please refer to the `/docs/to_do_list.md` file within the project repository.

## Thanks

Thank you for using Film2Trakt! Please report any bugs or feature requests by opening an issue on the [GitHub repository](https://github.com/seyerjo/fa2trakt). Your feedback is greatly appreciated.
