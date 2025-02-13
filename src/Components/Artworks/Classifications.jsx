import { useState } from "react";

const classifications = [
  { id: { harvardId: 26, vnaID: "THES48917" }, name: "Paintings" },
  { id: { harvardId: 21, vnaID: "THES48966" }, name: "Drawings" },
  { id: { harvardId: 23, vnaID: "THES48903" }, name: "Prints" },
  { id: { harvardId: 30, vnaID: "THES48920" }, name: "Sculpture" },
  { id: { harvardId: 17, vnaID: "THES48910" }, name: "Photographs" },
  { id: { harvardId: 62, vnaID: "THES48885" }, name: "Textile Arts" },
  { id: { harvardId: 19, vnaID: "THES49044" }, name: "Jewelry" },
  { id: { harvardId: 185, vnaID: "THES252988" }, name: "Manuscripts" },
];

const ClassificationDropdown = ({ onSelect }) => {
  const [selectedClassification, setSelectedClassification] = useState("");

  const handleChange = (event) => {
    const selectedId = event.target.value;
    const selectedClass = classifications.find(cls => JSON.stringify(cls.id) === selectedId);
    setSelectedClassification(selectedId);
    onSelect(selectedClass ? selectedClass.id : null); 
  };

  return (
    <div>
      <label>Select Classification:</label>
      <select value={selectedClassification} onChange={handleChange}>
        <option value="">All</option>
        {classifications.map((cls) => (
          <option key={JSON.stringify(cls.id)} value={JSON.stringify(cls.id)}>
            {cls.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClassificationDropdown;
