import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCollections } from "../Context/CollectionContext";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./CollectionManager.css";

const CollectionManager = () => {
  const { collections, addCollection, removeCollection } = useCollections();
  const [newCollectionName, setNewCollectionName] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" or "error"
  });

  const handleAdd = () => {
    const nameTrimmed = newCollectionName.trim();
    if (!nameTrimmed) {
      setSnackbar({
        open: true,
        message: "Collection name cannot be empty.",
        severity: "error",
      });
      return;
    }
    // Check for duplicate name
    const existing = collections.find(
      (col) => col.name.toLowerCase() === nameTrimmed.toLowerCase()
    );
    if (existing) {
      setSnackbar({
        open: true,
        message: "A collection with that name already exists.",
        severity: "error",
      });
      return;
    }
    addCollection(nameTrimmed);
    setNewCollectionName("");
    setSnackbar({
      open: true,
      message: "New collection added successfully!",
      severity: "success",
    });
  };

  const handleRemove = (collectionId, collectionName) => {
    removeCollection(collectionId);
    setSnackbar({
      open: true,
      message: `Collection "${collectionName}" removed successfully!`,
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <motion.div
      className="collection-manager-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="collection-manager-container">
        <motion.h1
          className="collection-manager-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Exhibition Collections
        </motion.h1>

        <div className="collection-manager-form">
          <input
            type="text"
            placeholder="New Collection Name"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            className="collection-manager-input"
            aria-label="New Collection Name"
          />
          <button
            onClick={handleAdd}
            className="collection-manager-button"
            aria-label="Add Collection"
          >
            Add Collection
          </button>
        </div>

        <motion.ul
          className="collection-manager-list"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {collections.map((collection) => (
            <motion.li
              key={collection.id}
              className="collection-manager-item"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Tooltip
                title={`Number of artworks: ${collection.items.length}`}
                arrow
              >
                <Link
                  to={`/exhibitions/${collection.id}`}
                  className="collection-manager-link"
                >
                  {collection.name}
                </Link>
              </Tooltip>
              <button
                onClick={() => handleRemove(collection.id, collection.name)}
                className="collection-manager-remove-btn"
                aria-label={`Remove ${collection.name} collection`}
              >
                Remove
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default CollectionManager;
