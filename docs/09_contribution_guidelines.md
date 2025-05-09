# Contribution Guidelines: Film2Trakt

Thank you for considering contributing to the Film2Trakt project! I welcome contributions from the community to help improve the extension. Please take a moment to review these guidelines to ensure a smooth collaboration process.

## 1. How to Contribute

There are several ways you can contribute:

- **Reporting Bugs:** If you find a bug or unexpected behavior, please report it.
- **Suggesting Enhancements:** Have an idea for a new feature or an improvement to an existing one? Let me know!
- **Code Contributions:** Help fix bugs or implement new features by contributing code.
- **Documentation:** Improve existing documentation or add new guides.
- **Translation:** Help translate the extension into other languages by adding or updating locale files in the `_locales/` directory.

## 2. Reporting Bugs

Before submitting a bug report, please check the existing issues to see if someone has already reported it. If not, create a new issue and provide the following information:

- **Clear Title:** A concise summary of the bug.
- **Detailed Description:** Explain the issue clearly.
- **Steps to Reproduce:** Provide a step-by-step guide on how to trigger the bug.
- **Expected Behavior:** What you expected to happen.
- **Actual Behavior:** What actually happened.
- **Environment:**
  - Your operating system (e.g., Windows 11, macOS Sonoma).
  - Your Google Chrome version (`chrome://version`).
  - Film2Trakt extension version (if known, from `chrome://extensions`).
- **(Optional) Screenshots or Videos:** Visual aids can be very helpful.

## 3. Suggesting Enhancements

I welcome suggestions for new features or improvements! Please create a new issue to propose your idea:

- **Clear Title:** A concise summary of the enhancement.
- **Detailed Description:** Explain the feature or improvement clearly. Why is it needed? What problem does it solve?
- **Proposed Solution (Optional):** If you have ideas on how it could be implemented, feel free to share them.
- **Use Cases:** Describe scenarios where this enhancement would be beneficial.

## 4. Code Contributions

If you'd like to contribute code, please follow these steps:

1.  **Set Up Development Environment:** Follow the instructions in `07_setup_and_installation.md` to get the project running locally.
2.  **Fork the Repository:** Create your own fork of the main project repository on GitHub.
3.  **Create a Feature Branch:** Before starting work, create a new branch from the `main` (or `develop`, if applicable) branch in your fork. Use a descriptive name (e.g., `fix/button-alignment`, `feat/add-language-support`).
    ```bash
    git checkout -b feat/your-feature-name
    ```
4.  **Write Code:** Make your changes, adhering to the project's coding style and guidelines `10_code_style_guide.md`. Ensure your code is clear, commented where necessary, and follows best practices for Chrome extensions.
5.  **Commit Changes:** Make clear, concise commit messages. Consider following conventional commit message formats if adopted by the project (e.g., `Add support for French locale`).
    ```bash
    git add .
    git commit -m "Describe your change concisely"
    ```
6.  **Push to Your Fork:** Push your feature branch to your fork on GitHub.
    ```bash
    git push origin feat/your-feature-name
    ```
7.  **Submit a Pull Request (PR):**

    - Go to the main project repository on GitHub.
    - You should see a prompt to create a Pull Request from your recently pushed branch. Click it.
    - Provide a clear title and description for your PR, explaining the changes you made and referencing any related issues (e.g., "Closes #12").
    - Ensure your PR targets the correct base branch (usually `main` or `develop`).
    - Submit the PR.

8.  **Code Review:** I will review your PR. Be prepared to discuss your changes and make adjustments based on feedback.
9.  **Merging:** Once approved, your PR will be merged into the main codebase.

## 5. Code of Conduct

All contributors are expected to adhere to the project's Code of Conduct. Please ensure you read and understand it before participating `11_code_of_conduct.md`.

---

Thank you again for your interest in contributing to Film2Trakt!
