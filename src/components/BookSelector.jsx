function BookSelector({ books, selectedBook, setSelectedBook }) {
  return (
    <div className="mb-0">
      <label className="mr-2 font-medium">Book:</label>
      <select
        value={selectedBook}
        onChange={(e) => setSelectedBook(e.target.value)}
        className="p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
      >
        {books.map((book) => (
          <option key={book} value={book}>{book}</option>
        ))}
      </select>
    </div>
  );
}

export default BookSelector;
