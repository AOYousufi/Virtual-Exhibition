import { useState } from "react";
import "./SortOrder.css";

const SortOrderDropdown = ({ onSelect }) => {

  const [selectedSortOrder, setSelectedSortOrder] = useState("asc");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedSortOrder(value);
    onSelect(value);
  };

  return (
    <div className="dropdown-container">
      <label className="dropdown-label" htmlFor="sortorder-select">
        Select Sort Order:
      </label>
      <select
        id="sortorder-select"
        className="dropdown-select"
        value={selectedSortOrder}
        onChange={handleChange}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SortOrderDropdown;
