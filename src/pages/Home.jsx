import { useState, useEffect } from 'react';
import BookSelector from '../components/BookSelector';
import ChapterSelector from '../components/ChapterSelector';
import BibleViewer from '../components/BibleViewer';

const books = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
  'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
  'Ecclesiastes', "Solomon's Song", 'Isaiah', 'Jeremiah', 'Lamentations',
  'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
  'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
  'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
  'Matthew', 'Mark', 'Luke', 'John', 'Acts',
  'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
  'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
  '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews',
  'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
  'Jude', 'Revelation'
];

function Home() {
  const [selectedBook, setSelectedBook] = useState('Genesis');
  const [selectedChapter, setSelectedChapter] = useState('1');
  const [chapters, setChapters] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetch(`/translations/kjv/${selectedBook}.json`)
      .then(res => res.json())
      .then(data => {
        const chapterKeys = Object.keys(data);
        setChapters(chapterKeys);
        if (!chapterKeys.includes(selectedChapter)) {
          setSelectedChapter(chapterKeys[0]);
        }
      });
  }, [selectedBook]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-sans transition-colors">
      <header className="sticky top-0 bg-white dark:bg-gray-800 shadow z-50 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-extrabold tracking-tight">Bible Study Suite</h1>
        </div>
        <div className="flex items-center gap-4">
          <BookSelector books={books} selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
          <ChapterSelector chapters={chapters} selectedChapter={selectedChapter} setSelectedChapter={setSelectedChapter} />
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="border rounded px-3 py-1 text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-8">
        <BibleViewer book={selectedBook} chapter={selectedChapter} />
      </main>
    </div>
  );
}

export default Home;
