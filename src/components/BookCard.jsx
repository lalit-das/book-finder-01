import React from 'react'


export default function BookCard({ cover, title, authors = [], year, subjects = [], openLibraryKey, editionKey }) {
// link to Open Library work or edition
const olUrl = openLibraryKey ? `https://openlibrary.org${openLibraryKey}` : editionKey ? `https://openlibrary.org/books/${editionKey}` : '#'


return (
<article className="flex gap-3 p-3 bg-white rounded-lg shadow-sm">
<div className="w-24 h-32 flex-shrink-0 bg-slate-100 rounded overflow-hidden flex items-center justify-center">
{cover ? (
// eslint-disable-next-line
<img src={cover} alt={`Cover of ${title}`} className="w-full h-full object-cover" />
) : (
<div className="text-xs text-slate-400 p-2 text-center">No cover available</div>
)}
</div>


<div className="flex-1">
<a href={olUrl} target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:underline">{title}</a>
<div className="text-sm text-slate-600">{authors ? authors.join(', ') : 'Unknown author'}</div>
<div className="text-xs text-slate-500 mt-1">First published: {year || '—'}</div>


{subjects && subjects.length > 0 && (
<div className="mt-2 flex flex-wrap gap-2">
{subjects.slice(0, 6).map((s) => (
<span key={s} className="text-xs px-2 py-1 bg-slate-100 rounded-full">{s}</span>
))}
</div>
)}


<div className="mt-3">
<a href={olUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 hover:underline">View on Open Library</a>
</div>
</div>
</article>
)
}