# Development Notes: Film2Trakt

This document serves as a log and reference for the development process of the Film2Trakt Chrome extension.

## 1. Overview & Current Status

- **Purpose:** Film2Trakt is a Chrome extension designed to connect FilmAffinity with Trakt.tv, allowing users to quickly search for movies and series on Trakt.tv directly from FilmAffinity pages.
- **Current Version:** v1.0
- **Summary:** The extension currently injects a "Search on Trakt" button onto Spanish FilmAffinity movie/series pages. It extracts the title, determines the content type, constructs the appropriate Trakt.tv search URL, and opens it in a new tab upon user click. Internationalization (i18n) is implemented for UI text and error messages, defaulting to Spanish.

## 2. Key Implementation Details & Decisions

### 2.1. Core Logic (`content.js`)

- **Functionality:**
  - `getFilmaffinityTitle()`: Extracts the title from the page DOM.
  - `isFilmaffinitySeries()`: Determines content type (movie/series) by analyzing page structure.
  - `createTraktUrl(title)`: Builds the Trakt.tv search URL based on title and type.
  - `openTraktUrl(url)`: Opens the constructed URL in a new tab using `chrome.tabs.create`.
- **DOM Interaction:**
  - Injects the search button (`.trakt-search-button`) near the content title.
  - Applies CSS classes for styling.
  - Attaches event listeners (`mouseover`, `mouseout`, `click`) to the button.
  - Injects the "Figtree" font (as per original notes).
- **Error Handling:**
  - Uses localized messages via `chrome.i18n.getMessage()` for `console.error` logs (e.g., `errorGettingTitle`, `errorCreatingUrl`, `errorOpeningUrl`).
  - Throws `Error` objects with localized messages (e.g., `errorTitleNotFound`, `errorTitleRequired`, `errorUrlRequired`).
  - Displays a localized `alert()` to the user on failure to open the URL (`alertCouldNotOpenUrl`).

### 2.2. Configuration (`manifest.json`)

- **Manifest Version:** Uses Manifest V3.
- **Permissions:** Requests `activeTab` permission, granting access only upon user interaction (clicking the button). This follows the principle of least privilege.
- **Content Scripts:**
  - Injects `content.js` and `styles/main.css`.
  - **Target Pages (`matches`):** Currently restricted to `*://www.filmaffinity.com/es/film*.html`. _Note: This is a key limitation for broader language support._
- **Internationalization (i18n):**
  - Enabled using `__MSG_appName__` and `__MSG_appDesc__` for extension name and description.
  - `default_locale` is set to `"es"`. If the user's browser language isn't supported, Spanish strings will be used.
- **Security:** Includes a `content_security_policy` to restrict script and object sources.
- **Icons:** Defines paths for various icon sizes.

### 2.3. Styling (`styles/main.css`)

- Provides styles for the `.trakt-search-button` class.
- Includes base styling (background, color, font, padding, shadow, transition).
- Defines `:hover` state styles (background change, transform, shadow increase).
- Includes responsive adjustments for smaller screens using `@media (max-width: 768px)` (adjusts padding, font size).

### 2.4. Internationalization (i18n) Strategy

- **Decision:** Utilize Chrome's built-in `i18n` API (`chrome.i18n`) for managing all user-facing strings and internal error messages.
- **Implementation:**
  - All translatable strings are centralized in `_locales/[lang]/messages.json` (currently only `es`).
  - `content.js` retrieves strings using `chrome.i18n.getMessage("keyName")`.
  - The default language is defined in `manifest.json`.

## 3. Development Log (Recent Changes - Pre-v1.0)

- Relocated the "Search on Trakt" button to be positioned next to the movie/series title for better visibility and context.
- Improved the visual style and design of the button using `styles/main.css`.
- Implemented comprehensive i18n support:
  - Centralized strings in `_locales/es/messages.json`.
  - Set Spanish (`es`) as the default locale.
  - Refactored `content.js` to use `chrome.i18n.getMessage()` for all display text and error handling.

## 4. Future Enhancements & Ideas

- **Broader Language Support:**
  - Add locale files (`messages.json`) for other languages supported by FilmAffinity (e.g., `en`, `fr`).
  - Update the `matches` pattern in `manifest.json` to include URLs for other language versions of FilmAffinity pages if the structure differs (e.g., `/en/film*.html`).
- **Direct Trakt API Integration:**
  - Explore using the Trakt.tv API for richer functionality (e.g., directly marking as watched, adding to lists, seeing watched status without leaving FilmAffinity).
  - _Considerations:_ Requires handling API keys, OAuth authentication, managing user state (`chrome.storage`), more complex UI, and robust error handling for API calls.
- **Improved Robustness:**
  - Make DOM element selection in `content.js` more resilient to potential changes in FilmAffinity's website structure.
  - Enhance error handling for edge cases.

## 5. Technology Stack

- **Core:** JavaScript (ES6+)
- **Styling:** CSS3
- **Environment:** Google Chrome Extension Runtime (Manifest V3)
- **APIs:**
  - Chrome Extension APIs (`chrome.i18n`, `chrome.tabs`, `chrome.runtime`)
  - Web APIs (DOM Manipulation, Event Listeners)

## 6. Potential Challenges / Considerations

- **FilmAffinity DOM Stability:** The extension's reliance on specific DOM selectors is its primary vulnerability. Changes by FilmAffinity could break functionality.
- **Scope of Language Support:** Managing multiple locale files and potentially different URL structures requires careful testing.
- **Complexity of Trakt API:** Integrating the API significantly increases complexity regarding authentication, state management, and UI design compared to the current simple URL opening approach.
