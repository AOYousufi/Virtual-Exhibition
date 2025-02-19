import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllArtworks } from "../../APIs/api";
import ArtCard from "./ArtCard/ArtCard";
import ClassificationDropdown from "./Filter/Classifications"; 
import TechniqueDropdown from "./Filter/Techniuqe";
import SortsDropdown from "./Filter/Sort";
import SortOrderDropdown from "./Filter/SortOrder";
import "./Artworks.css"
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
    <div className="artworks-container">
      <h2 className="artworks-title">Showing results for: "{query}"</h2>
      
      <div className="filters-container">
        <ClassificationDropdown onSelect={setClassification} />
        <TechniqueDropdown onSelect={setTechnique} />
        <SortsDropdown onSelect={setSortOpt} />
        <SortOrderDropdown onSelect={setSortOrder} />
      </div>
      
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
  
      <div className="artworks-grid">
        {artworks.map((art, index) => (
          <ArtCard key={index} art={art} />
        ))}
      </div>
  
      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Artworks;
