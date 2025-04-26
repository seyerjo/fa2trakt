# Development Prompts: Film2Trakt

This document collects examples of prompts used or potentially useful during the development of the Film2Trakt extension, primarily for interacting with AI assistants or for guiding development tasks.

## 1. Initial Setup & Planning

- **Task:** Define the core purpose and features of a Chrome extension to link FilmAffinity and Trakt.tv.
  - **Prompt:** "Design a simple Chrome extension named 'Film2Trakt'. Its main goal is to allow users viewing a movie or series page on FilmAffinity (`filmaffinity.com`) to easily search for that same title on Trakt.tv. The extension should inject a button onto the FilmAffinity page. Clicking the button should open a new tab with the Trakt.tv search results for the extracted title. Consider basic requirements like title extraction and handling movies vs. series."
- **Task:** Outline the basic file structure for the extension.
  - **Prompt:** "Based on the Film2Trakt concept, propose a minimal file structure for a Chrome Manifest V3 extension. Include necessary files like the manifest, a content script, and potentially CSS."

## 2. `manifest.json` Configuration

- **Task:** Generate a basic `manifest.json` file.
  - **Prompt:** "Generate a `manifest.json` file for a Chrome extension (Manifest V3) named 'Film2Trakt'. It should inject a content script `content_script.js` and a CSS file `styles/main.css` into pages matching `*://www.filmaffinity.com/es/film*.html`. Request the `activeTab` permission. Set the default locale to `es` and use message keys `__MSG_appName__` and `__MSG_appDesc__` for the name and description."
- **Task:** Explain specific manifest keys.
  - **Prompt:** "Explain the purpose and usage of the `permissions`, `content_scripts`, `matches`, and `default_locale` keys within a Chrome extension `manifest.json` file."

## 3. `content_script.js` Logic

- **Task:** Generate a function to extract the title.
  - **Prompt:** "Write a JavaScript function `getFilmaffinityTitle()` for a Chrome content script that runs on a FilmAffinity page (e.g., `https://www.filmaffinity.com/es/film123456.html`). The function should find and return the main movie/series title text. Include basic error handling if the title element cannot be found, logging an error to the console." _(Self-correction: Initial prompts might need refinement based on actual DOM structure)_.
  - **Refinement Prompt:** "Refine the `getFilmaffinityTitle()` function. The title on FilmAffinity is located within an `h1` tag with the id `main-title`. Ensure the function specifically targets this element and returns its `textContent`. Add error handling using `console.error` if the element isn't found."
- **Task:** Generate a function to detect content type.
  - **Prompt:** "Write a JavaScript function `isFilmaffinitySeries()` that attempts to determine if the current FilmAffinity page is for a TV series or a movie. Analyze the page structure (e.g., look for specific elements or text like 'TV Series', 'Miniseries' often found near the title or in metadata sections) and return `true` if it's likely a series, `false` otherwise. Log potential issues."
- **Task:** Generate a function to create the Trakt URL.
  - **Prompt:** "Write a JavaScript function `createTraktUrl(title, isSeries)` that takes a title string and a boolean `isSeries`. It should return the appropriate Trakt.tv search URL: `https://trakt.tv/search/shows?query=[encoded_title]` if `isSeries` is true, and `https://trakt.tv/search/movies?query=[encoded_title]` otherwise. Ensure the title is properly URL-encoded."
- **Task:** Generate a function to open the URL.
  - **Prompt:** "Write a JavaScript function `openTraktUrl(url)` that uses the `chrome.tabs.create()` API to open the given URL in a new browser tab. Include error handling using `console.error` if the tab cannot be opened."
- **Task:** Implement button injection and event handling.
  - **Prompt:** "Write the main execution logic for `content_script.js`. It should: 1. Create a button element. 2. Set its text content to 'Search on Trakt'. 3. Add a CSS class 'trakt-search-button'. 4. Find the appropriate location on the FilmAffinity page (e.g., near the `h1#main-title`) and insert the button there. 5. Add a click event listener to the button that orchestrates calling `getFilmaffinityTitle()`, `isFilmaffinitySeries()`, `createTraktUrl()`, and `openTraktUrl()` in sequence."
- **Task:** Integrate i18n into `content_script.js`.
  - **Prompt:** "Refactor the existing `content_script.js` script. Replace all hardcoded user-facing strings (button text, alert messages) and console error messages with calls to `chrome.i18n.getMessage('messageKey')`. Assume appropriate keys exist (e.g., `searchButtonText`, `alertCouldNotOpenUrl`, `errorGettingTitle`)."

## 4. Styling (`styles/main.css`)

- **Task:** Generate basic CSS for the button.
  - **Prompt:** "Generate CSS rules for a class `.trakt-search-button`. Provide basic styling for background color, text color, padding, border-radius, and a subtle box-shadow. Also, add a hover effect that slightly changes the background color or brightness."
- **Task:** Add responsive CSS.
  - **Prompt:** "Add a media query to the `.trakt-search-button` styles in `main.css`. For screen widths below 768px, reduce the padding and font size slightly."

## 5. Documentation Generation

- **Task:** Generate specific documentation sections.
  - **Prompt:** "Based on the current project state (Film2Trakt extension code and previous notes), generate the content for the 'Project Overview' section (`/docs/01_project_overview.md`). Include a Central Vision Statement, Core Objectives, Problem Addressed, General Solution Description, and Guiding Purpose."
  - **Prompt:** "Generate the 'Functional Requirements' and 'Non-Functional Requirements' sections for `/docs/02_requirements.md`, based on the Film2Trakt extension's features and expected behavior."
  - **Prompt:** "Describe the project structure and architecture for `/docs/03_project_structure.md`. Detail the core components (`manifest.json`, `content_script.js`, etc.), their responsibilities, how they interact, the data flow for a typical search, and the technology stack."
  - **Prompt:** "Create a setup and installation guide (`/docs/04_setup_and_installation.md`) covering both development setup (cloning, loading unpacked) and user installation from the Chrome Web Store (placeholder)."
  - **Prompt:** "Write a user usage guide (`/docs/05_usage_guide.md`) explaining how end-users interact with the extension on FilmAffinity."
  - **Prompt:** "Draft contribution guidelines (`/docs/06_contribution_guidelines.md`) covering bug reporting, feature suggestions, and the code contribution process (fork, branch, PR)."
  - **Prompt:** "Refine the existing `/docs/07_development_notes.md` file. Reorganize the content into logical sections (Overview, Implementation Details, Log, Future Enhancements, Tech Stack, Challenges) while preserving all relevant information from the original notes."

## 6. Refactoring & Debugging

- **Task:** Identify potential improvements.
  - **Prompt:** "Review the `content_script.js` script for the Film2Trakt extension. Identify potential areas for improvement regarding code clarity, efficiency, error handling robustness, or resilience to DOM changes on FilmAffinity."
- **Task:** Debug a specific issue.
  - **Prompt:** "The 'Search on Trakt' button is not appearing on FilmAffinity pages after the latest Chrome update. Analyze the `content_script.js` script and the `manifest.json` file. What are the likely causes? Suggest debugging steps, focusing on content script injection, DOM selectors, and potential manifest changes required by the update."
