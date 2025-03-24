import { useState, useEffect } from 'react';

const COLORS = ['yellow', 'blue', 'green', 'pink'];

function VersePanel({ reference, onClose }) {
  const [note, setNote] = useState('');
  const [highlight, setHighlight] = useState(false);
  const [color, setColor] = useState('yellow');
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (reference) {
      const saved = JSON.parse(localStorage.getItem('bibleNotes') || '{}')[reference];
      if (saved) {
        setNote(saved.note || '');
        setHighlight(!!saved.highlight);
        setColor(saved.color || 'yellow');
        setBookmarked(!!saved.bookmarked);
      }
    }
  }, [reference]);

  const save = () => {
    const all = JSON.parse(localStorage.getItem('bibleNotes') || '{}');
    all[reference] = { note, highlight, color, bookmarked };
    localStorage.setItem('bibleNotes', JSON.stringify(all));
    onClose();
  };

  if (!reference) return null;

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-800 shadow-lg z-50 p-4">
      <h2 className="text-lg font-bold mb-4">{reference}</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={6}
        placeholder="Add your notes here..."
        className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
      />
      <div className="mt-4 flex flex-col gap-2">
        <label className="font-medium">Highlight Color:</label>
        <div className="flex gap-2 mb-2">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                setHighlight(true);
              }}
              className={
                "w-6 h-6 rounded-full border-2 " +
                (color === c ? "border-black dark:border-white" : "border-transparent")
              }
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={highlight} onChange={() => setHighlight(!highlight)} />
          Highlight this verse
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={bookmarked} onChange={() => setBookmarked(!bookmarked)} />
          Bookmark this verse
        </label>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <button onClick={onClose} className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">Cancel</button>
        <button onClick={save} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
      </div>
    </div>
  );
}

export default VersePanel;
