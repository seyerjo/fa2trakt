# Project Blueprint: Film2Trakt

## Vision & Objectives

### 1. Central Vision Statement

Streamline the user's [FilmAffinity](https://www.filmaffinity.com/) movie and series tracking by integrating it with [Trakt](https://trakt.tv/) using an intuitive browser extension. This extension will enable users to search for movies and series on Trakt directly from FilmAffinity, enhancing their tracking and discovery experience.

### 2. Core Objectives

- **Accurate Content Identification:** Reliably extract movie and series titles directly from FilmAffinity pages.
- **Seamless Trakt Integration:** Generate validated HTTPS Trakt search URLs based on the identified title and content type (movie or series).
- **Non-Intrusive UI:** Integrate a clearly identifiable "Search on Trakt" button within the FilmAffinity interface using Shadow DOM encapsulation without disrupting the host page.
- **Effortless Workflow:** Enable users to initiate a Trakt search for the currently viewed content with a single click.
- **Localized Experience:** Provide user interface elements and messages in the user's preferred language (`es` and `en`).

### 3. Problem/Need Addressed

FilmAffinity users who also utilize Trakt currently lack a direct, efficient method to look up movies or series they are viewing on FilmAffinity within the Trakt platform. This often involves manual steps like copying titles, switching tabs, and pasting into the Trakt search bar, creating friction in their workflow.

### 4. General Solution Description

Film2Trakt is a Chrome browser extension that injects an isolated Shadow DOM button onto Spanish and English FilmAffinity movie and series pages. When clicked, the extension automatically:

1. Extracts the title of the content from the page.
2. Determines if the content is a movie or a TV series.
3. Constructs and validates the appropriate HTTPS search URL for Trakt.
4. Opens this URL in a new browser tab with `noopener,noreferrer`.

The extension utilizes Chrome's internationalization (i18n) features to display button text and handle messages in the user's language.

### 5. Guiding Purpose ("North Star")

This project aims to be the simplest, most reliable bridge between FilmAffinity and Trakt. Every feature and decision should prioritize streamlining the user's workflow for searching content across these two platforms, focusing on accuracy, security, ease of use, and minimal intrusion.

## Requirements

This section outlines the functional and non-functional requirements for the Film2Trakt Chrome extension.

### 1. Functional Requirements (FR)

These requirements describe what the extension should do.

- **FR-01: Title Extraction:** The extension MUST accurately extract the primary movie or series title from relevant HTTPS FilmAffinity pages (`https://www.filmaffinity.com/es/film*.html` and `https://www.filmaffinity.com/en/film*.html`), including fallback extraction from direct text nodes inside `h1#main-title` if the inner `<span>` is absent.
- **FR-02: Content Type Detection:** The extension MUST correctly identify whether the current FilmAffinity page corresponds to a movie or a TV series/miniseries across both Spanish and English pages, with metadata (`og:type`) and `document.title` fallbacks.
- **FR-03: Button Injection:** The extension MUST idempotently inject a clearly visible, Shadow DOM-encapsulated "Search on Trakt" button onto the FilmAffinity page, positioned near the main title of the movie or series.
- **FR-04: Trakt URL Construction:** Based on the extracted title and content type, the extension MUST construct and validate an HTTPS search URL for Trakt (`https://trakt.tv/search/movies?q=[title]` or `https://trakt.tv/search/shows?q=[title]`).
- **FR-05: Trakt URL Opening:** Upon clicking the button, the extension MUST open the validated Trakt search URL in a new browser tab using `window.open(url, "_blank", "noopener,noreferrer")` (migration to `chrome.tabs.create` is deferred to v2.0 when a background service worker is introduced).
- **FR-06: Internationalization - UI:** The text and accessible label of the injected button MUST be displayed using localized strings obtained via `chrome.i18n.getMessage()` (with safe fallbacks).
- **FR-07: Error Handling - Logging:** The extension MUST log descriptive, localized error messages to the browser console if it fails to find the title container, extract the title, determine content type, validate/construct the URL, or open the new tab.
- **FR-08: Error Handling - User Feedback:** In case of failure to extract the title, construct the URL, or open the Trakt tab, the extension MUST display a non-intrusive, Shadow DOM-encapsulated toast notification with localized text (no blocking `alert()` dialogs).

### 2. Non-Functional Requirements (NFR)

These requirements describe how the extension should operate and its quality attributes.

- **NFR-01: Usability - Button Placement:** The "Search on Trakt" button MUST be placed intuitively near the FilmAffinity content title for easy discovery and access.
- **NFR-02: Usability - Button & Toast Styling:** UI elements MUST be encapsulated in open Shadow Roots with scoped CSS custom properties (`:host`), distinct yet unobtrusive styling, `:focus-visible` keyboard indicators, `@media (prefers-reduced-motion: reduce)` support, and a system font stack.
- **NFR-03: Performance - Page Load:** The execution of the content script (`run_at: "document_idle"`) MUST NOT introduce any noticeable delay to the loading and rendering time of the FilmAffinity page.
- **NFR-04: Performance - Responsiveness:** The time elapsed between the user clicking the button and the new Trakt tab beginning to load SHOULD be less than 1 second under normal system conditions (excluding network latency related to loading Trakt itself).
- **NFR-05: Security - Manifest V3:** The extension MUST adhere to the requirements and security policies of Chrome Manifest V3.
- **NFR-06: Security - Least Privilege & Hardened Resources:** The extension MUST declare zero install-time API permissions while operating purely via static `content_scripts`, restrict matches to HTTPS FilmAffinity title URLs, and scope `web_accessible_resources` strictly to `assets/css/content.css` on `https://www.filmaffinity.com/*` with `"use_dynamic_url": true`.
- **NFR-07: Security - CSP:** The extension MUST define and adhere to a strict Content Security Policy (`script-src 'self'; object-src 'self'`) within `src/manifest.json`.
- **NFR-08: Maintainability - Code Style:** All source code (JavaScript, CSS) MUST adhere to the coding style and structure guidelines defined in `docs/02_engineering_guidelines.md`.
- **NFR-09: Compatibility - Browser:** The extension MUST be fully functional on the latest stable release version of the Google Chrome browser.
- **NFR-10: Internationalization - Default Language:** The extension MUST use Spanish ("es") as the default language (`default_locale`) if the user's browser language is not explicitly supported by an available locale file (`es`, `en`).
- **NFR-11: Robustness - Error Recovery:** The extension MUST handle potential runtime errors (e.g., DOM structure changes on FilmAffinity, invalid URLs, or extension context invalidation) gracefully without uncaught exceptions or crashing the host page.

## Product Features

This section provides a detailed description of each core feature of the Film2Trakt extension, including specific operational details, edge cases, and validation rules where applicable.

### Feature 1: Idempotent Shadow DOM Button Injection

- **ID:** FEAT-01
- **Description:** Automatically and idempotently adds a Shadow DOM-encapsulated "Search on Trakt" button to Spanish and English FilmAffinity pages.
- **Functional Requirements:** FR-03, FR-06, FR-07
- **Non-Functional Requirements:** NFR-01, NFR-02, NFR-03, NFR-06, NFR-11
- **Detailed Operation:**
  1. Upon loading a FilmAffinity page matching `https://www.filmaffinity.com/es/film*.html` or `https://www.filmaffinity.com/en/film*.html` (`run_at: "document_idle"`), `src/assets/js/content.js` executes `initialize()`.
  2. Checks for an existing `[data-fa2trakt-root="button"]` host and returns early if already injected.
  3. Queries `SELECTORS.MAIN_TITLE` (`h1#main-title`).
  4. Creates a `<span>` Shadow DOM host (`mode: 'open'`), links `chrome.runtime.getURL('assets/css/content.css')`, and creates a `<button type="button">` with class `fa2trakt-button`, `data-fa2trakt-action="search"`, localized text (`searchButtonText`), and localized `aria-label` (`searchButtonAriaLabel`).
  5. Inserts the host right after the inner `<span>` inside `h1#main-title` if present, or appends it directly to `h1#main-title` if the inner `<span>` is missing.
  6. Binds delegated click handling on the button `shadowRoot` and `pagehide` cleanup via `AbortController`.
- **Edge Cases:**
  - **Missing Main Title:** Logs localized `errorMainTitleNotFound` via `console.error` and exits cleanly without throwing.
  - **Missing Inner `<span>`:** Falls back to `titleElement.appendChild(buttonHost)` without throwing a `TypeError`.
  - **Repeated Execution:** Prevented by the `[data-fa2trakt-root="button"]` idempotency guard.

### Feature 2: Title Extraction

- **ID:** FEAT-02
- **Description:** Extracts the primary title of the movie or series from the FilmAffinity page.
- **Functional Requirements:** FR-01, FR-07
- **Detailed Operation:**
  1. `getFilmaffinityTitle()` queries `SELECTORS.TITLE_SPAN` (`h1#main-title span`) and returns its trimmed `textContent` if non-empty.
  2. If the span is missing or empty, falls back to `SELECTORS.MAIN_TITLE` and concatenates its direct `Node.TEXT_NODE` values via `extractDirectText()`, returning the trimmed result if non-empty.
  3. Uses immutable `Object.freeze(SELECTORS)` constants.
- **Edge Cases:**
  - **Title Element Not Found or Empty:** Logs localized `errorGettingTitle` + `errorTitleNotFound` via `console.error` and returns `null`.
  - **Extension Context Invalidated:** `getLocalizedMessage()` uses cached English/localized fallback messages so error reporting never crashes.
- **Validation Rules:**
  - Extracted title must be a non-empty string after trimming; otherwise returns `null`.

### Feature 3: Content Type Detection

- **ID:** FEAT-03
- **Description:** Determines if the content displayed on the FilmAffinity page is a movie or a TV series/miniseries across `/es/` and `/en/` pages.
- **Functional Requirements:** FR-02, FR-07
- **Detailed Operation:**
  1. `isFilmaffinitySeries()` queries `SELECTORS.TYPE_SPAN` (`.movie-type .type`), trims and lowercases `textContent`, and checks inclusion in frozen `CONFIG.SERIES_TYPE_LABELS` (`serie`, `miniserie`, `serie de tv`, `miniserie de tv`, `series`, `miniseries`, `tv series`, `tv miniseries`).
  2. If `.movie-type .type` is absent or empty, falls back to checking `meta[property="og:type"]` for `video.tv_show`, and then `CONFIG.TITLE_SERIES_PATTERN` against `document.title`.
  3. Always returns a strict boolean (`true` or `false`).
- **Edge Cases:**
  - **Whitespace or Casing Variations:** Normalized with `.trim().toLowerCase()`.
  - **Runtime Exceptions:** Caught in `try/catch`, logging localized `errorDeterminingType` and returning `false`.

### Feature 4: Trakt URL Construction & Validation

- **ID:** FEAT-04
- **Description:** Creates and validates an HTTPS Trakt search URL based on the extracted title and content type.
- **Functional Requirements:** FR-04, FR-07
- **Detailed Operation:**
  1. `createTraktUrl(title)` verifies `typeof title === 'string' && title.trim().length > 0`.
  2. Encodes the trimmed title with `encodeURIComponent()`, calls `isFilmaffinitySeries()`, and selects `https://trakt.tv/search/shows` or `https://trakt.tv/search/movies`.
  3. Validates the constructed URL with `isValidTraktUrl()` (`parsed.protocol === 'https:' && parsed.origin === 'https://trakt.tv'`).
- **Edge Cases:**
  - **Null/Empty Title or Invalid URL:** Logs localized `errorCreatingUrl` with cause (`errorTitleRequired` or `errorInvalidUrl`) and returns `null`.

### Feature 5: Safe Tab Opening & Shadow DOM Toast Feedback

- **ID:** FEAT-05
- **Description:** Opens the validated Trakt search URL in a new tab with `noopener,noreferrer` and surfaces non-intrusive Shadow DOM toast notifications on errors.
- **Functional Requirements:** FR-05, FR-08
- **Detailed Operation:**
  1. `handleSearchClick()` aborts immediately with a localized Shadow DOM toast (`toastCouldNotGetTitle` or `toastCouldNotOpenUrl`) if `getFilmaffinityTitle()` or `createTraktUrl()` returns `null`, preventing error cascades.
  2. `openTraktUrl(url)` verifies the URL via `isValidTraktUrl(url)` and executes `window.open(url, '_blank', 'noopener,noreferrer')`.
  3. Because `noopener` causes `window.open()` to return `null` per the HTML specification even on success, `openTraktUrl()` catches thrown exceptions rather than treating `null` as a failure, displaying a dismissible Shadow DOM toast (`role="alert"`, auto-dismissed after 5000 ms) if an error is thrown.

### Feature 6: Internationalization (i18n)

- **ID:** FEAT-06
- **Description:** Displays UI text, accessible labels, console errors, and toast notifications in the user's preferred language (`es` or `en`).
- **Functional Requirements:** FR-06, FR-07, FR-08
- **Non-Functional Requirements:** NFR-10
- **Detailed Operation:**
  1. `src/manifest.json` defines `"default_locale": "es"`.
  2. Locale files exist in `src/_locales/es/messages.json` and `src/_locales/en/messages.json` with identical key sets.
  3. `src/assets/js/content.js` wraps `chrome.i18n.getMessage()` in `getLocalizedMessage(key, fallback)` and caches critical error/toast messages in `CACHED_MESSAGES` during initialization so UI feedback remains safe even if the extension context is invalidated.
