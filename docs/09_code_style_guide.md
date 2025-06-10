# Code Style Guide: Film2Trakt

## 1. General Principles

- Follow Chrome Extension best practices and security guidelines
- Maintain context-aware development
- Ensure new code integrates with existing architecture
- Provide complete file content when making changes

## 2. Code Structure & Style

- Use ES6 modules for import/export
- Prefer pure functions over classes
- Group related logic into modules
- Write concise, technical code
- Avoid unnecessary comments
- Use modern JavaScript features

## 3. Naming Conventions

- Files: `lowercase_with_underscores.js`
- Variables/functions: `camelCase`
- Constructors/Classes: `PascalCase` (if used)
- Constants: `UPPER_CASE`
- Meaningful prefixes: `is`, `has`, `handle`

## 4. JavaScript ES6 (Manifest V3 Focus)

- Service Worker Implementation:

  - Register listeners in `chrome.runtime.onInstalled`
  - Inject content scripts using:
    ```javascript
    chrome.scripting.registerContentScripts([
    	{
    		id: "main-script",
    		matches: ["*://www.filmaffinity.com/*"],
    		js: ["content_script.js"],
    		persistAcrossSessions: true,
    	},
    ]);
    ```
  - Reload service worker with `chrome.runtime.reload()` after critical changes

- Content Script Patterns:

  - Strict isolation with IIFE:
    ```javascript
    (function filmAffinityObserver() {
    	// DOM observation logic
    })();
    ```
  - Bidirectional communication (Note: Not currently used in v1.0.2, but included for future reference):

    ```javascript
    // Send ratings
    chrome.runtime.sendMessage({
    	type: "SYNC_RATINGS",
    	payload: getMovieRatings(),
    });

    // Receive updates
    chrome.runtime.onMessage.addListener((msg) => {
    	if (msg.type === "TRAKT_SYNC_COMPLETE") {
    		showStatusBadge(msg.count);
    	}
    });
    ```

- Message Validation (Note: Not currently used in v1.0.2, but included for future reference):

  - Base schema for all messages:
    ```javascript
    const isValidSyncMessage = (msg) =>
    	msg?.type === "SYNC_RATINGS" &&
    	Array.isArray(msg.payload) &&
    	msg.payload.every(isValidMovieEntry);
    ```

- Performance Optimizations:
  - Use `MutationObserver` for DOM changes:
    ```javascript
    const observer = new MutationObserver(handleListUpdates);
    observer.observe(document.getElementById("user-ratings-list"), {
    	childList: true,
    	subtree: true,
    });
    ```
  - Implement scroll handler debouncing:
    ```javascript
    const updateScrollPosition = debounce(() => {
    	// Scroll tracking logic
    }, 200);
    ```

## 5. Chrome Extension Specifics

- Use Manifest V3
- Implement CSP in manifest.json
- Separate background/content/popup scripts
- Use message passing for inter-component communication (Note: Not currently used in v1.0.2)
- Follow least privilege for permissions
- Use `chrome.storage` for state management if needed (Note: Not currently used in v1.0.2)

## 7. Security Requirements

- Implement HTTPS for all network requests
- Sanitize inputs with DOMPurify
- Validate external data
- Use `chrome.storage` for sensitive data and warn against storing critical information in insecure locations like the page's `localStorage`.
- Proper error handling and logging
- Sender Verification: When communicating between extension components, the sender's identity must be verified for increased security.

## 8. Documentation Standards

- JSDoc for all functions/classes:
  - Brief description
  - `@param` for all parameters, specifying their types.
  - `@returns` for return values, specifying their types.
  - `@example` for complex functions, showing their usage.
  - `@throws` for possible errors that the function may throw.
- Consistent comment style:
  - Start with `/**` on a separate line.
  - Each tag (`@param`, `@returns`, etc.) on its own line.
  - End with `*/` on a separate line.
- Document all exported symbols.
- Update documentation whenever functionality changes.
- Use descriptive but concise language in the documentation.

## 9. Performance

- The current implementation uses `window.open`, which is synchronous and does not return a Promise or allow checking `chrome.runtime.lastError` for success/failure.
- Optimize content scripts with observers.
- Use `requestIdleCallback` for non-critical tasks.
- Limit re-renders in popups.
- Cache DOM selectors.
- Memoize expensive operations.
- Use `chrome.alarms` for scheduled tasks instead of `setInterval`.
- Explain the efficient use of `chrome.storage`, warning against excessive reads/writes or very large data.
- Suggest the optimization of resources included in the extension (images, etc.).
- Implement or suggest lazy loading for non-critical extension features.

Example of a well-documented module:

```javascript
// background_actions.js
const hasValidSession = async () => {
	const { session } = await chrome.storage.local.get("session");
	return Boolean(session?.expiresAt > Date.now());
};

const handleAuthError = (error) => {
	console.error("Auth failure:", error.message);
	chrome.notifications.create("auth-error", {
		type: "basic",
		title: "Authentication Error",
		message: "Please re-login",
		iconUrl: "images/icon_128.png",
	});
};

export const authModule = { hasValidSession, handleAuthError };
```
