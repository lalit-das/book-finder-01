# Book Finder — React + Open Library

This repo contains a clean, responsive, student-oriented Book Finder React app (JSX components), ready to run on CodeSandbox, Vite, or any React setup. It integrates the Open Library Search API for book discovery.

---

## 📖 Features
- Search by **title, author, subject, or ISBN**.
- Displays **cover image, title, author(s), publication year, and subjects**.
- Links directly to Open Library entries.
- Responsive, mobile-first UI styled with **Tailwind CSS**.
- Uses React's built-in **useState/useEffect** for state management.
- Easy deployment and sharing via **CodeSandbox**, **Vercel**, or **Netlify**.

---

## 🚀 How to Run

### Option 1 — CodeSandbox (quickest)
1. Open [CodeSandbox](https://codesandbox.io/s/).
2. Create a new React (Vite) sandbox.
3. Copy the files from this repo into the sandbox.
4. The app runs instantly; share the sandbox link.

### Option 2 — Run Locally
```bash
# Create new Vite + React project
npm create vite@latest book-finder -- --template react
cd book-finder

# Replace files with repo files

# Install dependencies
npm install

# Start dev server
npm run dev
```
Visit the URL shown in the terminal (usually http://localhost:5173).

---

## 🛠 Deployment
- **CodeSandbox**: easiest way to share a live version.
- **Vercel/Netlify**: connect repo and deploy directly.

---

## ✅ Testing Checklist
- Search **title** → e.g. `To Kill a Mockingbird`.
- Search **author** → e.g. `Tolkien`.
- Search **subject** → e.g. `mathematics`.
- Search **ISBN** → e.g. `9780140328721`.
- Click cover/title → opens Open Library record.

---

## 📂 Notes File

### Development Notes
- **Framework**: React (functional components + hooks).
- **Styling**: Tailwind CSS (via CDN for prototyping).
- **API**: [Open Library Search API](https://openlibrary.org/dev/docs/api/search) — no authentication required.
- **Covers**: Fetched from `https://covers.openlibrary.org/` using `cover_i` or ISBN.
- **State management**: React `useState`/`useEffect`.

### Implementation Details
- **SearchBar.jsx** → handles input, search field selection, and submits queries.
- **BookCard.jsx** → displays individual book details (cover, author, year, subjects, links).
- **App.jsx** → main logic: fetches data, handles search, pagination, and state.
- **styles.css** → minimal, Tailwind provides most styling.

### Future Improvements
- Add **infinite scroll** instead of Load More button.
- Improve **error handling** (e.g., empty queries, rate limits).
- Save **recent searches** in local storage for convenience.
- Add **dark mode** toggle for better UX.

---

## 📜 License
Free to use for educational and demo purposes.
