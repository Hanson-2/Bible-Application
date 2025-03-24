import { useState, useEffect } from 'react';

function NotesManager({ onNavigate }) {
  const [notesData, setNotesData] = useState({});
  const [search, setSearch] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bibleNotes') || '{}');
    const notesOnly = Object.entries(saved)
      .filter(([_, val]) => val.note && val.note.trim().length > 0)
      .reduce((acc, [key, val]) => {
        acc[key] = val;
        return acc;
      }, {});
    setNotesData(notesOnly);
  }, []);

  const handleNavigate = (ref) => {
    if (onNavigate) {
      onNavigate(ref);
    }
  };

  const handleDelete = (ref) => {
    const all = JSON.parse(localStorage.getItem('bibleNotes') || '{}');
    delete all[ref];
    localStorage.setItem('bibleNotes', JSON.stringify(all));
    setNotesData(prev => {
      const updated = { ...prev };
      delete updated[ref];
      return updated;
    });
  };

  const filtered = Object.entries(notesData).filter(([ref, val]) =>
    ref.toLowerCase().includes(search.toLowerCase()) ||
    val.note.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-900 overflow-auto z-50 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Notes</h2>
        <button onClick={() => onNavigate(null)} className="text-sm border px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">Close</button>
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search notes..."
        className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
      />
      <div className="space-y-4">
        {filtered.map(([ref, { note }]) => (
          <div key={ref} className="border border-gray-300 dark:border-gray-600 p-4 rounded shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{ref}</h3>
              <div className="flex gap-2">
                <button onClick={() => handleNavigate(ref)} className="text-blue-600 hover:underline text-sm">Go</button>
                <button onClick={() => handleDelete(ref)} className="text-red-600 hover:underline text-sm">Delete</button>
              </div>
            </div>
            <p>{note}</p>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-gray-500">No notes found.</p>}
      </div>
    </div>
  );
}

export default NotesManager;
