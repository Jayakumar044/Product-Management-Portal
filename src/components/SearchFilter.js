import React, { useState } from "react";
import "../styles/SearchFilter.css";

const SearchFilter = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleChange}
        style={{ width: "50%" }} // Medium width
      />
    </div>
  );
};

export default SearchFilter;