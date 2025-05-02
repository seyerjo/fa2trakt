# Technology Stack Rationale: Film2Trakt

This document explains the reasoning behind the technology choices made for the Film2Trakt Chrome extension. Given the project's focused scope, the stack prioritizes simplicity, direct browser integration, and leveraging native browser capabilities.

## 1. Core Technologies

- **JavaScript (Vanilla ES6+):**

  - **Rationale:** As the fundamental language of the web and Chrome extensions, JavaScript is the natural choice. Using vanilla JS (without external frameworks like React, Vue, or Angular) was selected for several reasons:
    - **Minimal Overhead:** Avoids adding the weight and complexity of a framework for a relatively simple task primarily involving DOM manipulation and API calls. This keeps the extension lightweight and performant.
    - **Direct API Access:** Allows direct interaction with standard Web APIs (DOM) and Chrome Extension APIs without abstraction layers.
    - **Sufficient Capability:** Modern JavaScript (ES6+) provides sufficient features (arrow functions, promises, template literals, etc.) to write clean and maintainable code for the current scope.
    - **Optimized Implementation:** Uses centralized DOM selectors and try-catch error handling for robustness. Performance optimized through system fonts and efficient DOM queries.
  - **Interaction:** Forms the core logic within `content_script.js`, interacting with the DOM and Chrome APIs.

- **CSS3:**

  - **Rationale:** Standard technology for styling web content. Chosen for its direct applicability to styling the injected UI elements (the button).
    - **Simplicity:** Sufficient for the limited styling needs of the extension.
    - **Direct Application:** Easily applied to DOM elements via CSS classes defined in `styles/main.css` and linked in `manifest.json`.
    - **Performance:** Native browser rendering is highly optimized.
  - **Interaction:** Defines the visual appearance of the `.trakt-search-button` injected by `content_script.js`.

- **HTML (via DOM Manipulation):**
  - **Rationale:** While no separate `.html` files are used for the core functionality (like popups or options pages in this version), HTML is implicitly used when `content_script.js` creates and injects the button element (`document.createElement('button')`) into the FilmAffinity page's DOM.
  - **Interaction:** JavaScript creates and manipulates HTML elements within the host page's DOM.

## 2. Environment & APIs

- **Google Chrome Extension Runtime (Manifest V3):**

  - **Rationale:** This is the target platform. Building specifically for the Chrome runtime allows leveraging its dedicated APIs and ensures compatibility. Manifest V3 was chosen as it's the current standard, offering improved security and performance models compared to V2.
  - **Interaction:** The entire extension operates within this environment. `manifest.json` defines how the extension integrates with the browser.

- **Chrome Extension APIs:**

  - **Rationale:** Essential for interacting with browser features beyond the scope of a single web page.
    - `chrome.i18n`: Chosen for native, efficient internationalization support provided by the browser itself, avoiding external libraries. Handles loading appropriate language strings based on browser settings.
    - `chrome.tabs`: Specifically `chrome.tabs.create`, selected as the simplest, most direct way to fulfill the core requirement of opening the Trakt search results in a new tab.
    - `chrome.runtime`: Used implicitly for the extension context and potentially for error information (`chrome.runtime.lastError`).
  - **Interaction:** Called from `content_script.js` to perform actions like retrieving localized text and opening new tabs.

- **Web APIs (DOM & Events):**
  - **Rationale:** Standard browser APIs are the necessary tools for interacting with the content of the FilmAffinity web page.
    - **DOM Manipulation (`document.querySelector`, `createElement`, `appendChild`, etc.):** Required to find the title and insert the button.
    - **Event Listeners (`addEventListener`):** Standard mechanism to react to user interaction (clicking the button).
  - **Interaction:** Used extensively within `content_script.js` to read from and write to the FilmAffinity page structure.

## 3. Development & Tooling (Current & Potential)

- **Git & GitHub:**
  - **Rationale:** Standard version control system and platform for collaboration, code hosting, issue tracking, and managing contributions. Essential for any software project.
- **(Optional) Node.js/npm:**
  - **Rationale:** While not currently used for runtime dependencies, Node.js and npm are the standard ecosystem for JavaScript development tooling. They would be chosen if the project incorporates:
    - **ESLint:** Planned for v2.0 to enforce code quality standards
    - **Prettier:** Already used for code formatting
    - **Testing Frameworks:** Potential addition for automated testing
    - **Build Tools:** If needed for future Trakt API integration

## 4. Excluded Technologies (and Why)

- **JavaScript Frameworks (React, Vue, Angular, Svelte):** Not used due to the simplicity of the UI (a single button) and core logic. Adding a framework would introduce unnecessary overhead and complexity for the current scope. They would be considered if a complex popup or options page were required.
- **CSS Frameworks (Bootstrap, Tailwind):** Not needed for styling a single button. Vanilla CSS provides sufficient control with minimal overhead.
- **External Libraries:** No external JS libraries are used to minimize dependencies and maintain performance. Native Web and Chrome APIs suffice.
- **Databases / `chrome.storage`:** Not required for the current functionality, which is stateless within the context of a single page load. Would be necessary if implementing features requiring persistent user settings or Trakt API authentication tokens.

In summary, the technology stack for Film2Trakt v1.0 was deliberately kept minimal and focused, leveraging native browser capabilities (JavaScript, CSS, Web APIs, Chrome APIs) to achieve the core functionality efficiently and performantly within the Chrome extension environment.
