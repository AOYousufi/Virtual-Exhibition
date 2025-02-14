import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllArtworks } from "../../api";
import ArtCard from "../Artworks/ArtCard";
import ClassificationDropdown from "./Classifications"; 
import TechniqueDropdown from "./Filter/Techniuqe";
import SortsDropdown from "./Sort";
import SortOrderDropdown from "./SortOrder";

const Artworks = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [classification, setClassification] = useState(""); 
const [technique , setTechnique] = useState("")
const [sortOpt , setSortOpt] = useState('')
const [sortOrder, setSortOrder] = useState("asc")
console.log(technique);
  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError(null);

    getAllArtworks(query, page,classification , technique , sortOpt, sortOrder)
      .then((data) => setArtworks(data))
      .catch((err) => {console.log(err);
        setError("Failed to fetch artworks")})
      .finally(() => setLoading(false));
  }, [query, page , classification , technique , sortOpt , sortOrder]); 
  console.log(classification);
  console.log(sortOpt, "sortopt");
  return (
    <div style={{ padding: "20px" }}>
      <h2>Showing results for: "{query}"</h2>

   
      <ClassificationDropdown onSelect={setClassification} />
        <TechniqueDropdown onSelect={setTechnique}/>
        <SortsDropdown onSelect={setSortOpt}/>
        <SortOrderDropdown onSelect={setSortOrder}/>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
        {artworks.map((art, index) => (
          <ArtCard key={index} art={art} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          style={{ marginRight: "10px", padding: "10px", cursor: "pointer" }}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          style={{ marginLeft: "10px", padding: "10px", cursor: "pointer" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Artworks;
