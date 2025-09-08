import React, { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import BookCard from './components/BookCard'

// Helper: build Open Library cover URL from `cover_i` or ISBN
const coverUrl = (cover_i, isbn) => {
  if (cover_i) return `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
  if (isbn && isbn.length > 0) return `https://covers.openlibrary.org/b/isbn/${isbn[0]}-M.jpg`
  return null
}

function App() {
  const [searchState, setSearchState] = useState({ query: 'computer science', field: 'title' })
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [numFound, setNumFound] = useState(0)

  useEffect(() => {
    // initial fetch when component mounts
    fetchBooks(searchState, 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchBooks({ query, field }, pageToFetch = 1) {
    if (!query || query.trim() === '') {
      setBooks([])
      setNumFound(0)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const limit = 20
      const offset = (pageToFetch - 1) * limit
      const url = `https://openlibrary.org/search.json?${field}=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`
      const res = await fetch(url)
      const data = await res.json()

      setBooks(data.docs || [])
      setNumFound(data.numFound || 0)
      setPage(pageToFetch)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch books. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleSearch({ query, field }) {
    setSearchState({ query, field })
    fetchBooks({ query, field }, 1)
  }

  function handleLoadMore() {
    fetchBooks(searchState, page + 1)
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold mb-1">Book Finder</h1>
        <p className="text-slate-600 mb-4">
          Search books quickly by title, author, subject, or ISBN — made for students like Alex.
        </p>
      </header>

      <main className="max-w-4xl mx-auto">
        <SearchBar
          onSearch={handleSearch}
          initialField={searchState.field}
          initialQuery={searchState.query}
        />

        <section className="mt-6">
          {loading && <div className="text-center py-8">Loading results...</div>}
          {error && <div className="text-red-600 py-4">{error}</div>}

          {!loading && !error && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-slate-600">
                  {numFound.toLocaleString()} results
                </div>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {books.length === 0 && (
                  <li className="py-8 text-center text-slate-500">
                    No results — try a different query.
                  </li>
                )}
                {books.map((b) => (
                  <li key={b.key}>
                    <BookCard
                      cover={coverUrl(b.cover_i, b.isbn)}
                      title={b.title}
                      authors={b.author_name}
                      year={b.first_publish_year}
                      subjects={b.subject}
                      openLibraryKey={b.key}
                      editionKey={b.edition_key && b.edition_key[0]}
                    />
                  </li>
                ))}
              </ul>

              {books.length > 0 && page * 20 < numFound && (
                <div className="text-center mt-6">
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    onClick={handleLoadMore}
                  >
                    Load more
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        <footer className="mt-12 text-center text-sm text-slate-500">
          Data from Open Library — no authentication required.
        </footer>
      </main>
    </div>
  )
}

export default App
