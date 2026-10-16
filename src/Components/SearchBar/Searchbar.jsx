import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Searchbar.css";

const SearchBar = React.memo(function SearchBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(new URLSearchParams(location.search).get("q") || "");
  }, [location.search]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const term = query.trim();
    if (term) navigate("/artworks?q=" + encodeURIComponent(term));
  };

  return (
    <motion.form
      className="search-bar-container"
      onSubmit={handleSubmit}
      role="search"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.input
        type="search"
        className="search-input"
        placeholder="Search art, artists or materials..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Search for artworks"
        whileFocus={{ boxShadow: "0px 0px 0px 3px rgba(125,47,31,0.22)" }}
      />
      <motion.button className="search-button" type="submit" aria-label="Search" disabled={!query.trim()}>
        Search
      </motion.button>
    </motion.form>
  );
});

export default SearchBar;
