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
  - Reload service worker with `chrome.runtime.reload()` after critical changes

- Content Script Patterns:

  - Strict isolation with IIFE:
    ```javascript
    (function filmAffinityObserver() {
    	// DOM observation logic
    })();
    ```




- Performance Optimizations:

## 5. Chrome Extension Specifics

- Use Manifest V3
- Implement CSP in manifest.json
- Separate background/content/popup scripts

- Follow least privilege for permissions


## 7. Security Requirements

- Implement HTTPS for all network requests

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
- Cache DOM selectors.
- Memoize expensive operations.
- Suggest the optimization of resources included in the extension (images, etc.).
