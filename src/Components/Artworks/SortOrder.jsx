import { useState } from "react";

const SortOrderDropdown = ({ onSelect }) => {
  const [selectedSortOrder, setSelectedSortOrder] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedSortOrder(value);
    onSelect(value); 
  };

  return (
    <div>
      <label>Select sort order:</label>
      <select value={selectedSortOrder} onChange={handleChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SortOrderDropdown;
