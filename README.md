# Film2Trakt

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/seyerjo/fa2trakt?label=Release)](https://github.com/seyerjo/fa2trakt/releases/latest)
[![Dev Branch](https://img.shields.io/badge/Dev%20Branch-release/1.5.0-blue.svg)]()
[![GitHub license](https://img.shields.io/github/license/seyerjo/fa2trakt?label=License)](LICENSE)
[![code style: prettier](https://img.shields.io/badge/Code%20Style-Prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Overview

Film2Trakt is a Chrome extension designed to **streamline your movie and series tracking workflow** by intelligently connecting [FilmAffinity](https://www.filmaffinity.com/) with [Trakt.tv](https://trakt.tv/). Tired of copying and pasting titles? With Film2Trakt, you can instantly search for any title from FilmAffinity on Trakt with a single click, saving you time and effort. It's the perfect tool for film and series enthusiasts who use both platforms.

For a more detailed description of the project's vision and objectives, please refer to [docs/01_project_overview.md](./docs/project_overview.md).

## Features ✨

- 🖱️ **One-Click Trakt Search:** Adds an intuitive button on FilmAffinity pages that takes you directly to the search results on Trakt.
- 🔍 **Intelligent Title Extraction:** Automatically captures the exact movie or series title from the FilmAffinity page.
- 🎬 **Automatic Detection (Series/Movie):** Identifies if the content is a movie or a series to direct the search to the correct section on Trakt.
- 👌 **User-Friendly Interface:** A stylish and clearly visible button that integrates natively into the FilmAffinity design.
- ⚠️ **Basic Error Handling:** Alerts the user if there are issues extracting the title.
- 🌍 **Internationalization (i18n) Ready:** Prepared for multiple languages. Currently supports **Spanish (`es`)** for all UI elements and messages.

For a complete and detailed list of features, including edge cases and error handling, please refer to [docs/03_features.md](./docs/03_features.md). For functional and non-functional requirements, check [docs/02_requirements.md](./docs/02_requirements.md).

## Installation 🚀

You can install Film2Trakt in several ways:

1.  **From GitHub Releases (Recommended for users):**

    - Go to the [Releases page](https://github.com/seyerjo/fa2trakt/releases/latest).
    - Download the `.zip` file of the latest version.
    - Unzip the file into a folder on your computer.
    - Open Chrome and navigate to `chrome://extensions`.
    - Enable "Developer mode" in the top right corner.
    - Click "Load unpacked" and select the folder where you unzipped the files.
    - The Film2Trakt extension is now installed and active.

2.  **Loading from Source Code (For developers):**
    - Clone this repository or download the files.
    - Open Chrome and navigate to `chrome://extensions`.
    - Enable "Developer mode".
    - Click "Load unpacked" and select the root folder of the repository (where `manifest.json` is located).

For more detailed development environment setup instructions and prerequisites, please refer to [docs/07_setup_and_installation.md](docs/07_setup_and_installation.md).

## Usage 🎬

Using Film2Trakt is very simple:

1.  Navigate to a movie or series page on the **Spanish version** of FilmAffinity (for example, `https://www.filmaffinity.com/es/filmXXXXXX.html`).
    - **Note:** Currently, the extension only activates on the Spanish site (`/es/`).
2.  You will see a button with the text "Buscar en Trakt" (or similar, depending on the language) next to the main title of the movie or series on the page.
    </br>
    ![Film2Trakt button on FilmAffinity page](./assets/images/imagesfilm2trakt_button.png)
    </br>

3.  Click the button. A new tab will open, displaying the search results for that title on Trakt.tv.

For a more complete step-by-step usage guide and basic troubleshooting, please refer to [docs/08_usage_guide.md](docs/08_usage_guide.md).

## Technologies Used 💻

Film2Trakt is built using the following technologies:

- **JavaScript:** For the main extension logic, title extraction, and interaction with the FilmAffinity DOM.
- **CSS:** For styling the button and ensuring its visual integration with FilmAffinity.
- **Chrome Extension API:** For extension functionality, permissions, and tab handling.
- **Chrome Extension i18n API:** For managing internationalization of texts.

For a more detailed justification of the choice of these technologies, you can consult [docs/05_tech-stack.md](docs/05_tech-stack.md).

## Contributing 👋

Contributions are welcome! If you find a bug, have a suggestion for improvement, or want to add a new feature, please don't hesitate to participate.

- **Report Bugs or Suggest Enhancements:** Open an [Issue on GitHub](https://github.com/seyerjo/fa2trakt/issues). Please describe the problem or suggestion with as much detail as possible.
- **Contribute Code:** If you want to submit code, please follow our contribution process. This generally involves forking the repository, creating a branch, implementing your changes, and submitting a Pull Request.

For detailed guidelines on how to contribute, setting up the development environment for collaboration, and the Pull Request process, please refer to [docs/09_contribution_guidelines.md](docs/09_contribution_guidelines.md).

## Known Issues 🐛

### v1.0

- The extension relies on the current HTML structure of FilmAffinity. Significant changes to the FilmAffinity website could affect the extension's functionality.
- Title extraction might fail on pages with non-standard structures or unusual titles.

## Future Enhancements 💡

We have several ideas for the future of Film2Trakt:

- Improve robustness of error handling and edge case management.
- Integrate directly with the Trakt API for more advanced functionalities (e.g., add to watchlist from FilmAffinity).
- Add support for other FilmAffinity languages (Catalan, English, etc.) by expanding localization files.
- Consider integration with the Chrome context menu.

You can find a list of pending tasks and future ideas in [docs/11_to_do_list.md](docs/11_to_list.md).

## Changelog 📜

Please refer to the [CHANGELOG.md](CHANGELOG.md) file for the complete history of project changes and versions.

## License 📄

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for more details.

## Support / Help 🙌

If you have questions, encounter problems, or need help, please open an [Issue on GitHub](https://github.com/seyerjo/fa2trakt/issues).

---

Thank you for using Film2Trakt!
