# Code Style Guide: Film2Trakt

## 1. Code Structure

- Use ES6 modules for import/export
- Avoid classes, prefer pure functions
- Group related logic into specific modules

## 2. Naming Conventions

- `camelCase` for variables and functions
- `PascalCase` only for constructors (if used)
- `UPPER_CASE` for constants
- Meaningful prefixes: `is`, `has`, `handle`

## 3. Best Practices

- Validate types with `typeof` and reality checks
- Use destructuring and modern operators
- Handle errors with `try/catch` in async operations
- Limit the scope of variables

## 4. Specifications for Chrome Extensions

- Use `chrome.*` APIs with proper permission handling
- Implement Content Security Policy in manifest
- Separate logic of background scripts and UI

## 5. Security

- Sanitize inputs with DOMPurify
- Validate URLs before fetch
- Use `chrome.storage` instead of global variables

## 6. Performance

- Optimize content scripts with observers
- Use `requestIdleCallback` for non-critical tasks
- Limit re-renders in popups

Example of a valid module:

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
