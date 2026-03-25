# Virtual Exhibition — Frontend

A web app for exploring and curating virtual art exhibitions. Search and browse artworks across multiple museum collections, filter and sort through large datasets, and build your own curated exhibitions.

Integrates the **Harvard Art Museums API** and **Victoria & Albert Museum API**, connected to a custom backend for user accounts and saved exhibitions.

---

## 🔗 Links

- **Live Site:** [mueseumexhibition.netlify.app](https://mueseumexhibition.netlify.app/)
- **Backend Repo:** [github.com/Sultan0013/SE-Exhibiton-BE](https://github.com/Sultan0013/SE-Exhibiton-BE)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React |
| Language | JavaScript |
| Styling | CSS3 + Material UI |
| State | React Context API |
| Routing | React Router |
| HTTP Client | Axios |
| Hosting | Netlify |

---

## ✨ Features

- **Multi-API search** — query artworks across Harvard Art Museums and V&A simultaneously
- **Paginated browsing** — Previous/Next navigation handles large datasets without performance hits
- **Filter & sort** — narrow results by medium, date, culture, or collection
- **Artwork detail view** — images, descriptions, and full metadata per item
- **Exhibition curation** — build temporary collections by adding and removing items
- **User accounts** — save and manage your curated exhibitions via the backend

---

## ⚙️ Local Setup

```bash
# Clone the repo
git clone https://github.com/Sultan0013/Virtual-Exhibiton.git
cd Virtual-Exhibiton

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Requirements

- Node.js `v18+`

---

## Data Sources

- [Harvard Art Museums API](https://harvardartmuseums.org/collections/api)
- [Victoria and Albert Museum API](https://www.vam.ac.uk/api)

---

*Built as a group project during the Northcoders Digital Skills Bootcamp in Software Engineering.*
