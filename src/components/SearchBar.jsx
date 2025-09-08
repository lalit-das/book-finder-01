import React, { useState } from 'react';

export default function SearchBar({
  onSearch,
  initialField = 'title',
  initialQuery = '',
}) {
  // local form state so the user can edit before submitting
  const [query, setQuery] = useState(initialQuery);
  const [field, setField] = useState(initialField);

  function submit(e) {
    e.preventDefault();
    if (!query || query.trim() === '') return;
    onSearch({ query: query.trim(), field });
  }

  return (
    <form
      className="bg-white p-4 rounded-lg shadow-sm"
      onSubmit={submit}
      aria-label="Book search form"
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          aria-label="Search query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Search by title, author, subject or ISBN (e.g., 'Tolkien' or '9780140328721')"
        />

        <select
          aria-label="Search field"
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="w-40 px-3 py-2 border rounded-md"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="subject">Subject</option>
          <option value="isbn">ISBN</option>
        </select>

        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Search
        </button>
      </div>

      <div className="mt-2 text-xs text-slate-500">
        Tip: try searching for an author or paste an ISBN for exact matches.
      </div>
    </form>
  );
}
