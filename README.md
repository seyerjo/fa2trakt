# Film2Trakt

<div align="left">
	<img src="https://img.shields.io/badge/Release-v1.0-4848EC.svg" alt="Version">
	<img src="https://img.shields.io/badge/Update-APR%202025-F33F3F.svg" alt="Update">
	<img src="https://img.shields.io/badge/License-Apache%202.0%20License-800000.svg" alt="License">
	<img src="https://img.shields.io/badge/Chrome-Extension-4285F4.svg" alt="Chrome Extension">
	<img src="https://img.shields.io/badge/Code-JavaScript-F7DF1E.svg" alt="JavaScript">
	<img src="https://img.shields.io/badge/Code-CSS-1572B6.svg" alt="CSS">
	<img src="https://img.shields.io/badge/Code%20Style-Prettier-ff69b4.svg" alt="Code Style: Prettier">
</div>

## Overview

Film2Trakt is a Chrome extension that seamlessly connects [FilmAffinity website](https://www.filmaffinity.com/) with [Trakt website](https://trakt.tv). With a single click, you can quickly search on Trakt for a movie or series directly from its FilmAffinity page. This eliminates the need to manually copy and paste titles between the two platforms, streamlining your movie and TV show tracking workflow.

## Features

- **One-Click Trakt Search:** Adds a button next to the title of the movie or series on FilmAffinity pages that, when clicked, opens a new tab with the corresponding search results on Trakt.
- **Automatic Title Extraction:** Intelligently extracts the movie or series title from the FilmAffinity page.
- **Series/Movie Detection:** Automatically detects if the item is a movie or series and redirects the search to the correct Trakt section.
- **User-Friendly Interface:** Features a clearly visible and stylish button that integrates well with the FilmAffinity website.
- **Error Handling:** Provides a user-friendly alert if the title cannot be extracted from the FilmAffinity page.

## Installation

1.  Download the extension files from the GitHub repository.
2.  Open Chrome and navigate to `chrome://extensions`.
3.  Enable "Developer mode" in the top right corner.
4.  Click "Load unpacked" and select the directory containing the extension files (where `manifest.json` is located).
5.  The Film2Trakt extension is now installed and active.

## Usage

1.  Browse to a movie or series page on FilmAffinity (e.g., `filmaffinity.com/en/filmXXXXXX.html`).
2.  You will see a "Search on Trakt" button next to the title of the movie or series on the page.
3.  Click the button. A new tab will open, displaying the search results for the movie or series on Trakt website.

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on the GitHub repository. If you'd like to contribute code, please fork the repository and submit a pull request.

## Development Notes

- The extension uses `content.js` to inject a button into FilmAffinity pages and handle the search functionality.
- The `styles/main.css` file styles the button to integrate well with the FilmAffinity website.
- The `manifest.json` file declares the extension's metadata, permissions, and content scripts.

## Technologies Used

- JavaScript
- CSS
- Chrome Extension API

## Known Issues

### v1.0

- The extension relies on the specific HTML structure of FilmAffinity. Changes to the FilmAffinity website may break the extension.
- The extension might not work correctly if the FilmAffinity page does not have a standard movie/series title.

## Future Enhancements

- Implement more robust error handling and edge case management.
- Potentially integrate directly with the Trakt API for more advanced functionality (e.g., adding movies/series to your watchlist).
- Add support for other FilmAffinity language versions. The current version of the extension is designed to work with the Spanish (es) version of the FilmAffinity website.
- Consider adding context menu integration.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
