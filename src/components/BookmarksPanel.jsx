import { useEffect, useState } from 'react';

function BookmarksPanel({ onNavigate, onClose }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bibleNotes') || '{}');
    const filtered = Object.entries(saved)
      .filter(([_, data]) => data.bookmarked)
      .map(([key, data]) => ({
        reference: key,
        note: data.note || '',
      }));
    setBookmarks(filtered);
  }, []);

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white dark:bg-gray-800 shadow-lg z-50 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Bookmarks</h2>
        <button
          onClick={onClose}
          className="px-2 py-1 text-sm border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Close
        </button>
      </div>
      {bookmarks.length === 0 ? (
        <p className="text-gray-500">No bookmarks saved yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookmarks.map(({ reference, note }) => (
            <li
              key={reference}
              className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-700 p-2 rounded"
              onClick={() => onNavigate(reference)}
              title={note}
            >
              <div className="font-semibold">{reference}</div>
              {note && <div className="text-sm text-gray-500 dark:text-gray-300">{note}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookmarksPanel;
