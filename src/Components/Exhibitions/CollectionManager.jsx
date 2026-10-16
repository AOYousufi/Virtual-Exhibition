import { useState } from "react";
import { motion } from "framer-motion";
import { useCollections } from "../Context/CollectionContext";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./CollectionManager.css";

const CollectionManager = () => {
  const { collections, addCollection, renameCollection, restoreCollections, removeCollection } = useCollections();
  const [newCollectionName, setNewCollectionName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
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

  const handleRename = (event, collectionId) => {
    event.preventDefault();
    const renamed = renameCollection(collectionId, editedName);
    setSnackbar({ open: true, message: renamed ? "Exhibition renamed." : "Use a unique name between 1 and 100 characters.", severity: renamed ? "success" : "error" });
    if (renamed) setEditingId(null);
  };

  const handleRemove = (collectionId, collectionName) => {
    if (!window.confirm(`Remove "${collectionName}" and all its saved artworks?`)) return;
    removeCollection(collectionId);
    setSnackbar({
      open: true,
      message: `Collection "${collectionName}" removed successfully!`,
      severity: "success",
    });
  };

  const handleExport = () => {
    const backup = JSON.stringify({ version: 1, collections }, null, 2);
    const blob = new Blob([backup], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "virtual-exhibitions-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setSnackbar({ open: true, message: "Exhibitions exported to a JSON backup.", severity: "success" });
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      if (file.size > 2_000_000) throw new Error("Backup file is too large (maximum 2 MB).");
      const parsed = JSON.parse(await file.text());
      if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.collections)) {
        throw new Error("This is not a Virtual Exhibition backup.");
      }
      if (!window.confirm("Replace your current exhibitions with this backup? Export them first if needed.")) return;
      if (!restoreCollections(parsed)) throw new Error("Backup contains invalid collections or artwork.");
      setSnackbar({ open: true, message: "Exhibition backup imported successfully.", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: error.message || "Could not import backup.", severity: "error" });
    }
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

        <div className="storage-notice collection-storage-notice" role="note">
          Collections are stored locally in this browser. They are not attached to
          an account, and clearing browser storage may remove them.
        </div>

        <div className="collection-backup-tools" aria-label="Backup exhibition collections">
          <button type="button" onClick={handleExport} disabled={collections.length === 0}>
            Export collections (.json)
          </button>
          <label className="collection-import-label">
            Import backup
            <input type="file" accept=".json,application/json" onChange={handleImport} />
          </label>
        </div>

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
            >
              {editingId === collection.id ? (
                <form className="collection-rename-form" onSubmit={(event) => handleRename(event, collection.id)}>
                  <input
                    value={editedName}
                    onChange={(event) => setEditedName(event.target.value)}
                    maxLength={100}
                    aria-label="Rename exhibition"
                    autoFocus
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <Tooltip title={`Number of artworks: ${collection.items.length}`} arrow>
                    <Link to={`/exhibitions/${collection.id}`} className="collection-manager-link">
                      {collection.name} ({collection.items.length})
                    </Link>
                  </Tooltip>
                  <div className="collection-manager-actions">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(collection.id);
                        setEditedName(collection.name);
                      }}
                      className="collection-manager-rename-btn"
                      aria-label={`Rename ${collection.name}`}
                    >
                      Rename
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(collection.id, collection.name)}
                      className="collection-manager-remove-btn"
                      aria-label={`Remove ${collection.name} collection`}
                    >
                      Remove
                    </button>
                  </div>
                </>
              )}
            </motion.li>
          ))}
        </motion.ul>
      </div>

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

export default CollectionManager;
