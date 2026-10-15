# Virtual Exhibition

A web app for exploring and curating virtual art exhibitions. Users can search artwork across multiple museum collections, filter and sort results, view artwork details and build their own exhibitions.

This was built collaboratively during the Northcoders Full-Stack Software Development bootcamp.

## Links

- **Live site:** [mueseumexhibition.netlify.app](https://mueseumexhibition.netlify.app/)
- **Backend repo:** [github.com/AOYousufi/SE-Exhibiton-BE](https://github.com/AOYousufi/SE-Exhibiton-BE)

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React |
| Language | JavaScript |
| Styling | CSS3 + Material UI |
| State | React Context API |
| Routing | React Router |
| HTTP client | Axios |
| Hosting | Netlify |

## Features

- Search across the Harvard Art Museums and V&A APIs
- Paginated browsing for large result sets
- Filter and sort artwork by different properties
- Detailed artwork views with images and metadata
- Build browser-local curated exhibitions and add/remove artworks
- Rename exhibitions and confirm collection deletions
- Export and restore collections using JSON backups
- Search and sort artworks within saved exhibitions
- Browse themed artwork searches from the home page

## Local setup

```bash
git clone https://github.com/AOYousufi/Virtual-Exhibition.git
cd Virtual-Exhibition
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

The frontend uses `https://se-exhibiton-be.onrender.com/api` unless overridden. To point it at a different backend, create `.env.local` with:

```env
VITE_API_BASE_URL=http://localhost:4157/api
```

For production, set `VITE_API_BASE_URL` in your hosting provider and redeploy. Never put private API keys in frontend environment variables.

## Data sources

- [Harvard Art Museums API](https://harvardartmuseums.org/collections/api)
- [Victoria and Albert Museum API](https://www.vam.ac.uk/api)

## Accessibility & UX improvements

Following technical review feedback, the project was improved with:

- clearer keyboard and screen-reader labels
- more purposeful hover states and reduced decorative motion
- improved colour contrast
- single-column artwork cards on small screens
- URL-based pagination so refreshes keep the current results page
- a back-to-results link from artwork details
- more visible collection notifications
- consistent artwork cards inside saved exhibitions
- a clear notice explaining local browser storage
- a client-side 404 route

## Checks

```bash
npm run lint
npm run build
```

GitHub Actions runs these checks on changes. A successful build does **not** establish that the deployed museum APIs and images work in a browser.

## Storage and accounts

Collections live in this browser's `localStorage`; **there is no shared login or server-side exhibition account system** in this version. Use **Export collections** to make a backup before changing browsers or clearing site data. Importing a backup replaces the current local collections after confirmation.

## Requirements

- Node.js v18+

Built as a group project during the Northcoders Full-Stack Software Development bootcamp.
