# Film2Trakt

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/seyerjo/fa2trakt?label=Release)](https://github.com/seyerjo/fa2trakt/releases/latest)
[![GitHub last commit](https://img.shields.io/github/last-commit/seyerjo/fa2trakt?label=Last%20commit)](https://github.com/seyerjo/fa2trakt/commits/main)
[![Dev Branch](https://img.shields.io/badge/Dev%20Branch-release/1.0-blue.svg)]()
[![GitHub last commit (release/1.0)](<https://img.shields.io/github/last-commit/seyerjo/fa2trakt/release/1.0?label=Last%20commit%20(release/1.0)>)](https://github.com/seyerjo/fa2trakt/commits/release/1.0)
[![GitHub license](https://img.shields.io/github/license/seyerjo/fa2trakt?label=License)](LICENSE)
[![code style: prettier](https://img.shields.io/badge/Code%20Style-Prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Overview

Film2Trakt is a Chrome extension that seamlessly connects [FilmAffinity website](https://www.filmaffinity.com/) with [Trakt website](https://trakt.tv). With a single click, you can quickly search on Trakt for a movie or series directly from its FilmAffinity page. This eliminates the need to manually copy and paste titles between the two platforms, streamlining your movie and TV show tracking workflow.

## Features

- **One-Click Trakt Search:** Adds a button to FilmAffinity movie/series pages that, when clicked, opens a new tab with the corresponding search results on Trakt.
- **Automatic Title Extraction:** Intelligently extracts the movie or series title from the FilmAffinity page.
- **Series/Movie Detection:** Automatically detects from the FilmAffinity page if the item is a movie or series and redirects the search to the correct Trakt section.
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

2.  You will see a "Search on Trakt" button in the top right corner of the page.

3.  Click the button. A new tab will open, displaying the search results for the movie or series on Trakt website.

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on the GitHub repository. If you'd like to contribute code, please fork the repository and submit a pull request.

## Development Notes

- The extension uses `content.js` to inject a button into FilmAffinity pages and handle the search functionality.
- The `manifest.json` file declares the extension's metadata, permissions, and content scripts.

## Technologies Used

- JavaScript
- CSS
- Chrome Extension API

## Known Issues

### v0.9.5

- The extension relies on the specific HTML structure of FilmAffinity. Changes to the FilmAffinity website may break the extension.
- The extension might not work correctly if the FilmAffinity page does not have a standard movie/series title.

## Future Enhancements

- Add options to configure the button's appearance and position.
- Implement more robust error handling and edge case management.
- Potentially integrate directly with the Trakt API for more advanced functionality (e.g., adding movies/series to your watchlist).
- Add support for other FilmAffinity language versions. The current version of the extension is designed to work with the Spanish (es) version of the FilmAffinity website.
- Consider adding context menu integration.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
