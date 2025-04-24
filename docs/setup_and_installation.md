# Setup and Installation Guide: Film2Trakt

This guide provides instructions for setting up the development environment and installing the Film2Trakt Chrome extension.

## 1. Development Setup

Follow these steps if you want to contribute to the development of the extension or run it locally from the source code.

### Prerequisites

- **Git:** Required for cloning the repository. ([Download Git](https://git-scm.com/downloads))
- **Google Chrome:** The extension is developed for the Chrome browser. ([Download Chrome](https://www.google.com/chrome/))
- **(Optional but Recommended) Node.js and npm:** While not strictly necessary for the current version, they might be used for future development tasks like linting, testing, or build processes. ([Download Node.js](https://nodejs.org/))

### Steps

1.  **Clone the Repository:**
    Open your terminal or command prompt and run the following command to clone the project files to your local machine:

    ```bash
    git clone https://github.com/your-username/fa2trakt.git # Replace with the actual repository URL
    cd fa2trakt
    ```

2.  **Load the Extension in Chrome (Developer Mode):**

    - Open Google Chrome.
    - Navigate to the extensions page by typing `chrome://extensions` in the address bar and pressing Enter.
    - Enable **"Developer mode"** using the toggle switch, usually located in the top-right corner of the page.
    - Click the **"Load unpacked"** button that appears.
    - In the file dialog that opens, navigate to the directory where you cloned the repository (`fa2trakt`) and select this main project folder.
    - Click **"Select Folder"**.

3.  **Verify Installation:**

    - The Film2Trakt extension should now appear in your list of installed extensions.
    - Ensure the extension is enabled (toggle switch next to its name).
    - Navigate to a FilmAffinity movie or series page (e.g., `https://www.filmaffinity.com/es/film******.html`).
    - You should see the "Search on Trakt" button appear near the title.

4.  **Making Changes:**
    - If you modify the source code (e.g., `content.js`, `main.css`, `manifest.json`), you need to reload the extension for the changes to take effect.
    - Go back to the `chrome://extensions` page.
    - Find the Film2Trakt extension card and click the reload icon (a circular arrow).

## 2. User Installation (from Chrome Web Store)

_(This section describes the intended installation method for end-users once the extension is published.)_

The easiest way for regular users to install Film2Trakt is through the official Chrome Web Store.

1.  Visit the Film2Trakt extension page on the Chrome Web Store:
    - **[Link Placeholder - To be added once published]**
2.  Click the **"Add to Chrome"** button.
3.  Review the requested permissions and click **"Add extension"** in the confirmation dialog.
4.  The extension will be automatically installed and enabled. You should see its icon (if defined) in your browser toolbar, and its functionality will be active on relevant FilmAffinity pages.
