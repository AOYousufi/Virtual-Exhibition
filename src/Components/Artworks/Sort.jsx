import { useState } from "react";

const sortList = [
  { apiNama: { vna: "date", harvard: "century" }, name: "Date" },
  { apiNama: { vna: "location", harvard: "department" }, name: "Location" },
  { apiNama: { vna: "place", harvard: "period" }, name: "Place" },
];

const SortsDropdown = ({ onSelect }) => {
  const [selectedSortOpt, setSelectedSortOpt] = useState("");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    // Find the matching sort option by comparing JSON stringified apiNama objects
    const selectedSort = sortList.find(
      (sortOpt) => JSON.stringify(sortOpt.apiNama) === selectedValue
    );
    setSelectedSortOpt(selectedValue);
    onSelect(selectedSort ? selectedSort.apiNama : null);
  };

  return (
    <div>
      <label>Select sort:</label>
      <select value={selectedSortOpt} onChange={handleChange}>
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
