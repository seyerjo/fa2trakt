# Optimization Plan for fa2trakt v1.0

_Note: This optimization plan aligns with the objectives identified in `/resources/notes/dev_notes_v1.0.md` and the pending tasks for v1.0 listed in `/resources/to_do/to_do_list.txt`._

This document details the proposed improvements to optimize the fa2trakt v1.0 extension, focusing on performance, error handling, code structure, and user experience, without adding new features.

## 1. Performance

### 1.1. Button Hover Styles (CSS)

- **Justification:** Currently, style changes on button hover are handled with JavaScript (`mouseover`, `mouseout`). Moving this to CSS is more efficient, uses the browser's native capabilities for handling `:hover` states, and improves separation of concerns (JavaScript for logic, CSS for presentation).
- **Implementation Steps:**

  1.  **Modify `styles/main.css`:** Add the following CSS rules:

      ```css
      .trakt-search-button {
        /* Existing base styles... */
        background-color: #8131a4; /* Base color */
        transition: background-color 0.2s ease; /* Optional: smooth transition */
      }

      .trakt-search-button:hover {
        background-color: #4a5568; /* Hover color */
      }
      ```

  2.  **Modify `content.js`:** Remove the following code blocks:

      ```javascript
      button.addEventListener("mouseover", function () {
        button.style.backgroundColor = "#4a5568";
      });

      button.addEventListener("mouseout", function () {
        button.style.backgroundColor = "#8131a4";
      });
      ```

### 1.2. External Font Loading (Google Fonts)

- **Justification:** The 'Figtree' font is loaded dynamically via JavaScript every time the content script runs. This introduces an external dependency and could have an impact (though likely small) on initial load or rendering time.
- **Implementation Steps:**
  1.  **Evaluate Need:** Determine if the 'Figtree' font is strictly necessary for the extension's functionality or aesthetics.
  2.  **If NOT necessary:**
      - Remove the following code block from `content.js`:
        ```javascript
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
          "https://fonts.googleapis.com/css2?family=Figtree:wght@400;600&display=swap";
        document.head.appendChild(link);
        ```
  3.  **If necessary:**
      - Investigate alternative, more efficient loading methods. One option could be to include it directly in the extension package or look for non-blocking asynchronous loading methods. _Note: Requires further analysis regarding Manifest V3 best practices._

## 2. Error Handling

### 2.1. User Error Messages

- **Justification:** The currently used `alert()` function (`alert("No se pudo abrir la URL de Trakt.tv")`) is blocking for the user and doesn't provide useful information about the cause of the error. Replacing it with `console.error` improves debugging, and considering a non-intrusive notification enhances user experience.
- **Implementation Steps:**
  1.  **Modify `openTraktUrl` in `content.js`:**
      - Replace `alert(...)` with `console.error("Error opening Trakt URL:", error);`.
      - Optional: Implement a `showTemporaryMessage(message)` function that displays a discreet message on the page near the button and call it from the `catch`.
      - Modify the function to accept an optional `context` parameter and use it in the `console.error` for more details.
        ```javascript
        // Modified example
        function openTraktUrl(url, context = "") {
          try {
            if (!url) throw new Error(`URL is required. Context: ${context}`);
            window.open(url, "_blank");
          } catch (error) {
            console.error(
              `Error opening Trakt URL: ${error.message}. Context: ${context}`
            );
            // Optional: showTemporaryMessage(`Error searching Trakt: ${error.message}`);
          }
        }
        ```
  2.  **Modify the button's `click` listener in `content.js`:**
      - Add a check after calling `getFilmaffinityTitle()`:
        ```javascript
        const title = getFilmaffinityTitle();
        if (!title) {
          console.error("Could not extract title from FilmAffinity.");
          // Optional: showTemporaryMessage("Error: Title not found.");
          return; // Stop execution if no title
        }
        const traktUrl = createTraktUrl(title);
        // Pass context to openTraktUrl
        openTraktUrl(traktUrl, `Title: ${title}`);
        ```
      - Ensure `createTraktUrl` also returns `null` or throws an error if `title` is invalid, and handle it in the listener.

### 2.2. CSS Selector Fragility

- **Justification:** The extension relies on specific CSS selectors from FilmAffinity's HTML (`h1#main-title span`, `.movie-type .type`). If FilmAffinity changes its web structure, these selectors might fail and break the extension. While we cannot prevent external changes, we can improve maintainability.
- **Implementation Steps:**
  1.  **Add Comments in `content.js`:** Document alongside each use of `document.querySelector` or similar, which specific element is being targeted.
      ```javascript
      // Example:
      // Try to get the main title container
      const titleElementContainer = document.querySelector("h1#main-title");
      // Try to get the span inside the h1 containing the title text
      const titleElement = document.querySelector("h1#main-title span");
      ```
  2.  **Review (Optional):** Investigate if FilmAffinity uses more stable attributes like `data-*` to identify key elements, although this is uncommon on third-party sites. _Main action is documentation and awareness of the risk._

## 3. Code Structure and Efficiency

### 3.1. Script Encapsulation (IIFE)

- **Justification:** The current code runs in the global scope of the content script. This can lead to naming collisions with FilmAffinity's own JavaScript or other extensions the user might have installed. Using an IIFE (Immediately Invoked Function Expression) creates a local scope for the script, preventing these conflicts.
- **Implementation Steps:**

  1.  **Modify `content.js`:** Wrap all existing code within an IIFE:

      ```javascript
      (function () {
        "use strict"; // Recommended: Enable strict mode

        // --- START ORIGINAL CODE ---
        function getFilmaffinityTitle() {
          // ...
        }
        // ... (rest of functions and code) ...
        button.addEventListener("click", function () {
          // ...
        });
        // --- END ORIGINAL CODE ---
      })();
      ```

### 3.2. Constants for Selectors

- **Justification:** CSS selectors are used as string literals directly in the code. Centralizing them in constants improves readability and greatly facilitates maintenance if selectors need updating in the future (they only need to be changed in one place).
- **Implementation Steps:**

  1.  **Modify `content.js` (inside the IIFE):** Define a constants object at the beginning:

      ```javascript
      (function() {
        'use strict';

        const SELECTORS = {
          mainTitleContainer: "h1#main-title",
          titleSpan: "h1#main-title span",
          movieTypeContainer: ".movie-type",
          movieTypeSpan: ".movie-type .type" // More specific if necessary
        };

        function getFilmaffinityTitle() {
          try {
            // Use the constant
            const titleElement = document.querySelector(SELECTORS.titleSpan);
            // ...
          } // ...
        }

        function isFilmaffinitySeries() {
          try {
            // Use the constant
            const movieTypeSpan = document.querySelector(SELECTORS.movieTypeContainer);
            if (movieTypeSpan) {
              // Use the constant
              const typeSpan = movieTypeSpan.querySelector(SELECTORS.movieTypeSpan);
              // ...
            } // ...
          } // ...
        }

        // ... (Update other uses of querySelector)

        // Create button
        const titleElementContainer = document.querySelector(SELECTORS.mainTitleContainer);
        const titleSpan = titleElementContainer.querySelector("span"); // Could be SELECTORS.titleSpan if unique
        // ...

      })();
      ```
