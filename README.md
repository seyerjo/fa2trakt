<div align="center">

<img src="./.github/assets/banner.png" alt="Film2Trakt Banner" width="840" />

# Film2Trakt

**One-click bridge from FilmAffinity movie and series pages directly to Trakt.tv search results.**

A lightweight, zero-dependency Chrome Manifest V3 extension built with vanilla ES6+ JavaScript, native CSS3, and Chrome `i18n` localization.

<p>
  <a href="#overview">Overview</a> ·
  <a href="#quick-start">Quick Start</a> ·
  <a href="#capabilities">Capabilities</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#installation">Installation</a> ·
  <a href="#documentation">Documentation</a> ·
  <a href="#author">Author</a>
</p>

[![Stack](https://img.shields.io/badge/Stack-Chrome%20MV3%20%7C%20Vanilla%20JS%20%7C%20CSS3-8131a4.svg)](#architecture)
[![Version](https://img.shields.io/badge/Version-1.0.4-blue.svg)](#documentation)
[![License](https://img.shields.io/badge/License-Apache--2.0-brightgreen.svg)](#license)
[![Last Commit](https://img.shields.io/github/last-commit/seyerjo/fa2trakt)](https://github.com/seyerjo/fa2trakt/commits/main)

</div>

---

## Overview

Users who discover or rate films and TV shows on [FilmAffinity](https://www.filmaffinity.com/) while tracking their watch history on [Trakt.tv](https://trakt.tv/) normally have to copy titles manually, switch tabs, choose between movies and shows, and run a new search.

**Film2Trakt** eliminates that friction with a single-purpose Manifest V3 content script. It injects a styled **Buscar en Trakt** button directly beside the page heading on FilmAffinity, detects whether the entry is a movie or a series, encodes the title safely, and opens the corresponding Trakt search endpoint in a new tab—with no background service worker, no external libraries, and no runtime tracking.

## Quick Start

1. Open Google Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode** and click **Load unpacked**, then select the `src` folder inside this repository (`fa2trakt/src`).
3. Visit any Spanish FilmAffinity title page matching `https://www.filmaffinity.com/es/film*.html`.
4. Click the injected **Buscar en Trakt** button next to the main title to open `https://trakt.tv/search/movies?q=...` or `https://trakt.tv/search/shows?q=...` in a new tab.

![Film2Trakt button injected on a Spanish FilmAffinity page](./src/assets/images/image_fa2trakt_button.png)

## Capabilities

- **One-Click Trakt Lookup:** Injects a `.trakt-search-button` element directly after the title `<span>` inside `h1#main-title` and opens the constructed Trakt search URL via `window.open(url, "_blank")`.
- **Resilient Title Extraction:** Uses centralized DOM selectors (`SELECTORS`) to extract and trim the primary title from `h1#main-title span`.
- **Automatic Movie vs. Series Detection:** Inspects `.movie-type .type` for `"Miniserie"` or `"Serie"` to route queries automatically to `/search/shows` or `/search/movies`.
- **Pure CSS Integration & Responsive Design:** Styles base state, `:hover` transitions, system font stack, and mobile breakpoints (`@media (max-width: 768px)`) exclusively through `src/styles/main.css` without JavaScript style injection.
- **Native Chrome Localization (`i18n`):** Reads UI labels, console error messages, and user feedback strings from `src/_locales/es/messages.json` (`default_locale: "es"`).
- **Least-Privilege Manifest V3 Security:** Requests only the `activeTab` permission and enforces `script-src 'self'; object-src 'self'` via Content Security Policy (`content_security_policy`).

## Architecture

```mermaid
sequenceDiagram
    participant User
    participant Button as "Search Button (UI)"
    participant ContentScript as "src/content_script.js"
    participant DOM as "FilmAffinity DOM"
    participant Browser as "Browser / Trakt.tv"

    User->>Button: Clicks button
    Button->>ContentScript: handleClick()
    ContentScript->>DOM: getFilmaffinityTitle()
    DOM-->>ContentScript: Trimmed title string (or null)
    ContentScript->>DOM: createTraktUrl(title) -> isFilmaffinitySeries()
    DOM-->>ContentScript: "Miniserie" | "Serie" check
    ContentScript->>ContentScript: Encode title & build /search/{shows|movies} URL
    ContentScript->>Browser: openTraktUrl(url) -> window.open(url, "_blank")
    Browser->>User: Opens Trakt.tv search results in new tab
```

- **Core Stack:** Chrome Extensions Manifest V3, Vanilla JavaScript (ES6+ isolated inside an IIFE in `src/content_script.js`), CSS3 (`src/styles/main.css`), and Chrome `i18n` API (`src/_locales/es/messages.json`).
- **Design & Reliability:** Zero runtime dependencies or frameworks; centralized `SELECTORS` object for DOM queries; per-function `try/catch` error isolation logging localized diagnostics via `console.error` and alerting the user if a URL cannot be opened.

<details open>
<summary>Project Structure</summary>

```text
fa2trakt/
├── .github/
│   └── assets/
│       ├── avatar.png                    # Local circular author avatar
│       └── banner.png                    # Local panoramic repository banner
├── docs/
│   ├── 01_project_blueprint.md           # Vision, requirements, and feature specs
│   └── 02_engineering_guidelines.md      # Architecture, tech stack, setup, and style guide
├── src/
│   ├── _locales/
│   │   └── es/
│   │       └── messages.json             # Spanish i18n strings (default_locale)
│   ├── assets/
│   │   └── images/                       # Extension icons (16/48/128px) and UI screenshot
│   ├── styles/
│   │   └── main.css                      # Pure CSS button styles and responsive rules
│   ├── content_script.js                 # Core DOM extraction, URL builder, and click handler
│   └── manifest.json                     # Manifest V3 definition (activeTab + CSP)
├── CHANGELOG.md                          # Semantic Versioning release history
├── LICENSE                               # Apache License 2.0
└── README.md                             # Project documentation
```

</details>

## Installation

### Prerequisites

- **Google Chrome** (latest stable release)
- **Git** (only required if installing from source)

### From GitHub Releases

1. Download the latest `.zip` archive from the [Releases page](https://github.com/seyerjo/fa2trakt/releases/latest).
2. Extract the archive to a local folder.
3. Open `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, and select the extracted extension folder containing `manifest.json`.

### From Source

```bash
git clone https://github.com/seyerjo/fa2trakt.git
cd fa2trakt
```

1. Open `chrome://extensions` in Google Chrome.
2. Toggle **Developer mode** on in the top-right corner.
3. Click **Load unpacked** and select `fa2trakt/src` (where `manifest.json` lives).
4. Whenever you edit files under `src/`, click the reload icon on the **Film2Trakt** card in `chrome://extensions`.

## Documentation

- **[Changelog](./CHANGELOG.md):** Release history and version milestones.
- **[Project Blueprint](./docs/01_project_blueprint.md):** Vision, requirements, and feature specifications.
- **[Engineering Guidelines](./docs/02_engineering_guidelines.md):** Technical architecture, tech stack, local setup, and code style standards.

## License

Licensed under the **Apache-2.0** License — see **[LICENSE](./LICENSE)** for details.

## Author

<p>
  <a href="https://github.com/seyerjo">
    <img src="./.github/assets/avatar.png" width="84" align="left" alt="Jose Miguel Reyes" />
  </a>
  <strong>Jose Miguel Reyes</strong><br />
  Senior IT Consultant, CTO/CIO, and Full Stack Developer focused on Data Analytics, AI, and clean software engineering.
</p>

<br clear="left" />

<p><em><strong>"Engineering for the future."</strong></em></p>

<p>
  <a href="https://github.com/seyerjo"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="https://josemreyes.com"><img src="https://img.shields.io/badge/Website-josemreyes.com-0ea5e9?style=flat-square&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8%2BPGxpbmUgeDE9IjIiIHkxPSIxMiIgeDI9IjIyIiB5Mj0iMTIiLz48cGF0aCBkPSJNMTIgMmExNS4zIDE1LjMgMCAwIDEgNCAxMCAxNS4zIDE1LjMgMCAwIDEtNCAxMCAxNS4zIDE1LjMgMCAwIDEgNC0xMHoiLz48L3N2Zz4%3D" alt="Website" /></a>
  <a href="https://www.linkedin.com/in/seyerjo"><img src="https://img.shields.io/badge/LinkedIn-seyerjo-0A66C2?style=flat-square&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjMgMyAxOCAxOCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xOSAzYTIgMiAwIDAgMSAyIDJ2MTRhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDE0bS0uNSAxNS41di01LjNhMy4yNiAzLjI2IDAgMCAwLTMuMjYtMy4yNmMtLjg1IDAtMS44NC41Mi0yLjI4IDEuM3YtMS4xMWgtMi43OXY4LjM3aDIuNzl2LTQuOTNjMC0uNzcuNjItMS40IDEuMzktMS40YTEuNCAxLjQgMCAwIDEgMS40IDEuNHY0LjkzaDIuNzVNNi44OCA4LjU2YTEuNjggMS42OCAwIDAgMCAxLjY4LTEuNjhjMC0uOTMtLjc1LTEuNjktMS42OC0xLjY5YTEuNjkgMS42OSAwIDAgMC0xLjY5IDEuNjljMCAuOTMuNzYgMS42OCAxLjY5IDEuNjhtMS4zOSA5Ljk0di04LjM3SDUuNXY4LjM3aDIuNzd6Ii8%2BPC9zdmc%2B" alt="LinkedIn" /></a>
  <a href="https://x.com/seyerjo"><img src="https://img.shields.io/badge/-@seyerjo-000000?style=flat-square&logo=x&logoColor=white&labelColor=555555" alt="X" /></a>
  <a href="https://github.com/seyerjo/fa2trakt/issues"><img src="https://img.shields.io/badge/Feedback-Issues-0969DA?style=flat-square&logo=github&logoColor=white" alt="Issues" /></a>
</p>

> **Find this repository useful?** Consider giving it a star to support the project and bookmark it for future reference:
>
> [![Star this repo](https://img.shields.io/github/stars/seyerjo/fa2trakt?style=flat-square&label=Star%20this%20repo&logo=github&color=eab308)](https://github.com/seyerjo/fa2trakt)
>
> Have a technical question or suggestion? Open an **[Issue](https://github.com/seyerjo/fa2trakt/issues)**.
