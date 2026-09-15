function SearchBar() {
  return (
    <div className="bg-white dark:bg-slate-900 shadow-lg rounded-2xl p-5">

      <div className="grid lg:grid-cols-3 gap-4">

        <input
          type="text"
          placeholder="Job title or keyword"
          className="input-ui"
        />

        <input
          type="text"
          placeholder="Location"
          className="input-ui"
        />

        <button className="btn-primary">

          Search Jobs

        </button>

      </div>

    </div>
  );
}

export default SearchBar;