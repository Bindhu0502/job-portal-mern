import { Search, MapPin } from "lucide-react";

function JobSearch({
  keyword,
  setKeyword,
  location,
  setLocation,
  onSearch,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

      <div className="grid md:grid-cols-3 gap-4">

        {/* Keyword */}

        <div className="relative">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Job title, company, skills..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        {/* Location */}

        <div className="relative">

          <MapPin
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        {/* Search Button */}

        <button
          onClick={onSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-semibold transition"
        >
          Search Jobs
        </button>

      </div>

    </div>
  );
}

export default JobSearch;