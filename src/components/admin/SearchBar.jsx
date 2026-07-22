import { FaSearch } from "react-icons/fa";

function SearchBar({ search, setSearch }) {
  return (
    <div className="search-wrapper">
      <FaSearch className="search-icon" />

      <input
        type="text"
        className="search-input"
        placeholder="Search by title, company or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;