/**
 * Main content script for the Film2Trakt (fa2trakt) Chrome extension.
 * Extracts movie/series titles from FilmAffinity (/es/ and /en/ pages),
 * builds validated HTTPS Trakt.tv search URLs, and renders Shadow DOM UI.
 */
(function film2TraktContentScript() {
    'use strict';

    /**
     * Centralized, frozen DOM selectors for FilmAffinity and extension-owned hosts.
     */
    const SELECTORS = Object.freeze({
        MAIN_TITLE: 'h1#main-title',
        TITLE_SPAN: 'h1#main-title span',
        TITLE_SPAN_CHILD: 'span',
        MOVIE_TYPE: '.movie-type',
        TYPE_SPAN: '.movie-type .type',
        OG_TYPE_META: 'meta[property="og:type"]',
        BUTTON_HOST: '[data-fa2trakt-root="button"]',
        TOAST_HOST: '[data-fa2trakt-root="toast"]'
    });

    /**
     * Frozen runtime configuration and series-detection constants.
     */
    const CONFIG = Object.freeze({
        TRAKT_ORIGIN: 'https://trakt.tv',
        STYLESHEET_PATH: 'assets/css/content.css',
        TOAST_DURATION_MS: 5000,
        SERIES_TYPE_LABELS: Object.freeze([
            'serie',
            'miniserie',
            'serie de tv',
            'miniserie de tv',
            'series',
            'miniseries',
            'tv series',
            'tv miniseries'
        ]),
        TITLE_SERIES_PATTERN: /\((?:serie de tv|miniserie de tv|tv series|tv miniseries)\)/i
    });

    /**
     * Frozen UI action identifiers used for Shadow DOM event delegation.
     */
    const ACTIONS = Object.freeze({
        SEARCH: 'search',
        DISMISS_TOAST: 'dismiss-toast'
    });

    /**
     * Safely retrieves a localized string from chrome.i18n.
     * Guards against extension context invalidation or missing keys.
     * @param {string} key - The message key defined in _locales/<lang>/messages.json.
     * @param {string} [fallback=''] - Fallback string returned if lookup fails.
     * @returns {string} The localized message or the fallback string.
     */
    function getLocalizedMessage(key, fallback = '') {
        try {
            if (typeof chrome !== 'undefined' && chrome.i18n && typeof chrome.i18n.getMessage === 'function') {
                const message = chrome.i18n.getMessage(key);
                if (message) {
                    return message;
                }
            }
        } catch (error) {
            console.warn('Film2Trakt i18n lookup failed:', error);
        }
        return fallback;
    }

    /**
     * Safely resolves an extension-bundled asset URL via chrome.runtime.getURL.
     * @param {string} relativePath - Asset path relative to the extension root.
     * @returns {string|null} The resolved extension URL or null if context is invalidated.
     */
    function getAssetUrl(relativePath) {
        try {
            if (typeof chrome !== 'undefined' && chrome.runtime && typeof chrome.runtime.getURL === 'function') {
                return chrome.runtime.getURL(relativePath);
            }
        } catch (error) {
            console.warn('Film2Trakt runtime URL lookup failed:', error);
        }
        return null;
    }

    const STYLESHEET_URL = getAssetUrl(CONFIG.STYLESHEET_PATH);

    const CACHED_MESSAGES = Object.freeze({
        errorMainTitleNotFound: getLocalizedMessage(
            'errorMainTitleNotFound',
            'Could not find the main title element on the page.'
        ),
        errorGettingTitle: getLocalizedMessage(
            'errorGettingTitle',
            'Error extracting the title from FilmAffinity.'
        ),
        errorTitleNotFound: getLocalizedMessage(
            'errorTitleNotFound',
            'Title element not found on the page.'
        ),
        errorDeterminingType: getLocalizedMessage(
            'errorDeterminingType',
            'Error determining whether the page is a TV series.'
        ),
        errorCreatingUrl: getLocalizedMessage(
            'errorCreatingUrl',
            'Error building the Trakt search URL.'
        ),
        errorTitleRequired: getLocalizedMessage(
            'errorTitleRequired',
            'A non-empty title is required to build the URL.'
        ),
        errorInvalidUrl: getLocalizedMessage(
            'errorInvalidUrl',
            'Generated URL is not a valid HTTPS Trakt.tv destination.'
        ),
        errorOpeningUrl: getLocalizedMessage(
            'errorOpeningUrl',
            'Error opening the Trakt URL.'
        ),
        errorUrlRequired: getLocalizedMessage(
            'errorUrlRequired',
            'A valid URL is required to open it.'
        ),
        toastCouldNotGetTitle: getLocalizedMessage(
            'toastCouldNotGetTitle',
            'Could not extract the title from this FilmAffinity page.'
        ),
        toastCouldNotOpenUrl: getLocalizedMessage(
            'toastCouldNotOpenUrl',
            'Could not open Trakt.tv. Check your connection or try again.'
        ),
        toastCloseLabel: getLocalizedMessage('toastCloseLabel', 'Close notification')
    });

    const lifecycleController = new AbortController();
    let toastTimeoutId = null;

    /**
     * Extracts direct text-node content from a container element, ignoring child elements.
     * @param {Element} element - The DOM container element to inspect.
     * @returns {string} The trimmed direct text content.
     */
    function extractDirectText(element) {
        let text = '';
        for (const node of element.childNodes) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent) {
                text += node.textContent;
            }
        }
        return text.trim();
    }

    /**
     * Extracts the primary movie or series title from the FilmAffinity page.
     * Falls back to direct text nodes inside h1#main-title if the inner span is absent.
     * @returns {string|null} The trimmed title, or null if not found or empty.
     */
    function getFilmaffinityTitle() {
        try {
            const titleSpan = document.querySelector(SELECTORS.TITLE_SPAN);
            if (titleSpan && titleSpan.textContent) {
                const spanText = titleSpan.textContent.trim();
                if (spanText.length > 0) {
                    return spanText;
                }
            }

            const mainTitle = document.querySelector(SELECTORS.MAIN_TITLE);
            if (mainTitle) {
                const directText = extractDirectText(mainTitle);
                if (directText.length > 0) {
                    return directText;
                }
            }

            throw new Error(getLocalizedMessage('errorTitleNotFound', CACHED_MESSAGES.errorTitleNotFound));
        } catch (error) {
            console.error(getLocalizedMessage('errorGettingTitle', CACHED_MESSAGES.errorGettingTitle), error);
            return null;
        }
    }

    /**
     * Determines whether the current FilmAffinity page represents a TV series or miniseries.
     * Supports both Spanish (/es/) and English (/en/) labels with metadata/title fallbacks.
     * @returns {boolean} True when detected as a series or miniseries, false otherwise.
     */
    function isFilmaffinitySeries() {
        try {
            const typeSpan = document.querySelector(SELECTORS.TYPE_SPAN);
            if (typeSpan && typeSpan.textContent) {
                const normalizedType = typeSpan.textContent.trim().toLowerCase();
                if (normalizedType.length > 0) {
                    return CONFIG.SERIES_TYPE_LABELS.includes(normalizedType);
                }
            }

            const ogTypeMeta = document.querySelector(SELECTORS.OG_TYPE_META);
            if (ogTypeMeta) {
                const ogType = (ogTypeMeta.getAttribute('content') || '').trim().toLowerCase();
                if (ogType === 'video.tv_show') {
                    return true;
                }
            }

            return CONFIG.TITLE_SERIES_PATTERN.test(document.title || '');
        } catch (error) {
            console.error(
                getLocalizedMessage('errorDeterminingType', CACHED_MESSAGES.errorDeterminingType),
                error
            );
            return false;
        }
    }

    /**
     * Validates that a URL string uses HTTPS and targets the expected Trakt.tv origin.
     * @param {string} url - The URL string to validate.
     * @returns {boolean} True if the URL is a valid HTTPS Trakt.tv URL.
     */
    function isValidTraktUrl(url) {
        if (typeof url !== 'string' || url.trim().length === 0) {
            return false;
        }
        try {
            const parsed = new URL(url);
            return parsed.protocol === 'https:' && parsed.origin === CONFIG.TRAKT_ORIGIN;
        } catch {
            return false;
        }
    }

    /**
     * Builds and validates the Trakt.tv search URL for the given title.
     * @param {string|null} title - Extracted movie or series title.
     * @returns {string|null} A validated HTTPS Trakt.tv search URL, or null on invalid input.
     */
    function createTraktUrl(title) {
        try {
            if (typeof title !== 'string' || title.trim().length === 0) {
                throw new Error(getLocalizedMessage('errorTitleRequired', CACHED_MESSAGES.errorTitleRequired));
            }

            const encodedTitle = encodeURIComponent(title.trim());
            const searchType = isFilmaffinitySeries() ? 'shows' : 'movies';
            const targetUrl = `${CONFIG.TRAKT_ORIGIN}/search/${searchType}?q=${encodedTitle}`;

            if (!isValidTraktUrl(targetUrl)) {
                throw new Error(getLocalizedMessage('errorInvalidUrl', CACHED_MESSAGES.errorInvalidUrl));
            }

            return targetUrl;
        } catch (error) {
            console.error(getLocalizedMessage('errorCreatingUrl', CACHED_MESSAGES.errorCreatingUrl), error);
            return null;
        }
    }

    /**
     * Creates an open Shadow DOM host element and attaches the scoped extension stylesheet.
     * @param {string} tagName - HTML tag name for the host element.
     * @param {string} rootType - Identifier stored in the data-fa2trakt-root attribute.
     * @returns {{ host: HTMLElement, shadowRoot: ShadowRoot }} The host and its shadow root.
     */
    function createShadowHost(tagName, rootType) {
        const host = document.createElement(tagName);
        host.setAttribute('data-fa2trakt-root', rootType);
        const shadowRoot = host.attachShadow({ mode: 'open' });

        if (STYLESHEET_URL) {
            const styleLink = document.createElement('link');
            styleLink.setAttribute('rel', 'stylesheet');
            styleLink.setAttribute('href', STYLESHEET_URL);
            shadowRoot.appendChild(styleLink);
        }

        return { host, shadowRoot };
    }

    /**
     * Dismisses any currently displayed Film2Trakt Shadow DOM toast notification.
     */
    function dismissToast() {
        if (toastTimeoutId !== null) {
            clearTimeout(toastTimeoutId);
            toastTimeoutId = null;
        }
        const existingToast = document.querySelector(SELECTORS.TOAST_HOST);
        if (existingToast) {
            existingToast.remove();
        }
    }

    /**
     * Displays a non-intrusive Shadow DOM toast notification on the page.
     * @param {string} message - Localized message to show to the user.
     * @param {boolean} [isError=true] - Whether to apply error toast styling.
     */
    function showToast(message, isError = true) {
        dismissToast();

        const container = document.body || document.documentElement;
        if (!container) {
            return;
        }

        const { host, shadowRoot } = createShadowHost('div', 'toast');
        const toast = document.createElement('div');
        toast.className = isError ? 'fa2trakt-toast fa2trakt-toast--error' : 'fa2trakt-toast';
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');

        const messageSpan = document.createElement('span');
        messageSpan.className = 'fa2trakt-toast__message';
        messageSpan.textContent = message;

        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'fa2trakt-toast__close';
        closeButton.setAttribute('data-fa2trakt-action', ACTIONS.DISMISS_TOAST);
        closeButton.setAttribute(
            'aria-label',
            getLocalizedMessage('toastCloseLabel', CACHED_MESSAGES.toastCloseLabel)
        );
        closeButton.textContent = '\u00d7';

        toast.appendChild(messageSpan);
        toast.appendChild(closeButton);
        shadowRoot.appendChild(toast);

        shadowRoot.addEventListener(
            'click',
            event => {
                const target = event.target;
                if (target instanceof Element && target.closest(`[data-fa2trakt-action="${ACTIONS.DISMISS_TOAST}"]`)) {
                    dismissToast();
                }
            },
            { signal: lifecycleController.signal }
        );

        container.appendChild(host);
        toastTimeoutId = setTimeout(dismissToast, CONFIG.TOAST_DURATION_MS);
    }

    /**
     * Opens a validated HTTPS Trakt.tv URL in a new tab with noopener and noreferrer.
     * Note: Per the HTML specification, window.open with "noopener" always returns null
     * even when the tab opens successfully, so only thrown exceptions indicate failure.
     * @param {string|null} url - The validated HTTPS URL to open.
     * @returns {boolean} True if window.open executed without throwing, false otherwise.
     */
    function openTraktUrl(url) {
        try {
            if (!url) {
                throw new Error(getLocalizedMessage('errorUrlRequired', CACHED_MESSAGES.errorUrlRequired));
            }
            if (!isValidTraktUrl(url)) {
                throw new Error(getLocalizedMessage('errorInvalidUrl', CACHED_MESSAGES.errorInvalidUrl));
            }

            window.open(url, '_blank', 'noopener,noreferrer');
            return true;
        } catch (error) {
            console.error(getLocalizedMessage('errorOpeningUrl', CACHED_MESSAGES.errorOpeningUrl), error);
            showToast(getLocalizedMessage('toastCouldNotOpenUrl', CACHED_MESSAGES.toastCouldNotOpenUrl));
            return false;
        }
    }

    /**
     * Handles the click action on the injected Trakt search button.
     */
    function handleSearchClick() {
        const title = getFilmaffinityTitle();
        if (!title) {
            showToast(getLocalizedMessage('toastCouldNotGetTitle', CACHED_MESSAGES.toastCouldNotGetTitle));
            return;
        }

        const traktUrl = createTraktUrl(title);
        if (!traktUrl) {
            showToast(getLocalizedMessage('toastCouldNotOpenUrl', CACHED_MESSAGES.toastCouldNotOpenUrl));
            return;
        }

        openTraktUrl(traktUrl);
    }

    /**
     * Injects the Shadow DOM search button next to the FilmAffinity title idempotently
     * and binds lifecycle-managed event listeners.
     */
    function initialize() {
        if (document.querySelector(SELECTORS.BUTTON_HOST)) {
            return;
        }

        const titleElement = document.querySelector(SELECTORS.MAIN_TITLE);
        if (!titleElement) {
            console.error(
                getLocalizedMessage('errorMainTitleNotFound', CACHED_MESSAGES.errorMainTitleNotFound)
            );
            return;
        }

        const { host: buttonHost, shadowRoot } = createShadowHost('span', 'button');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'fa2trakt-button';
        button.setAttribute('data-fa2trakt-action', ACTIONS.SEARCH);
        button.textContent = getLocalizedMessage('searchButtonText', 'Search on Trakt');
        button.setAttribute(
            'aria-label',
            getLocalizedMessage('searchButtonAriaLabel', 'Search this title on Trakt.tv in a new tab')
        );

        shadowRoot.appendChild(button);
        shadowRoot.addEventListener(
            'click',
            event => {
                const target = event.target;
                if (target instanceof Element && target.closest(`[data-fa2trakt-action="${ACTIONS.SEARCH}"]`)) {
                    handleSearchClick();
                }
            },
            { signal: lifecycleController.signal }
        );

        const titleSpan = titleElement.querySelector(SELECTORS.TITLE_SPAN_CHILD);
        if (titleSpan) {
            titleElement.insertBefore(buttonHost, titleSpan.nextSibling);
        } else {
            titleElement.appendChild(buttonHost);
        }

        window.addEventListener(
            'pagehide',
            () => {
                dismissToast();
                lifecycleController.abort();
            },
            { once: true, signal: lifecycleController.signal }
        );
    }

    initialize();
})();
