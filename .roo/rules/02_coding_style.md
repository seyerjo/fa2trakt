### Code Style and Structure:

- Write concise, technical JavaScript/TypeScript code with accurate examples.
- Avoid unnecessary comments.
- Use modern JavaScript features and best practices.
- Prefer functional programming patterns; minimize use of classes.
- Use descriptive variable names (e.g., isExtensionEnabled, hasPermission).
- Structure files: manifest.json, background scripts, content scripts, popup scripts, options pages, and stylesheets.

### Naming Conventions:

- Use lowercase with underscores for file names (e.g., content_script.js, background_worker.js).
- Use camelCase for function and variable names.
- Use PascalCase for class names (if used).

### TypeScript Usage:

- Encourage TypeScript for type safety and better developer experience.
- Use interfaces for defining message structures and API responses.
- Leverage TypeScript's union types and type guards for runtime checks.

### Extension Architecture:

- Implement a clear separation of concerns between different extension components.
- Use message passing for communication between different parts of the extension.
- Implement proper state management using chrome.storage API.

### Manifest and Permissions:

- Use the latest manifest version (v3) unless there's a specific need for v2.
- Follow the principle of least privilege for permissions.
- Implement optional permissions where possible.

### Security and Privacy:

- Implement Content Security Policy (CSP) in manifest.json.
- Use HTTPS for all network requests.
- Sanitize user inputs and validate data from external sources.
- Implement proper error handling and logging.
