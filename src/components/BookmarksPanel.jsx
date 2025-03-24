import React from 'react';

function BookmarksPanel({ bookmarks = [], onNavigate, onClose }) {
  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-800 shadow-lg z-50 overflow-y-auto border-l border-gray-300 dark:border-gray-700">
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-600">
        <h2 className="text-lg font-semibold">Bookmarked Verses</h2>
        <button
          className="text-sm px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <ul className="p-4 space-y-2">
        {bookmarks.length === 0 && (
          <li className="text-gray-500 dark:text-gray-400">No bookmarks yet.</li>
        )}
        {bookmarks.map((ref, idx) => {
          const [book, chapter, verse] = ref.split('-');
          return (
            <li
              key={idx}
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => onNavigate(`${book}-${chapter}`)}
            >
              {book} {chapter}:{verse}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BookmarksPanel;
