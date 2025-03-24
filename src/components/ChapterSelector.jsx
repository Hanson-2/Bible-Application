function ChapterSelector({ chapters, selectedChapter, setSelectedChapter }) {
  return (
    <div className="mb-0">
      <label className="mr-2 font-medium">Chapter:</label>
      <select
        value={selectedChapter}
        onChange={(e) => setSelectedChapter(e.target.value)}
        className="p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
      >
        {chapters.map((chapter) => (
          <option key={chapter} value={chapter}>{chapter}</option>
        ))}
      </select>
    </div>
  );
}

export default ChapterSelector;
