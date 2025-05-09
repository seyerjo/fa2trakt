# Features Deep Dive: Film2Trakt

This document provides a detailed description of each core feature of the Film2Trakt extension, including specific operational details, edge cases, and validation rules where applicable.

## Feature 1: Button Injection

- **ID:** FEAT-01
- **Description:** Automatically adds a "Search on Trakt" button to relevant FilmAffinity pages.
- **Functional Requirements:** FR-03
- **Non-Functional Requirements:** NFR-01, NFR-02, NFR-03
- **Detailed Operation:**
  1.  Upon loading a FilmAffinity page matching the pattern `*://www.filmaffinity.com/es/film*.html` (as defined in `manifest.json`), the `content_script.js` script executes.
  2.  The script creates a `<button>` HTML element.
  3.  The button's text content is set using `chrome.i18n.getMessage("searchButtonText")`.
  4.  The CSS class `trakt-search-button` is added to the button for styling.
  5.  The script identifies the target insertion point in the DOM, typically the container element holding the main title (`h1#main-title`).
  6.  The created button is appended or inserted adjacent to this target element.
- **Edge Cases:**
  - **DOM Structure Change:** If FilmAffinity significantly changes the structure around the `h1#main-title`, the button might be injected in the wrong place or fail to inject.
  - **Multiple Injections:** The script currently relies on standard page load behavior and doesn't explicitly prevent multiple injections if the content script were triggered multiple times on the same logical page view (e.g., complex SPA navigation, though not applicable to current FilmAffinity).
- **Error Handling:** Logs `errorInjectingButton` (localized) to the console using `console.error` if the target insertion point (`h1#main-title`) cannot be found.
- **Validation Rules:** None explicitly defined beyond successful DOM insertion.

## Feature 2: Title Extraction

- **ID:** FEAT-02
- **Description:** Extracts the primary title of the movie or series from the FilmAffinity page.
- **Functional Requirements:** FR-01
- **Detailed Operation:**
  1.  The `getFilmaffinityTitle()` function in `content_script.js` is called (typically triggered by the button click handler).
  2.  It targets the title text within `h1#main-title` using `document.querySelector(SELECTORS.TITLE_SPAN)`.
  3.  If the element is found, its `textContent` is retrieved, trimmed of leading/trailing whitespace, and returned.
  4.  Uses centralized `SELECTORS` constant for robustness against DOM changes.
- **Edge Cases:**
  - **Title Element Not Found:** If the `h1#main-title` element does not exist on the page, the function should fail gracefully.
  - **Empty Title:** If the element exists but its `textContent` is empty or only whitespace, the function should handle this (currently returns an empty string after trimming, which `createTraktUrl` should handle).
  - **Unexpected Content:** Titles with unusual characters might require specific handling during URL encoding (covered by `createTraktUrl`).
- **Validation Rules:**
  - The target DOM element (`h1#main-title`) must exist.
  - The extracted title should be a non-null string (even if empty after trimming).
- **Error Handling:** If the `h1#main-title` element is not found, logs `errorGettingTitle` (localized) using `console.error` and throws a new `Error` with the localized message `errorTitleNotFound`.

## Feature 3: Content Type Detection

- **ID:** FEAT-03
- **Description:** Determines if the content displayed on the FilmAffinity page is a movie or a TV series.
- **Functional Requirements:** FR-02
- **Detailed Operation:**
  1.  The `isFilmaffinitySeries()` function in `content_script.js` is called.
  2.  It inspects specific elements or text patterns within the FilmAffinity page DOM that typically differentiate series from movies (e.g., presence of "Serie de TV", "Miniserie" in specific `dd` tags within the technical details section, or other structural clues).
  3.  Based on the analysis, it returns a value indicating the type (e.g., `true` for series, `false` for movie).
- **Edge Cases:**
  - **Ambiguous Pages:** Pages that don't clearly fit the expected structure for either movies or series might lead to incorrect detection.
  - **DOM Structure Change:** Changes in how FilmAffinity displays type information will break this detection.
- **Validation Rules:** The function should return a boolean value indicating the detected type.
- **Error Handling:** If the crucial DOM elements used for detection are missing, potentially logs `errorDetectingType` (localized) using `console.warn` as it might fallback to a default (e.g., movie), but this specific logging isn't explicitly implemented yet.

## Feature 4: Trakt URL Construction

- **ID:** FEAT-04
- **Description:** Creates the correct Trakt search URL based on the extracted title and content type.
- **Functional Requirements:** FR-04
- **Detailed Operation:**
  1.  The `createTraktUrl(title, isSeries)` function is called with the extracted title and the detected content type.
  2.  It checks if the `title` is provided (not null or empty).
  3.  It determines the base URL: `https://trakt.tv/search/shows` if `isSeries` is true, or `https://trakt.tv/search/movies` otherwise.
  4.  It URL-encodes the `title` string using `encodeURIComponent()` to handle spaces and special characters safely.
  5.  It constructs the final URL string by appending `?query=` and the encoded title to the base URL.
  6.  The complete URL string is returned.
- **Edge Cases:**
  - **Empty Title:** If the title string is empty, the function should handle this gracefully (currently throws `errorTitleRequired`). A search URL with an empty query might be valid but yield no results on Trakt.
- **Validation Rules:**
  - Input `title` must be a non-empty string.
  - Input `isSeries` should indicate the type.
  - The output must be a valid, properly encoded URL string.
- **Error Handling:** Logs `errorCreatingUrl` and throws `errorTitleRequired` (localized) if the title is missing.

## Feature 5: Open Trakt Search in New Tab

- **ID:** FEAT-05
- **Description:** Opens the constructed Trakt search URL in a new browser tab when the user clicks the button.
- **Functional Requirements:** FR-05
- **Detailed Operation:**
  1.  The `openTraktUrl(url)` function is called with the constructed URL.
  2.  It checks if the `url` is provided.
  3.  It calls the Chrome Extension API `chrome.tabs.create({ url: url })`.
  4.  The browser handles opening the URL in a new tab.
- **Edge Cases:**
  - **Browser Blocking Popups:** Although unlikely for extension-initiated actions from user clicks, overly aggressive browser settings _could_ interfere, but standard behavior allows this.
  - **Invalid URL:** If the constructed URL is somehow invalid, `chrome.tabs.create` might fail.
- **Validation Rules:**
  - Input `url` must be a non-empty, valid URL string.
- **Error Handling:**
  - If the `url` parameter is missing or empty, logs `errorOpeningUrl` (localized) using `console.error` and throws a new `Error` with the localized message `errorUrlRequired`.
  - After calling `chrome.tabs.create`, it checks `chrome.runtime.lastError`. If an error exists, it logs the error object and the localized message `errorOpeningUrl` using `console.error`, and displays a browser alert to the user with the localized message `alertCouldNotOpenUrl`.

## Feature 6: Internationalization (i18n)

- **ID:** FEAT-06
- **Description:** Displays UI text and internal messages in the user's preferred language.
- **Functional Requirements:** FR-06, FR-07, FR-08
- **Non-Functional Requirements:** NFR-10
- **Detailed Operation:**
  1.  The `manifest.json` defines `"default_locale": "es"`.
  2.  Locale files exist in `_locales/es/messages.json` containing key-value pairs for translatable strings.
  3.  `content_script.js` uses `chrome.i18n.getMessage("keyName")` whenever it needs a string for the UI (button text), console logs, or error messages/alerts.
  4.  Chrome automatically selects the appropriate language based on the user's browser settings and the available locale files, falling back to the `default_locale` if no match is found.
- **Edge Cases:**
  - **Missing Key:** If `chrome.i18n.getMessage` is called with a key that doesn't exist in the current locale file or the default locale (`es`), Chrome returns an empty string. The extension code using the result should be resilient to empty strings where possible (e.g., button text might appear blank, logs might be less descriptive).
  - **Missing Locale File:** If the user's browser language doesn't match an available locale folder (`_locales/[lang]/`), Chrome automatically falls back to the `default_locale` specified in `manifest.json` (`es`).
- **Error Handling:** The `chrome.i18n.getMessage` API itself handles missing keys/locales internally by returning empty strings or falling back. The extension code doesn't need explicit try-catch blocks around `getMessage` calls but should handle the possibility of receiving an empty string.
- **Validation Rules:** All user-facing strings and descriptive error messages within the code must use `chrome.i18n.getMessage()`.
