import { useState } from "react";
import { useCollections } from "../../Context/CollectionContext";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import ArtCard from "../../Artworks/ArtCard/ArtCard";
import "./ExhibitionView.css";

const ExhibitionView = () => {
  const { collections, removeItemFromCollection } = useCollections();
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState("added");
  const collection = collections.find((col) => col.id === id);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  if (!collection)
    return <p className="exhibition-error">Collection not found.</p>;

  const searchTerm = search.trim().toLowerCase();
  const visibleItems = collection.items
    .filter((item) => String(item.title || item._primaryTitle || "").toLowerCase().includes(searchTerm))
    .slice();
  if (sortMode !== "added") {
    visibleItems.sort((a, b) =>
      String(a.title || a._primaryTitle || "").localeCompare(String(b.title || b._primaryTitle || "")) *
      (sortMode === "az" ? 1 : -1)
    );
  }

  const handleRemove = (itemId, itemTitle) => {
    removeItemFromCollection(collection.id, itemId);
    setSnackbar({
      open: true,
      message: `"${itemTitle}" removed from collection!`,
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <motion.div
      className="exhibition-view-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Typography variant="h4" className="exhibition-title">
        {collection.name}
      </Typography>
      <div className="exhibition-browse-controls">
        <label>
          Find an artwork
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search saved artwork titles"
          />
        </label>
        <label>
          Order artworks
          <select value={sortMode} onChange={(event) => setSortMode(event.target.value)}>
            <option value="added">Curated order</option>
            <option value="az">Title A–Z</option>
            <option value="za">Title Z–A</option>
          </select>
        </label>
      </div>
      <p className="exhibition-count" role="status">
        Showing {visibleItems.length} of {collection.items.length} artworks
      </p>
      {collection.items.length > 0 && visibleItems.length === 0 && (
        <p role="status">No saved artworks match your search.</p>
      )}

      {collection.items.length === 0 ? (
        <Box className="exhibition-empty-state">
          <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: "#ccc" }} />
          <Typography variant="h6" sx={{ mt: 2, color: "#777" }}>
            No artworks added yet.
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: "#777" }}>
            Browse artworks and add them to this collection.
          </Typography>
          <Link to="/artworks">Explore artworks</Link>
        </Box>
      ) : (
        <motion.div
          className="exhibition-items"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
        >
          {visibleItems.map((item) => (
            <motion.div
              key={item.id}
              className="exhibition-item"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ArtCard art={item} />
              <Button
                onClick={() => handleRemove(item.id, item.title)}
                variant="contained"
                sx={{
                  backgroundColor: "#94351f",
                  "&:hover": { backgroundColor: "#742819" },
                }}
                className="exhibition-remove-btn"
                aria-label={`Remove ${item.title} from collection`}
              >
                Remove
              </Button>
            </motion.div>
          ))}
        </motion.div>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%", mt: 8 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default ExhibitionView;
