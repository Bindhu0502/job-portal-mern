function CompanySearch({ search, setSearch }) {
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search companies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default CompanySearch;