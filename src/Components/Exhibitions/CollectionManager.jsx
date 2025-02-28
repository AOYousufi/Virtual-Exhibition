import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCollections } from "../Context/CollectionContext";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import "./CollectionManager.css";

const CollectionManager = () => {
  const { collections, addCollection, removeCollection } = useCollections();
  const [newCollectionName, setNewCollectionName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAdd = () => {
    if (!newCollectionName.trim()) {
      setErrorMessage("Collection name cannot be empty.");
      return;
    }
    addCollection(newCollectionName.trim());
    setNewCollectionName("");
    setErrorMessage("");
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

        {errorMessage && (
          <motion.p
            className="error-message"
            role="alert"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {errorMessage}
          </motion.p>
        )}

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
                onClick={() => removeCollection(collection.id)}
                className="collection-manager-remove-btn"
                aria-label={`Remove ${collection.name} collection`}
              >
                Remove
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
};

export default CollectionManager;
