import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Searchbar.css";

const SearchBar = React.memo(() => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    if (query.trim() !== "") {
      navigate(`/artworks?q=${encodeURIComponent(query)}`);
    }
  }, [query, navigate]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <motion.div
      className="search-bar-container"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.input
        type="text"
        className="search-input"
        placeholder="Enter artwork name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Search for artworks"
        whileFocus={{
          scale: 1.02,
          boxShadow: "0px 0px 10px rgba(255,126,95,0.7)",
        }}
      />
      <motion.button
        className="search-button"
        onClick={handleSearch}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Search"
      >
        Search
      </motion.button>
    </motion.div>
  );
});

export default SearchBar;
