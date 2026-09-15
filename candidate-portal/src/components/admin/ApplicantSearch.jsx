function ApplicantSearch({ search, setSearch }) {
  return (
    <div className="applicant-search">
      <input
        type="text"
        placeholder="Search by applicant name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default ApplicantSearch;