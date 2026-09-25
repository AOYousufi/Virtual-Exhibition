import React, { useState } from "react";
import { useCollections } from "../../Context/CollectionContext";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import ArtCard from "../../Artworks/ArtCard/ArtCard";
import "./ExhibitionView.css";

const ExhibitionView = () => {
  const { collections, removeItemFromCollection } = useCollections();
  const { id } = useParams();
  const collection = collections.find((col) => col.id === id);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  if (!collection)
    return <p className="exhibition-error">Collection not found.</p>;

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
      {collection.items.length === 0 ? (
        <Box className="exhibition-empty-state">
          <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: "#ccc" }} />
          <Typography variant="h6" sx={{ mt: 2, color: "#777" }}>
            No artworks added yet.
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: "#999" }}>
            Browse artworks and add them to this collection.
          </Typography>
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
          {collection.items.map((item) => (
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
