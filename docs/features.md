# Features Deep Dive: Film2Trakt

This document provides a detailed description of each core feature of the Film2Trakt extension (v1.0), including specific operational details, edge cases, and validation rules where applicable.

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
  - **DOM Structure Change:** If FilmAffinity significantly changes the structure around the `h1#main-title`, the button might be injected in the wrong place or fail to inject. The script should ideally log an error if the target insertion point isn't found.
  - **Multiple Injections:** The script should ideally ensure it doesn't inject the button multiple times if the content script somehow runs more than once on the same page load (e.g., due to SPA navigation if FilmAffinity were to become one, though unlikely). (Current implementation likely doesn't explicitly prevent this but relies on typical page load behavior).
- **Validation Rules:** None explicitly defined beyond successful DOM insertion.

## Feature 2: Title Extraction

- **ID:** FEAT-02
- **Description:** Extracts the primary title of the movie or series from the FilmAffinity page.
- **Functional Requirements:** FR-01
- **Detailed Operation:**
  1.  The `getFilmaffinityTitle()` function in `content_script.js` is called (typically triggered by the button click handler).
  2.  It targets the `h1` element with the ID `main-title` using `document.querySelector('h1#main-title')`.
  3.  If the element is found, its `textContent` is retrieved, trimmed of leading/trailing whitespace, and returned.
- **Edge Cases:**
  - **Title Element Not Found:** If the `h1#main-title` element does not exist on the page, the function should fail gracefully.
  - **Empty Title:** If the element exists but its `textContent` is empty or only whitespace, the function should handle this (currently returns an empty string after trimming, which `createTraktUrl` should handle).
  - **Unexpected Content:** Titles with unusual characters might require specific handling during URL encoding (covered by `createTraktUrl`).
- **Validation Rules:**
  - The target DOM element (`h1#main-title`) must exist.
  - The extracted title should be a non-null string (even if empty after trimming).
- **Error Handling:** Logs `errorGettingTitle` and throws `errorTitleNotFound` (localized) if the element is not found.

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
- **Validation Rules:** The function should return a predictable value (e.g., boolean) indicating the detected type.
- **Error Handling:** Should ideally log an error if it cannot reliably determine the type based on the expected DOM structure.

## Feature 4: Trakt.tv URL Construction

- **ID:** FEAT-04
- **Description:** Creates the correct Trakt.tv search URL based on the extracted title and content type.
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

## Feature 5: Open Trakt.tv Search in New Tab

- **ID:** FEAT-05
- **Description:** Opens the constructed Trakt.tv search URL in a new browser tab when the user clicks the button.
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
  - Logs `errorOpeningUrl` (localized) if `chrome.tabs.create` fails (e.g., due to `chrome.runtime.lastError`).
  - Shows a localized `alert()` (`alertCouldNotOpenUrl`) to the user on failure.
  - Throws `errorUrlRequired` (localized) if the URL is missing.

## Feature 6: Internationalization (i18n)

- **ID:** FEAT-06
- **Description:** Displays UI text and internal messages in the user's preferred language (defaulting to Spanish).
- **Functional Requirements:** FR-06, FR-07, FR-08
- **Non-Functional Requirements:** NFR-10
- **Detailed Operation:**
  1.  The `manifest.json` defines `"default_locale": "es"`.
  2.  Locale files exist in `_locales/es/messages.json` containing key-value pairs for translatable strings.
  3.  `content_script.js` uses `chrome.i18n.getMessage("keyName")` whenever it needs a string for the UI (button text), console logs, or error messages/alerts.
  4.  Chrome automatically selects the appropriate language based on the user's browser settings and the available locale files, falling back to the `default_locale` if no match is found.
- **Edge Cases:**
  - **Missing Key:** If `getMessage` is called with a key that doesn't exist in the selected locale file (or the default), it will typically return an empty string. The code should be somewhat resilient to this, although it might result in missing text.
  - **Missing Locale File:** If the user's language is set to something other than Spanish and no corresponding `_locales/[lang]` folder exists, Chrome correctly falls back to Spanish (`es`).
- **Validation Rules:** All user-facing strings and descriptive error messages within the code must use `chrome.i18n.getMessage()`.
