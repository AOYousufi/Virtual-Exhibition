import { useState } from "react";

const techniques = [
  { id: { harvardId: 116, vnaID: "AAT53241" }, name: "Etching" },
  { id: { harvardId: 194, vnaID: "AAT53296" }, name: "Woodcut" },
  { id: { harvardId: 136, vnaID: "AAT53271" }, name: "Lithography" },
  { id: { harvardId: 525, vnaID: "AAT53303" }, name: "Wood Engraving" },
  { id: { harvardId: 123, vnaID: "AAT54225" }, name: "Photography (Gelatin Silver Print)" },
  { id: { harvardId: 98, vnaID: "AAT53225" }, name: "Engraving" },
  { id: { harvardId: 2125, vnaID: "AAT54216" }, name: "Painting (Painted)" },
];

const TechniqueDropdown = ({ onSelect }) => {
  const [selectedTechnique, setSelectedTechnique] = useState("");

  const handleChange = (event) => {
    const selectedId = event.target.value;
    const selectedTech = techniques.find(tech => JSON.stringify(tech.id) === selectedId);
    setSelectedTechnique(selectedId);
    onSelect(selectedTech ? selectedTech.id : null);
  };

  return (
    <div>
      <label>Select Technique:</label>
      <select value={selectedTechnique} onChange={handleChange}>
        <option value="">All</option>
        {techniques.map((tech) => (
          <option key={JSON.stringify(tech.id)} value={JSON.stringify(tech.id)}>
            {tech.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TechniqueDropdown;
