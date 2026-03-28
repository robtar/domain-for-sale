# procomputer.sk — Domain for Sale

Official static landing page for the `procomputer.sk` domain sale.

## Overview

- Single-page site built with HTML/CSS/JavaScript.
- Languages: Slovak (`sk`) and English (`en`) toggle in UI.
- Key domain details: price, transfer time, escrow support, registration year.
- Contact form with basic UI/validation (currently client-side only).

## Structure

- `index.html` — main page.
- `assets/css/style.css` — styles.
- `assets/js/main.js` — behavior (form, i18n, submit handling).
- `assets/js/translations.js` — translation strings for `sk` and `en`.

## Run locally

1. Open `index.html` in your browser.

OR

2. Run a local HTTP server from repository root:

- Python 3: `python -m http.server 8000`
- Node (http-server): `npx http-server . -p 8000`

Then visit `http://localhost:8000`.

## Notes

- No dependencies in `package.json`.
- No build step required.
- Add form backend integration if needed for production.

## License

See `LICENSE`.
