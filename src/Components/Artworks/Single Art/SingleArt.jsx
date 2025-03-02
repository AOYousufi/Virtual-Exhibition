import { useParams } from "react-router-dom";
import { fetchArtById } from "../../../APIs/api";
import { useState, useEffect } from "react";
import { useCollections } from "../../Context/CollectionContext";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Button,
  Alert,
  Dialog,
  DialogContent,
  IconButton,
  Skeleton,
  TextField,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./singleArt.css";

const SingleArt = () => {
  const { id } = useParams();
  const [artDetails, setArtDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [collectionPanelOpen, setCollectionPanelOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // For creating a new collection from this panel
  const [newCollectionName, setNewCollectionName] = useState("");
  const [createCollectionError, setCreateCollectionError] = useState("");

  // Snackbar state for confirmation messages
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" or "error"
  });

  const { collections, addItemToCollection, addCollection } = useCollections();

  useEffect(() => {
    setIsLoading(true);
    setError("");
    fetchArtById(id)
      .then((response) => {
        if (!response || Object.keys(response).length === 0) {
          setError("No artwork found for this ID.");
        } else {
          setArtDetails(response);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load artwork details.");
        setIsLoading(false);
      });
  }, [id]);

  const handleAddToCollection = (collectionId) => {
    const collection = collections.find((col) => col.id === collectionId);
    if (!collection) return;
    const itemExists = collection.items.some(
      (item) => item.id === artDetails.id
    );
    if (itemExists) {
      setSnackbar({
        open: true,
        message: "This artwork is already in the collection!",
        severity: "error",
      });
      return;
    }
    addItemToCollection(collectionId, artDetails);
    setSnackbar({
      open: true,
      message: "Artwork added to collection!",
      severity: "success",
    });
  };

  const handleCreateCollection = () => {
    const nameTrimmed = newCollectionName.trim();
    if (!nameTrimmed) {
      setCreateCollectionError("Collection name cannot be empty.");
      return;
    }
    // Check for duplicate name
    const existing = collections.find(
      (col) => col.name.toLowerCase() === nameTrimmed.toLowerCase()
    );
    if (existing) {
      setCreateCollectionError("A collection with that name already exists.");
      return;
    }
    addCollection(nameTrimmed);
    setNewCollectionName("");
    setCreateCollectionError("");
    setSnackbar({
      open: true,
      message: "New collection created!",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Loading state with Skeletons
  if (isLoading)
    return (
      <Box className="single-art-container">
        <div className="single-art-content-wrapper">
          <motion.div className="single-art-hero">
            <Skeleton
              variant="rectangular"
              width="100%"
              height={500}
              animation="wave"
            />
          </motion.div>
          <div className="single-art-details-wrapper">
            <Skeleton variant="text" width="80%" height={40} animation="wave" />
            <Skeleton variant="text" width="60%" height={30} animation="wave" />
            <Skeleton variant="text" width="70%" height={30} animation="wave" />
            <Skeleton variant="text" width="50%" height={30} animation="wave" />
            <Skeleton variant="text" width="90%" height={30} animation="wave" />
            <Skeleton
              variant="rectangular"
              width={200}
              height={40}
              animation="wave"
              sx={{ mt: 2 }}
            />
          </div>
        </div>
      </Box>
    );

  // Error state
  if (error)
    return (
      <Box
        className="single-art-container"
        sx={{
          minHeight: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{
            fontSize: "1.2rem",
            p: 3,
            width: "80%",
            maxWidth: "600px",
            textAlign: "center",
          }}
        >
          {error}
        </Alert>
      </Box>
    );

  // No art found state
  if (!artDetails)
    return (
      <Box className="single-art-container">
        <Alert severity="info">No artwork found.</Alert>
      </Box>
    );

  return (
    <section className="single-art-container">
      <div className="single-art-content-wrapper">
        <motion.div
          className="single-art-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {artDetails.image && (
            <div
              className="single-art-image"
              onClick={() => setLightboxOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <img src={artDetails.image} alt={artDetails.title} />
            </div>
          )}
        </motion.div>
        <div className="single-art-details-wrapper">
          <div className="single-art-content">
            <h1 className="single-art-title">{artDetails.title}</h1>
            {artDetails.artist && (
              <p>
                <strong>Artist:</strong> {artDetails.artist}
              </p>
            )}
            {artDetails.date && (
              <p>
                <strong>Date:</strong> {artDetails.date}
              </p>
            )}
            {artDetails.medium && (
              <p>
                <strong>Medium:</strong> {artDetails.medium}
              </p>
            )}
            {artDetails.dimensions && (
              <p>
                <strong>Dimensions:</strong> {artDetails.dimensions}
              </p>
            )}
            {artDetails.location && (
              <p>
                <strong>Location:</strong> {artDetails.location}
              </p>
            )}
            <Button
              variant="contained"
              className="add-to-collection-btn"
              onClick={() => setCollectionPanelOpen(true)}
              sx={{
                backgroundColor: "#ff7e5f",
                "&:hover": { backgroundColor: "#feb47b" },
              }}
            >
              + Add to Collection
            </Button>
          </div>
        </div>
      </div>

      {collectionPanelOpen && (
        <div className="collection-panel">
          <div className="collection-panel-header">
            <h2>Select Collection</h2>
            <button
              className="close-panel"
              onClick={() => setCollectionPanelOpen(false)}
            >
              ✖
            </button>
          </div>

          {/* Existing Collections */}
          <div className="collection-list">
            {collections.length > 0 ? (
              collections.map((col) => (
                <button
                  key={col.id}
                  onClick={() => handleAddToCollection(col.id)}
                >
                  {col.name}
                </button>
              ))
            ) : (
              <div className="no-collections">
                <p>No collections found.</p>
              </div>
            )}
          </div>

          <Box sx={{ width: "100%", mt: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}
            >
              Create a New Collection
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                label="Collection Name"
                variant="outlined"
                size="small"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                sx={{ flex: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleCreateCollection}
                sx={{
                  backgroundColor: "#ff7e5f",
                  "&:hover": { backgroundColor: "#feb47b" },
                }}
              >
                Create
              </Button>
            </Box>
            {createCollectionError && (
              <Typography
                variant="body2"
                color="error"
                sx={{ mt: 1, textAlign: "center" }}
              >
                {createCollectionError}
              </Typography>
            )}
          </Box>

          <p className="collection-info">
            You can add this artwork to multiple collections.
          </p>
        </div>
      )}

      {snackbar.open && (
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
      )}

      <Dialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        maxWidth="lg"
        PaperProps={{
          style: { backgroundColor: "transparent", boxShadow: "none" },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ position: "relative" }}>
            <IconButton
              onClick={() => setLightboxOpen(false)}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "white",
                backgroundColor: "rgba(0,0,0,0.5)",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
              }}
            >
              <CloseIcon />
            </IconButton>
            <img
              src={artDetails.image}
              alt={artDetails.title}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SingleArt;
