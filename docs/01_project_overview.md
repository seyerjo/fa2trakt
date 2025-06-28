# Project Overview: Film2Trakt

> **Current Version:** 1.0.3

## 1. Central Vision Statement

Streamline the user's [FilmAffinity](https://www.filmaffinity.com/) movie and series tracking by integrating it with [Trakt](https://trakt.tv/) using an intuitive browser extension. This extension will enable users to search for movies and series on Trakt directly from FilmAffinity, enhancing their tracking and discovery experience.

## 2. Core Objectives

- **Accurate Content Identification:** Reliably extract movie and series titles directly from FilmAffinity pages.
- **Seamless Trakt Integration:** Generate correct Trakt search URLs based on the identified title and content type (movie or series).
- **Non-Intrusive UI:** Integrate a clearly identifiable "Search on Trakt" button within the FilmAffinity interface without disrupting the user experience.
- **Effortless Workflow:** Enable users to initiate a Trakt search for the currently viewed content with a single click.
- **Localized Experience:** Provide user interface elements and messages in the user's preferred language.

## 3. Problem/Need Addressed

FilmAffinity users who also utilize Trakt currently lack a direct, efficient method to look up movies or series they are viewing on FilmAffinity within the Trakt platform. This often involves manual steps like copying titles, switching tabs, and pasting into the Trakt search bar, creating friction in their workflow.

## 4. General Solution Description

Film2Trakt is a Chrome browser extension that injects a dedicated button onto FilmAffinity movie and series pages. When clicked, the extension automatically:

1.  Extracts the title of the content from the page.
2.  Determines if the content is a movie or a TV series.
3.  Constructs the appropriate search URL for Trakt.
4.  Opens this URL in a new browser tab.
    The extension utilizes Chrome's internationalization (i18n) features to display button text and handle messages in the user's language.

## 5. Guiding Purpose ("North Star")

This project aims to be the simplest, most reliable bridge between FilmAffinity and Trakt. Every feature and decision should prioritize streamlining the user's workflow for searching content across these two platforms, focusing on accuracy, ease of use, and minimal intrusion.
