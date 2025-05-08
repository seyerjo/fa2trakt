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
 * Builds the Trakt.tv search URL.
 * @param {string} title - The title of the movie/series.
 * @returns {string|null} The Trakt.tv search URL or null if title is not provided.
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
 * Opens the Trakt.tv URL in a new tab.
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

// Use system font stack for better performance and security
const fontStyle = document.createElement("style");
fontStyle.textContent = `
.trakt-search-button {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
`;
document.head.appendChild(fontStyle);
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

// Add event listeners to the button
function handleMouseOver() {
	button.classList.add("trakt-search-button-hover");
}

function handleMouseOut() {
	button.classList.remove("trakt-search-button-hover");
}

/**
 * Handles the click event on the Trakt search button.
 * Gets the title from FilmAffinity, creates the Trakt URL and opens it.
 */
function handleClick() {
	const title = getFilmaffinityTitle();
	const traktUrl = createTraktUrl(title);
	openTraktUrl(traktUrl);
}

button.addEventListener("mouseover", handleMouseOver);
button.addEventListener("mouseout", handleMouseOut);
button.addEventListener("click", handleClick);
