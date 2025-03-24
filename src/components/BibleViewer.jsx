import { useEffect, useState } from 'react';
import VersePanel from './VersePanel';
import { applyHighlights } from './highlightUtils';

function BibleViewer({ book, chapter }) {
  const [verses, setVerses] = useState({});
  const [openReference, setOpenReference] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (!book || !chapter) return;

    fetch(`/translations/kjv/${book}.json`)
      .then((res) => res.json())
      .then((data) => {
        const chapterData = data[chapter] || {};
        setVerses(chapterData);
      });

    const saved = JSON.parse(localStorage.getItem('bibleNotes') || '{}');
    setUserData(saved);
  }, [book, chapter]);

  const handleVerseClick = (verseNum) => {
    setOpenReference(`${book}-${chapter}-${verseNum}`);
  };

  const closePanel = () => {
    setOpenReference(null);
    const saved = JSON.parse(localStorage.getItem('bibleNotes') || '{}');
    setUserData(saved);
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-center">{book} {chapter}</h2>
      <div className="space-y-4 leading-relaxed text-lg font-serif">
        {Object.entries(verses).map(([verseNum, text]) => {
          const key = `${book}-${chapter}-${verseNum}`;
          const { highlight, color, bookmarked, ranges = [] } = userData[key] || {};
          const parts = applyHighlights(text, ranges);

          const classList = [
            'rounded px-2 py-1 transition cursor-pointer',
            'hover:bg-yellow-100 hover:text-black',
            'dark:hover:bg-yellow-300 dark:hover:text-black',
            highlight ? 'bg-yellow-200 dark:bg-yellow-400 text-black' : '',
            bookmarked ? 'border-l-4 border-blue-400 pl-2' : ''
          ].join(' ');

          return (
            <p
              key={verseNum}
              onClick={() => handleVerseClick(verseNum)}
              className={classList}
              title="Click to open notes"
            >
              <span className="text-gray-500 font-medium mr-2">{verseNum}</span>
              {parts.map((part, idx) =>
                part.highlight ? (
                  <span key={idx} style={{ backgroundColor: part.highlight }}>{part.text}</span>
                ) : (
                  <span key={idx}>{part.text}</span>
                )
              )}
            </p>
          );
        })}
      </div>
      <VersePanel reference={openReference} onClose={closePanel} />
    </section>
  );
}

export default BibleViewer;
