import React, { useState } from "react";
import { MagnifyingGlassIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch && query.trim() !== "") {
      onSearch(query);
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search or enter URL"
        value={query}
        onChange={handleInputChange}
        className="w-full pl-10 pr-10 py-1.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
      />
      <MagnifyingGlassIcon
        className="absolute left-3 top-1/2 h-5 w-5 text-gray-400 transform -translate-y-1/2"
      />
      {query.trim() !== "" && (
        <button
          onClick={handleSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700"
        >
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
