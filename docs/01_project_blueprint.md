# Project Blueprint: Film2Trakt

## Vision & Objectives

### 1. Central Vision Statement

Streamline the user's [FilmAffinity](https://www.filmaffinity.com/) movie and series tracking by integrating it with [Trakt](https://trakt.tv/) using an intuitive browser extension. This extension will enable users to search for movies and series on Trakt directly from FilmAffinity, enhancing their tracking and discovery experience.

### 2. Core Objectives

- **Accurate Content Identification:** Reliably extract movie and series titles directly from FilmAffinity pages.
- **Seamless Trakt Integration:** Generate correct Trakt search URLs based on the identified title and content type (movie or series).
- **Non-Intrusive UI:** Integrate a clearly identifiable "Search on Trakt" button within the FilmAffinity interface without disrupting the user experience.
- **Effortless Workflow:** Enable users to initiate a Trakt search for the currently viewed content with a single click.
- **Localized Experience:** Provide user interface elements and messages in the user's preferred language.

### 3. Problem/Need Addressed

FilmAffinity users who also utilize Trakt currently lack a direct, efficient method to look up movies or series they are viewing on FilmAffinity within the Trakt platform. This often involves manual steps like copying titles, switching tabs, and pasting into the Trakt search bar, creating friction in their workflow.

### 4. General Solution Description

Film2Trakt is a Chrome browser extension that injects a dedicated button onto FilmAffinity movie and series pages. When clicked, the extension automatically:

1. Extracts the title of the content from the page.
2. Determines if the content is a movie or a TV series.
3. Constructs the appropriate search URL for Trakt.
4. Opens this URL in a new browser tab.

The extension utilizes Chrome's internationalization (i18n) features to display button text and handle messages in the user's language.

### 5. Guiding Purpose ("North Star")

This project aims to be the simplest, most reliable bridge between FilmAffinity and Trakt. Every feature and decision should prioritize streamlining the user's workflow for searching content across these two platforms, focusing on accuracy, ease of use, and minimal intrusion.

## Requirements

This section outlines the functional and non-functional requirements for the Film2Trakt Chrome extension.

### 1. Functional Requirements (FR)

These requirements describe what the extension should do.

- **FR-01: Title Extraction:** The extension MUST accurately extract the primary movie or series title from the relevant FilmAffinity page (`www.filmaffinity.com/xx/film*.html`) where `xx` in URL refers to page language (e.g., `es` for Spanish, `en` for English, etc.) (currently implemented for Spanish pages `/es/film*.html` in v1.0.4; additional languages planned for v1.1).
- **FR-02: Content Type Detection:** The extension MUST correctly identify whether the current FilmAffinity page corresponds to a movie or a TV series.
- **FR-03: Button Injection:** The extension MUST inject a clearly visible "Search on Trakt" button onto the FilmAffinity page, positioned near the main title of the movie or series.
- **FR-04: Trakt URL Construction:** Based on the extracted title and content type, the extension MUST construct the correct search URL for Trakt (e.g., `https://trakt.tv/search/movies?q=[title]` or `https://trakt.tv/search/shows?q=[title]`).
- **FR-05: Trakt URL Opening:** Upon clicking the "Search on Trakt" button, the extension MUST open the constructed Trakt search URL in a new browser tab using `window.open`.
- **FR-06: Internationalization - UI:** The text content of the injected button MUST be displayed using the appropriate localized string obtained via `chrome.i18n.getMessage("searchButtonText")`.
- **FR-07: Error Handling - Logging:** The extension MUST log descriptive, localized error messages to the browser console if it fails to extract the title, determine content type, construct the URL, or open the new tab, utilizing i18n for localized messages.
- **FR-08: Error Handling - User Feedback:** In case of failure to open the Trakt URL, the extension MUST display a localized alert message to the user (e.g., `alert(chrome.i18n.getMessage("alertCouldNotOpenUrl"))`).

### 2. Non-Functional Requirements (NFR)

These requirements describe how the extension should operate and its quality attributes.

- **NFR-01: Usability - Button Placement:** The "Search on Trakt" button MUST be placed intuitively near the FilmAffinity content title for easy discovery and access.
- **NFR-02: Usability - Button Styling:** The button's visual design MUST be distinct yet unobtrusive, fitting reasonably well within the FilmAffinity page aesthetic. Hover states should provide clear visual feedback, and use a system font stack for better performance and security.
- **NFR-03: Performance - Page Load:** The execution of the content script MUST NOT introduce any noticeable delay to the loading and rendering time of the FilmAffinity page.
- **NFR-04: Performance - Responsiveness:** The time elapsed between the user clicking the "Search on Trakt" button and the new Trakt tab beginning to load SHOULD be less than 1 second under normal system conditions (excluding network latency related to loading Trakt itself).
- **NFR-05: Security - Manifest V3:** The extension MUST adhere to the requirements and security policies of Chrome Manifest V3.
- **NFR-06: Security - Permissions:** The extension MUST only request the minimum necessary permissions required for its core functionality (currently `activeTab`).
- **NFR-07: Security - CSP:** The extension MUST define and adhere to an appropriate Content Security Policy (CSP) within its `manifest.json`.
- **NFR-08: Maintainability - Code Style:** All source code (JavaScript, CSS) MUST adhere to the coding style and structure guidelines defined in the project's documentation files in the `/docs` folder.
- **NFR-09: Compatibility - Browser:** The extension MUST be fully functional on the latest stable release version of the Google Chrome browser.
- **NFR-10: Internationalization - Default Language:** The extension MUST use Spanish ("es") as the default language for all localized strings if the user's browser language is not explicitly supported by an available locale file.
- **NFR-11: Robustness - Error Recovery:** The extension MUST handle potential runtime errors (e.g., DOM structure changes on FilmAffinity, network issues preventing tab opening) gracefully without causing the script to crash or negatively impact the user's browsing session on the FilmAffinity tab.

## Product Features

This section provides a detailed description of each core feature of the Film2Trakt extension, including specific operational details, edge cases, and validation rules where applicable.

### Feature 1: Button Injection

- **ID:** FEAT-01
- **Description:** Automatically adds a "Search on Trakt" button to relevant FilmAffinity pages.
- **Functional Requirements:** FR-03
- **Non-Functional Requirements:** NFR-01, NFR-02, NFR-03
- **Detailed Operation:**
  1. Upon loading a FilmAffinity page matching the pattern `*://www.filmaffinity.com/es/film*.html` (as defined in `manifest.json`), the `content_script.js` script executes.
  2. The script creates a `<button>` HTML element.
  3. The button's text content is set using `chrome.i18n.getMessage("searchButtonText")`.
  4. The CSS class `trakt-search-button` is added to the button for styling.
  5. The script identifies the target insertion point in the DOM, typically the container element holding the main title (`h1#main-title`) and its inner `<span>`.
  6. The created button is inserted right after the inner `<span>` inside `h1#main-title` via `titleElement.insertBefore(button, titleSpan.nextSibling)`.
- **Edge Cases:**
  - **DOM Structure Change:** If FilmAffinity significantly changes the structure around the `h1#main-title`, the button might be injected in the wrong place or fail to inject.
  - **Multiple Injections:** The script currently relies on standard page load behavior and doesn't explicitly prevent multiple injections if the content script were triggered multiple times on the same logical page view (e.g., complex SPA navigation, though not applicable to current FilmAffinity).
- **Error Handling:** Throws an unlocalized `Error("Could not find main title element")` if `h1#main-title` cannot be found (localizing this error and guarding against a missing inner `<span>` are pending improvements).
- **Validation Rules:** None explicitly defined beyond successful DOM insertion.

### Feature 2: Title Extraction

- **ID:** FEAT-02
- **Description:** Extracts the primary title of the movie or series from the FilmAffinity page.
- **Functional Requirements:** FR-01
- **Detailed Operation:**
  1. The `getFilmaffinityTitle()` function in `content_script.js` is called (typically triggered by the button click handler).
  2. It targets the title text within `h1#main-title` using `document.querySelector(SELECTORS.TITLE_SPAN)`.
  3. If the element is found, its `textContent` is retrieved, trimmed of leading/trailing whitespace, and returned.
  4. Uses centralized `SELECTORS` constant for robustness against DOM changes.
- **Edge Cases:**
  - **Title Element Not Found:** If the `h1#main-title` element does not exist on the page, the function should fail gracefully.
  - **Empty Title:** If the element exists but its `textContent` is empty or only whitespace, the function should handle this (currently returns an empty string after trimming, which `createTraktUrl` should handle).
  - **Unexpected Content:** Titles with unusual characters might require specific handling during URL encoding (covered by `createTraktUrl`).
- **Validation Rules:**
  - The target DOM element (`h1#main-title`) must exist.
  - The extracted title should be a non-null string (even if empty after trimming).
- **Error Handling:** If the `h1#main-title span` element is not found, `getFilmaffinityTitle()` throws `new Error(chrome.i18n.getMessage("errorTitleNotFound"))` internally, catches it inside its `try/catch` block, logs `chrome.i18n.getMessage("errorGettingTitle")` with `console.error`, and returns `null`.

### Feature 3: Content Type Detection

- **ID:** FEAT-03
- **Description:** Determines if the content displayed on the FilmAffinity page is a movie or a TV series.
- **Functional Requirements:** FR-02
- **Detailed Operation:**
  1. The `isFilmaffinitySeries()` function in `content_script.js` is called.
  2. It queries `SELECTORS.MOVIE_TYPE` (`.movie-type`) and then `SELECTORS.TYPE_SPAN` (`.movie-type .type`), checking strict equality `typeSpan.textContent === "Miniserie" || typeSpan.textContent === "Serie"`.
  3. Based on the analysis, it returns a boolean (`true` for series/miniseries, `false` otherwise).
- **Edge Cases:**
  - **Ambiguous Pages:** Pages that don't clearly fit the expected structure for either movies or series might lead to incorrect detection.
  - **DOM Structure Change:** Changes in how FilmAffinity displays type information will break this detection.
- **Validation Rules:** The function should return a boolean value indicating the detected type.
- **Error Handling:** Returns `false` if the expected DOM elements are absent; if a runtime exception occurs inside `try/catch`, logs `chrome.i18n.getMessage("errorDeterminingType")` via `console.error` and returns `false`.

### Feature 4: Trakt URL Construction

- **ID:** FEAT-04
- **Description:** Creates the correct Trakt search URL based on the extracted title and content type.
- **Functional Requirements:** FR-04
- **Detailed Operation:**
  1. The `createTraktUrl(title)` function is called with the extracted title and invokes `isFilmaffinitySeries()` internally to determine the content type.
  2. It checks if the `title` is provided (not null or empty).
  3. It determines the base URL: `https://trakt.tv/search/shows` if `isSeries` is true, or `https://trakt.tv/search/movies` otherwise.
  4. It URL-encodes the `title` string using `encodeURIComponent()` to handle spaces and special characters safely.
  5. It constructs the final URL string by appending `?q=` and the encoded title to the base URL.
  6. The complete URL string is returned.
- **Edge Cases:**
  - **Empty Title:** If the title string is empty or `null`, `createTraktUrl()` handles it gracefully via `try/catch` and returns `null`.
- **Validation Rules:**
  - Input `title` must be a non-empty string.
  - The output must be a valid, properly encoded URL string.
- **Error Handling:** If `!title`, throws `new Error(chrome.i18n.getMessage("errorTitleRequired"))` internally, catches it in `try/catch`, logs `chrome.i18n.getMessage("errorCreatingUrl")` via `console.error`, and returns `null`.

### Feature 5: Open Trakt Search in New Tab

- **ID:** FEAT-05
- **Description:** Opens the constructed Trakt search URL in a new browser tab when the user clicks the button.
- **Functional Requirements:** FR-05
- **Detailed Operation:**
  1. The `openTraktUrl(url)` function is called with the constructed URL.
  2. It checks if the `url` is provided.
  3. It calls `window.open(url, "_blank")`.
  4. The browser handles opening the URL in a new tab.
- **Edge Cases:**
  - **Browser Blocking Popups:** Although unlikely for extension-initiated actions from user clicks, overly aggressive browser settings _could_ interfere, but standard behavior allows this.
  - **Invalid URL:** If the constructed URL is somehow invalid, `window.open` might fail silently or open an error page.
- **Validation Rules:**
  - Input `url` must be a non-empty, valid URL string.
- **Error Handling:**
  - If `!url`, throws `new Error(chrome.i18n.getMessage("errorUrlRequired"))` internally, catches it in `try/catch`, and logs `chrome.i18n.getMessage("errorOpeningUrl")` via `console.error`.
  - Displays a native browser `alert(chrome.i18n.getMessage("alertCouldNotOpenUrl"))` to the user on error. Note: `window.open` does not provide a direct success/failure callback, so errors during the browser's attempt to open the tab cannot be reliably caught by the extension code.

### Feature 6: Internationalization (i18n)

- **ID:** FEAT-06
- **Description:** Displays UI text and internal messages in the user's preferred language.
- **Functional Requirements:** FR-06, FR-07, FR-08
- **Non-Functional Requirements:** NFR-10
- **Detailed Operation:**
  1. The `manifest.json` defines `"default_locale": "es"`.
  2. Locale files exist in `_locales/es/messages.json` containing key-value pairs for translatable strings.
  3. `content_script.js` uses `chrome.i18n.getMessage("keyName")` whenever it needs a string for the UI (button text), console logs, or error messages/alerts.
  4. Chrome automatically selects the appropriate language based on the user's browser settings and the available locale files, falling back to the `default_locale` if no match is found.
- **Edge Cases:**
  - **Missing Key:** If `chrome.i18n.getMessage` is called with a key that doesn't exist in the current locale file or the default locale (`es`), Chrome returns an empty string. The extension code using the result should be resilient to empty strings where possible (e.g., button text might appear blank, logs might be less descriptive).
  - **Missing Locale File:** If the user's browser language doesn't match an available locale folder (`_locales/[lang]/`), Chrome automatically falls back to the `default_locale` specified in `manifest.json` (`es`).
- **Error Handling:** The `chrome.i18n.getMessage` API itself handles missing keys/locales internally by returning empty strings or falling back. Error messages displayed to the user are now localized using i18n. The extension code doesn't need explicit try-catch blocks around `getMessage` calls but should handle the possibility of receiving an empty string.
- **Validation Rules:** All user-facing strings and descriptive error messages within the code must use `chrome.i18n.getMessage()`.
