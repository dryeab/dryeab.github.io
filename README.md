# dryeab.github.io

Personal portfolio — React (Create React App) + Tailwind CSS, deployed to GitHub Pages.

## Getting started

```bash
npm install
npm start        # dev server on http://localhost:3000
```

## Scripts

| Script                 | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `npm start`            | Dev server with hot reload                          |
| `npm run build`        | Production bundle into `build/`                     |
| `npm test`             | Test runner (watch mode)                            |
| `npm run lint`         | ESLint over `src/`                                  |
| `npm run lint:fix`     | ESLint with autofix (includes import sorting)       |
| `npm run format`       | Prettier over the repo                              |
| `npm run format:check` | Fail if anything is unformatted                     |
| `npm run deploy`       | Build and publish `build/` to the `gh-pages` branch |

## Layout

```
src/
  App.js                 page composition — hero, sections, sidenotes
  index.js               entry point
  index.css              design tokens (CSS custom properties) + component styles
  components/
    Accordion.js         collapsible entry card, shared by Experience and Projects
    Experience.js        maps CV roles onto the accordion (adds tenure + timeline)
    Skills.js            skill groups with per-technology icons
    Header.js            nav, scroll spy, theme toggle, mobile drawer
    Footer.js
  theme/ThemeContext.js  light/dark state, persisted to localStorage
  data/cv.js             all page content
```

All page content lives in `src/data/cv.js` — editing the site normally means editing
that file and nothing else.

## Theming

Colours are CSS custom properties defined on `:root` (dark) and overridden under
`html.light` in `src/index.css`. A small inline script in `public/index.html`
applies the stored theme before first paint so the page never flashes the wrong
palette; it mirrors the resolution logic in `src/theme/ThemeContext.js`.
