// Function to extract the title from the FilmAffinity page.
function getFilmaffinityTitle() {
    if (titleElement) {
        return titleElement.textContent.trim();
    }
    return null;
}

// Function to determine if the FilmAffinity page is for a TV series.
function isFilmaffinitySeries() {
    const movieTypeSpan = document.querySelector('.movie-type');
    if (movieTypeSpan) {
        const typeSpan = movieTypeSpan.querySelector('.type');
        return typeSpan && (typeSpan.textContent === 'Miniserie' || typeSpan.textContent === 'Serie');
    }
    return false;
}

// Function to build the Trakt.tv search URL.
function createTraktUrl(title) {
    if (title) {
        const encodedTitle = encodeURIComponent(title);
        const isSeries = isFilmaffinitySeries();
        const searchType = isSeries ? 'shows' : 'movies';
        return `https://trakt.tv/search/${searchType}?q=${encodedTitle}`;
    }
    return null;
}

// Function to open the Trakt.tv URL in a new tab.
function openTraktUrl(url) {
    if (url) {
        window.open(url, '_blank');
    } else {
        alert('No se pudo obtener el título de la película/serie.');
    }
}

// We create a style element for the Figtree font and add the style element to the head. 
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;600&display=swap';
document.head.appendChild(link);

// We create a button on the FilmAffinity page.
const button = document.createElement('button');
button.textContent = 'Buscar en Trakt.tv';
button.style.position = 'fixed';
button.style.top = '3px';
button.style.right = '40px';
button.style.zIndex = '1000'; // To be above other elements.
button.style.backgroundColor = '#8131a4'; // A tone similar to Trakt.tv's corporate color.
button.style.color = '#fffff9'; // Trakt.tv's characteristic white color.
button.style.border = 'none';
button.style.padding = '10px 15px';
button.style.borderRadius = '5px';
button.style.cursor = 'pointer';
button.style.fontSize = '16px';
button.style.fontFamily = "'Figtree', 'sans-serif'"; // Trakt.tv's font.
button.style.fontWeight = 'bold';
button.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.3)'; // A subtle shadow effect.
button.style.transition = 'background-color 0.3s ease'; // Smooth transition on hover.

// We add a hover effect to change slightly when hovering the mouse.
button.addEventListener('mouseover', function () {
    button.style.backgroundColor = '#4a5568'; // A slightly lighter tone on hover.
});

button.addEventListener('mouseout', function () {
    button.style.backgroundColor = '#8131a4'; // Return to the original color when not hovering the mouse.
});

document.body.appendChild(button);

// We add an event to the button so that when clicked, our logic is executed.
button.addEventListener('click', function () {
    const title = getFilmaffinityTitle();
    const traktUrl = createTraktUrl(title);
    openTraktUrl(traktUrl);
});