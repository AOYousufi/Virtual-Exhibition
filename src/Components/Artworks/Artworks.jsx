import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Masonry from "react-masonry-css";
import { motion, useReducedMotion } from "framer-motion";
import { getAllArtworks } from "../../APIs/api";
import ArtCard from "./ArtCard/ArtCard";
import ClassificationDropdown from "./Filter/Classifications";
import TechniqueDropdown from "./Filter/Techniuqe";
import SortsDropdown from "./Filter/Sort";
import SortOrderDropdown from "./Filter/SortOrder";
import SearchBar from "../SearchBar/Searchbar";
import ErrorNotification from "../User Experiance/Error";
import NoResultsFound from "../User Experiance/NoResultFound";
import "./Artworks.css";
import Skeleton from "@mui/material/Skeleton";

const Artworks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const page = Math.max(Number.parseInt(searchParams.get("page") || "1", 10), 1);

  const [artworks, setArtworks] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [classification, setClassification] = useState("");
  const [technique, setTechnique] = useState("");
  const [sortOpt, setSortOpt] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const shouldReduceMotion = useReducedMotion();

  const changePage = (nextPage) => {
    const nextParams = new URLSearchParams(searchParams);
    if (nextPage <= 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(nextPage));
    }
    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
  };

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError(null);

    setArtworks([]);
    console.log("Fetching artworks with:", {
      query,
      page,
      classification,
      technique,
      sortOpt,
      sortOrder,
    });
    getAllArtworks(query, page, classification, technique, sortOpt, sortOrder)
      .then((data) => {
        console.log("Fetched artworks:", data);
        setArtworks(data.artworks);
        setHasNextPage(data.hasNextPage);
      })
      .catch((err) => {
        setArtworks([]);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [query, page, classification, technique, sortOpt, sortOrder]);

  const masonryBreakpoints = {
    default: 4,
    1024: 3,
    768: 2,
    480: 1,
  };

  return (
    <div className="artworks-container">
      {query && (
        <motion.div
          className="results-header"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? {} : { duration: 0.5 }}
        >
          <h2 className="results-text">Showing results for: "{query}"</h2>
        </motion.div>
      )}
      <SearchBar />
      <motion.div
        className="filters-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={shouldReduceMotion ? {} : { duration: 0.5 }}
      >
        <ClassificationDropdown onSelect={setClassification} />
        <TechniqueDropdown onSelect={setTechnique} />
        <SortsDropdown onSelect={setSortOpt} />
        <SortOrderDropdown onSelect={setSortOrder} />
      </motion.div>
      {loading && (
        <Masonry
          breakpointCols={masonryBreakpoints}
          className="masonry-grid"
          columnClassName="masonry-column"
        >
          {Array.from(new Array(8)).map((_, index) => (
            <motion.div key={index}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                animation="wave"
              />
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" width="60%" animation="wave" />
            </motion.div>
          ))}
        </Masonry>
      )}
      {error && <ErrorNotification error={error} />}
      {!loading && !error && artworks.length === 0 && <NoResultsFound />}

      <Masonry
        breakpointCols={masonryBreakpoints}
        className="masonry-grid"
        columnClassName="masonry-column"
      >
        {artworks?.map((art, index) => (
          <motion.div key={art.id || art.systemNumber || index}>
            <ArtCard art={art} />
          </motion.div>
        ))}
      </Masonry>
      <div className="pagination">
        <button
          onClick={() => changePage(Math.max(page - 1, 1))}
          disabled={page === 1}
          aria-label="Previous Page"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => changePage(page + 1)}
          disabled={!hasNextPage}
          aria-label="Next Page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Artworks;
