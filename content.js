/**
 * Extracts the title from the FilmAffinity page.
 * @returns {string|null} The title of the movie/series or null if not found.
 */
function getFilmaffinityTitle() {
  try {
    const titleElement = document.querySelector("h1#main-title span");
    if (titleElement) {
      return titleElement.textContent.trim();
    }
    throw new Error("Title element not found");
  } catch (error) {
    console.error("Error getting FilmAffinity title:", error);
    return null;
  }
}

/**
 * Determines if the FilmAffinity page is for a TV series.
 * @returns {boolean} True if it's a series, false otherwise.
 */
function isFilmaffinitySeries() {
  try {
    const movieTypeSpan = document.querySelector(".movie-type");
    if (movieTypeSpan) {
      const typeSpan = movieTypeSpan.querySelector(".type");
      return (
        typeSpan &&
        (typeSpan.textContent === "Miniserie" ||
          typeSpan.textContent === "Serie")
      );
    }
    return false;
  } catch (error) {
    console.error("Error determining if FilmAffinity is a series:", error);
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
    if (!title) throw new Error("Title is required");
    const encodedTitle = encodeURIComponent(title);
    const isSeries = isFilmaffinitySeries();
    const searchType = isSeries ? "shows" : "movies";
    return `https://trakt.tv/search/${searchType}?q=${encodedTitle}`;
  } catch (error) {
    console.error("Error creating Trakt URL:", error);
    return null;
  }
}

/**
 * Opens the Trakt.tv URL in a new tab.
 * @param {string} url - The URL to open.
 */
function openTraktUrl(url) {
  try {
    if (!url) throw new Error("URL is required");
    window.open(url, "_blank");
  } catch (error) {
    console.error("Error opening Trakt URL:", error);
    alert("No se pudo abrir la URL de Trakt.tv");
  }
}

// Create a style element for the Figtree font and add it to the head.
const link = document.createElement("link");
link.rel = "stylesheet";
link.href =
  "https://fonts.googleapis.com/css2?family=Figtree:wght@400;600&display=swap";
document.head.appendChild(link);

// Create a button on the FilmAffinity page.
const button = document.createElement("button");
button.textContent = "Buscar en Trakt.tv";
button.classList.add("trakt-search-button"); // Use a class for styling
document.body.appendChild(button);

// Add event listeners to the button
button.addEventListener("mouseover", function () {
  button.style.backgroundColor = "#4a5568";
});

button.addEventListener("mouseout", function () {
  button.style.backgroundColor = "#8131a4";
});

button.addEventListener("click", function () {
  const title = getFilmaffinityTitle();
  const traktUrl = createTraktUrl(title);
  openTraktUrl(traktUrl);
});
