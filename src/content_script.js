/**
 * Main content script for the fa2trakt Chrome extension.
 * This IIFE handles the extraction of movie/series titles from FilmAffinity,
 * constructs the corresponding trakt.tv search URL, and opens it in a new tab.
 * It also dynamically adds a search button to the FilmAffinity page.
 */
(function () {
	// DOM Selectors - FilmAffinity page structure
	const SELECTORS = {
		MAIN_TITLE: "h1#main-title",
		TITLE_SPAN: "h1#main-title span",
		MOVIE_TYPE: ".movie-type",
		TYPE_SPAN: ".movie-type .type",
	};

	/**
	 * Extracts the title from the FilmAffinity page.
	 * @returns {string|null} The title of the movie/series or null if not found.
	 */
	function getFilmaffinityTitle() {
		try {
			const titleElement = document.querySelector(SELECTORS.TITLE_SPAN);
			if (titleElement) {
				return titleElement.textContent.trim();
			}
			throw new Error(chrome.i18n.getMessage("errorTitleNotFound"));
		} catch (error) {
			console.error(chrome.i18n.getMessage("errorGettingTitle"), error);
			return null;
		}
	}

	/**
	 * Determines if the FilmAffinity page is for a TV series.
	 * @returns {boolean} True if it's a series, false otherwise.
	 */
	function isFilmaffinitySeries() {
		try {
			const movieTypeSpan = document.querySelector(SELECTORS.MOVIE_TYPE);
			if (movieTypeSpan) {
				const typeSpan = movieTypeSpan.querySelector(SELECTORS.TYPE_SPAN);
				return (
					typeSpan &&
					(typeSpan.textContent === "Miniserie" ||
						typeSpan.textContent === "Serie")
				);
			}
			return false;
		} catch (error) {
			console.error(chrome.i18n.getMessage("errorDeterminingType"), error);
			return false;
		}
	}

	/**
	 * Builds the trakt.tv search URL.
	 * @param {string} title - The title of the movie/series, passed as an argument by the `handleClick()` function.
	 * @returns {string|null} The trakt.tv search URL or null if title is not provided.
	 */
	function createTraktUrl(title) {
		try {
			if (!title) throw new Error(chrome.i18n.getMessage("errorTitleRequired"));
			const encodedTitle = encodeURIComponent(title);
			const isSeries = isFilmaffinitySeries();
			const searchType = isSeries ? "shows" : "movies";
			return `https://trakt.tv/search/${searchType}?q=${encodedTitle}`;
		} catch (error) {
			console.error(chrome.i18n.getMessage("errorCreatingUrl"), error);
			return null;
		}
	}

	/**
	 * Opens the trakt.tv URL in a new tab.
	 * @param {string} url - The URL to open.
	 */
	function openTraktUrl(url) {
		try {
			if (!url) throw new Error(chrome.i18n.getMessage("errorUrlRequired"));
			window.open(url, "_blank");
		} catch (error) {
			console.error(chrome.i18n.getMessage("errorOpeningUrl"), error);
			alert(chrome.i18n.getMessage("alertCouldNotOpenUrl"));
		}
	}

	// Create a button on the FilmAffinity page.
	const titleElement = document.querySelector(SELECTORS.MAIN_TITLE);
	if (!titleElement) {
		throw new Error("Could not find main title element");
	}
	const titleSpan = titleElement.querySelector("span");
	const button = document.createElement("button");
	button.textContent = chrome.i18n.getMessage("searchButtonText");
	button.classList.add("trakt-search-button");
	titleElement.insertBefore(button, titleSpan.nextSibling);

	/**
	 * Handles the click event on the Trakt search button.
	 * This function orchestrates the search process:
	 * 1. It calls `getFilmaffinityTitle()` to retrieve the title from the page.
	 * 2. It then passes this title to `createTraktUrl()` to build the search URL.
	 * 3. Finally, it calls `openTraktUrl()` to open the constructed URL in a new tab.
	 */
	function handleClick() {
		const title = getFilmaffinityTitle();
		const traktUrl = createTraktUrl(title);
		openTraktUrl(traktUrl);
	}

	// Add event listeners to the button
	button.addEventListener("click", handleClick);
})();
