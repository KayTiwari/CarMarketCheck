import React, { useState } from "react";

const EMPTY = {
  make: "",
  model: "",
  yearMin: "",
  yearMax: "",
  maxPrice: "",
  maxMiles: "",
  radius: "100",
};

export default function SearchBar({ onSearch, loading }) {
  const [filters, setFilters] = useState(EMPTY);

  const update = (e) =>
    setFilters((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const reset = () => {
    setFilters(EMPTY);
    onSearch(EMPTY);
  };

  return (
    <form className="searchbar" onSubmit={submit}>
      <div className="field">
        <label htmlFor="make">Make</label>
        <input id="make" name="make" value={filters.make} onChange={update} placeholder="Toyota" />
      </div>
      <div className="field">
        <label htmlFor="model">Model</label>
        <input id="model" name="model" value={filters.model} onChange={update} placeholder="Camry" />
      </div>
      <div className="field field-sm">
        <label htmlFor="yearMin">Year from</label>
        <input id="yearMin" name="yearMin" value={filters.yearMin} onChange={update} placeholder="2016" inputMode="numeric" />
      </div>
      <div className="field field-sm">
        <label htmlFor="yearMax">Year to</label>
        <input id="yearMax" name="yearMax" value={filters.yearMax} onChange={update} placeholder="2022" inputMode="numeric" />
      </div>
      <div className="field field-sm">
        <label htmlFor="maxPrice">Max price</label>
        <input id="maxPrice" name="maxPrice" value={filters.maxPrice} onChange={update} placeholder="25000" inputMode="numeric" />
      </div>
      <div className="field field-sm">
        <label htmlFor="maxMiles">Max miles</label>
        <input id="maxMiles" name="maxMiles" value={filters.maxMiles} onChange={update} placeholder="80000" inputMode="numeric" />
      </div>
      <div className="field field-sm">
        <label htmlFor="radius">Radius</label>
        <select id="radius" name="radius" value={filters.radius} onChange={update}>
          <option value="25">25 mi</option>
          <option value="50">50 mi</option>
          <option value="100">100 mi</option>
          <option value="250">250 mi</option>
          <option value="500">500 mi</option>
        </select>
      </div>
      <div className="search-actions">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Searching..." : "Find deals near me"}
        </button>
        <button type="button" className="btn-ghost" onClick={reset} disabled={loading}>
          Reset
        </button>
      </div>
    </form>
  );
}
