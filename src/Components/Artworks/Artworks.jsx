import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Masonry from "react-masonry-css"; // ✅ Import Masonry
import { motion } from "framer-motion";
import { getAllArtworks } from "../../APIs/api";
import ArtCard from "./ArtCard/ArtCard";
import ClassificationDropdown from "./Filter/Classifications";
import TechniqueDropdown from "./Filter/Techniuqe"
import SortsDropdown from "./Filter/Sort";
import SortOrderDropdown from "./Filter/SortOrder";
import SearchBar from "../SearchBar/Searchbar";
import "./Artworks.css";

const Artworks = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [classification, setClassification] = useState("");
  const [technique, setTechnique] = useState("");
  const [sortOpt, setSortOpt] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError(null);

    getAllArtworks(query, page, classification, technique, sortOpt, sortOrder)
      .then((data) => setArtworks(data))
      .catch(() => setError("Failed to fetch artworks"))
      .finally(() => setLoading(false));
  }, [query, page, classification, technique, sortOpt, sortOrder]);

  // ✅ Define Masonry Breakpoints
  const masonryBreakpoints = {
    default: 4,  // Desktop (4 columns)
    1024: 3,     // Tablet (3 columns)
    768: 2,      // Small Tablet (2 columns)
    480: 1       // Mobile (1 column)
  };

  return (
    <div className="artworks-container">
      {/* Page Title */}
      <motion.h2 
        className="artworks-title"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Showing results for: "{query}"
      </motion.h2>

      {/* Search Bar */}
      <SearchBar />

      {/* Filters */}
      <motion.div 
        className="filters-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ClassificationDropdown onSelect={setClassification} />
        <TechniqueDropdown onSelect={setTechnique} />
        <SortsDropdown onSelect={setSortOpt} />
        <SortOrderDropdown onSelect={setSortOrder} />
      </motion.div>

      {/* Loading & Error States */}
      {loading && <div className="skeleton-loader"></div>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && artworks.length === 0 && (
        <p className="no-art">No artworks found. Try a different search.</p>
      )}

      {/* ✅ Masonry Layout for Artworks */}
      <Masonry breakpointCols={masonryBreakpoints} className="masonry-grid" columnClassName="masonry-column">
        {artworks.map((art, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <ArtCard art={art} />
          </motion.div>
        ))}
      </Masonry>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1} aria-label="Previous Page">
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)} disabled={artworks.length === 0} aria-label="Next Page">
          Next
        </button>
      </div>
    </div>
  );
};

export default Artworks;
