import React, { useState } from "react";
import "./Sort.css";

const sortList = [
  { apiNama: { vna: "date", harvard: "century" }, name: "Date" },
  { apiNama: { vna: "location", harvard: "department" }, name: "Location" },
  { apiNama: { vna: "place", harvard: "period" }, name: "Place" },
];

const SortsDropdown = ({ onSelect }) => {
  const [selectedSortOpt, setSelectedSortOpt] = useState("");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedSort = sortList.find(
      (sortOpt) => JSON.stringify(sortOpt.apiNama) === selectedValue
    );
    setSelectedSortOpt(selectedValue);
    onSelect(selectedSort ? selectedSort.apiNama : null);
  };

  return (
    <div className="dropdown-container">
      <label className="dropdown-label" htmlFor="sorts-select">
        Select Sort:
      </label>
      <select
        id="sorts-select"
        className="dropdown-select"
        value={selectedSortOpt}
        onChange={handleChange}
      >
        <option value="">All</option>
        {sortList.map((sortOpt) => (
          <option
            key={JSON.stringify(sortOpt.apiNama)}
            value={JSON.stringify(sortOpt.apiNama)}
          >
            {sortOpt.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortsDropdown;
