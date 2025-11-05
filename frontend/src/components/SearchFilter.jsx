import React from "react";

const SearchFilter = ({ filters, setFilters }) => {
  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleConditionChange = (e) => {
    setFilters({ ...filters, condition: e.target.value });
  };

  const handleStatusChange = (e) => {
    setFilters({ ...filters, status: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ search: "", condition: "", status: "" });
  };

  return (
    <div className="search-filter">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search items..."
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="filter-group">
        <select value={filters.condition} onChange={handleConditionChange}>
          <option value="">All Conditions</option>
          <option value="New">New</option>
          <option value="Like New">Like New</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>

        <select value={filters.status} onChange={handleStatusChange}>
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="exchanged">Exchanged</option>
        </select>

        <button onClick={clearFilters} className="btn-clear">
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
