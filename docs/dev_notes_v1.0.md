# Development Notes for Film2Trakt Project

## Introduction

Film2Trakt is a Chrome extension that connects FilmAffinity with Trakt.tv, allowing users to search for movies and series on Trakt.tv directly from FilmAffinity.

## Current Development Version

The current development version of the project is v1.0.

## Project Structure

- `manifest.json`: Defines the extension's metadata, permissions, content scripts, and i18n settings.
- `content.js`: Script that runs on FilmAffinity pages, extracting the title, creating a button using localized text, and handling errors with localized messages.
- `styles/main.css`: Styles for the "Search on Trakt" button.
- `_locales/es/messages.json`: Contains Spanish strings for internationalization (i18n).

## Main Functionalities

- `getFilmaffinityTitle()`: Extracts the title of the movie or series from the FilmAffinity page.
- `isFilmaffinitySeries()`: Determines if the page is for a series or movie by analyzing the page structure.
- `createTraktUrl(title)`: Builds the trakt.tv search URL based on the title and content type (series or movie).
- `openTraktUrl(url)`: Opens the trakt.tv URL in a new tab. Handles errors using localized messages.
- **Internationalization (i18n)**: Uses Chrome's i18n API (`chrome.i18n`) to display text (button labels, alerts) and log error messages in the user's preferred language (defaulting to Spanish).

## Recent Changes

- Relocation of the "Search on trakt" button next the title of the movie/series.
- Improvements in the style and design of the button.
- Implemented internationalization (i18n) support:
  - Centralized all user-facing strings and error messages in `_locales/es/messages.json`.
  - Set Spanish (`es`) as the default language in `manifest.json`.
  - Modified `content.js` to use `chrome.i18n.getMessage()` for all display text and error handling.

## Future Enhancements

- Support for more languages on FilmAffinity (requires adding new `_locales/[lang]/messages.json` files and potentially updating `manifest.json` matches).
- Direct integration with the Trakt API for advanced functionality.
- Improvements in robustness and error handling.

## Technologies Used

- JavaScript
- CSS
- Chrome Extension API
- Chrome Extension i18n API

## Explanation of the `manifest.json`

This `manifest.json` file defines the "Film2Trakt" browser extension.

**Key elements:**

- **`manifest_version: 3`**: Specifies the manifest format version.
- **`name: "__MSG_appName__"`**: Name of the extension, retrieved from `messages.json` for i18n.
- **`description: "__MSG_appDesc__"`**: Description of the extension, retrieved from `messages.json`.
- **`version: "1.0"`**: The current version of the extension.
- **`permissions: ["activeTab"]`**: Grants access to the active tab upon user interaction.
- **`default_locale: "es"`**: Sets Spanish as the default language for i18n. If the user's browser language is not supported via a specific `_locales/[lang]` folder, Spanish strings will be used.
- **`icons`**: Defines paths to extension icons of various sizes.
- **`content_scripts`**: Specifies scripts injected into web pages:
  - **`matches: ["*://www.filmaffinity.com/es/film*.html"]`**: Currently targets only Spanish FilmAffinity movie pages. _Note: This needs modification to support other languages._
  - **`js: ["content.js"]`**: The main content script.
  - **`css: ["./styles/main.css"]`**: Stylesheet for the injected elements.
- **`content_security_policy`**: Restricts script and object sources to enhance security.

In summary, the manifest configures the extension's core properties, permissions, content scripts, and crucially, enables internationalization by defining a default language and referencing localized strings for the name and description.

## Explanation of `main.css`

This CSS file styles the `.trakt-search-button` injected by `content.js`.

**Key Styles:**

- `.trakt-search-button`: Base styling (background, text color, font, padding, shadow, transition).
- `.trakt-search-button:hover`: Styles for the hover state (background change, transform, shadow).
- `@media (max-width: 768px)`: Responsive adjustments for smaller screens (padding, font size).

## Explanation of `content.js`

This script is injected into FilmAffinity pages to add the "Search on Trakt" functionality using internationalized text.

**Key Functions & Logic:**

- **`getFilmaffinityTitle()`**: Extracts the movie/series title. Logs localized errors via `console.error(chrome.i18n.getMessage("errorGettingTitle"), error);`. Throws errors with localized messages like `throw new Error(chrome.i18n.getMessage("errorTitleNotFound"));`.
- **`isFilmaffinitySeries()`**: Determines if the page is for a TV series. Logs localized errors.
- **`createTraktUrl(title)`**: Constructs the Trakt search URL. Logs and throws localized errors (e.g., `errorCreatingUrl`, `errorTitleRequired`).
- **`openTraktUrl(url)`**: Opens the URL in a new tab. Logs localized errors (`errorOpeningUrl`) and shows a localized alert to the user on failure: `alert(chrome.i18n.getMessage("alertCouldNotOpenUrl"));`. Throws localized error if URL is missing (`errorUrlRequired`).
- **Font Injection**: Loads the "Figtree" font.
- **Button Creation and Insertion**:
  - Creates the button element.
  - Sets the button text using the localized string: `button.textContent = chrome.i18n.getMessage("searchButtonText");`.
  - Adds the `trakt-search-button` class for styling.
  - Inserts the button into the page.
- **Event Listeners**: Handles button interactions (`mouseover`, `mouseout`, `click`). The click handler orchestrates getting the title, creating the URL, and opening it, relying on the functions that now use i18n for error handling and messaging.

In essence, `content.js` performs the core extension logic while leveraging the `chrome.i18n.getMessage()` API to ensure all user-facing text and internal error messages are presented in the appropriate language, defaulting to Spanish as defined in the manifest.
