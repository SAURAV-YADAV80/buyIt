function SearchBar({ handleChange, query }) {
  return (
    <input
      className="border-2 border-gray-200 rounded-md px-2 shrink"
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search..."
    />
  );
}

export default SearchBar;