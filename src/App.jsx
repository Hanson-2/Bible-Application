
import { useState, useEffect } from 'react';
import BibleViewer from './components/BibleViewer';
import NotesManager from './components/NotesManager';
import BookmarksPanel from './components/BookmarksPanel';

function App() {
  const [book, setBook] = useState('Genesis');
  const [chapter, setChapter] = useState('1');
  const [showNotes, setShowNotes] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bibleBookmarks')) || [];
    setBookmarks(savedBookmarks);
  }, []);

  const addBookmark = (reference) => {
    if (!bookmarks.includes(reference)) {
      const updated = [...bookmarks, reference];
      setBookmarks(updated);
      localStorage.setItem('bibleBookmarks', JSON.stringify(updated));
    }
  };

  const handleNavigate = (ref) => {
    if (!ref) {
      setShowNotes(false);
      setShowBookmarks(false);
      return;
    }
    const [b, c] = ref.split('-');
    setBook(b);
    setChapter(c);
    setShowNotes(false);
    setShowBookmarks(false);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
            <h1 className="text-xl font-bold">Bible Study Suite</h1>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
              <span>Book:</span>
              <select
                value={book}
                onChange={(e) => setBook(e.target.value)}
                className="p-1 rounded dark:bg-gray-700"
              >
                <option value="Genesis">Genesis</option>
                <option value="Exodus">Exodus</option>
                <option value="Revelation">Revelation</option>
              </select>
            </label>
            <label className="flex items-center gap-1">
              <span>Chapter:</span>
              <input
                type="number"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="p-1 w-16 rounded dark:bg-gray-700"
              />
            </label>
            <button
              onClick={() => setShowNotes(true)}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Notes
            </button>
            <button
              onClick={() => setShowBookmarks(true)}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Bookmarks
            </button>
            <button
              onClick={() => setDarkMode((d) => !d)}
              className="px-3 py-1 border rounded dark:border-white"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </header>

        <main className="p-6 max-w-5xl mx-auto">
          <BibleViewer book={book} chapter={chapter} addBookmark={addBookmark} />
        </main>

        {showNotes && <NotesManager onNavigate={handleNavigate} />}
        {showBookmarks && <BookmarksPanel bookmarks={bookmarks} onNavigate={handleNavigate} onClose={() => setShowBookmarks(false)} />}
      </div>
    </div>
  );
}

export default App;