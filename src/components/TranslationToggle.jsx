function TranslationToggle({ translation, setTranslation }) {
  return (
    <div className="my-4">
      <label className="mr-2 font-medium">Select Translation:</label>
      <select
        value={translation}
        onChange={e => setTranslation(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="exb">EXB</option>
        <option value="kjv">KJV</option>
      </select>
    </div>
  );
}

export default TranslationToggle;
