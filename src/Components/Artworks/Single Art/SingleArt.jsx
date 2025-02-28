import { useParams } from "react-router-dom";
import { fetchArtById } from "../../../APIs/api";
import { useState, useEffect } from "react";
import { useCollections } from "../../Context/CollectionContext";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./singleArt.css";

const SingleArt = () => {
  const { id } = useParams();
  const [artDetails, setArtDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [collectionPanelOpen, setCollectionPanelOpen] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { collections, addItemToCollection } = useCollections();

  useEffect(() => {
    setIsLoading(true);
    fetchArtById(id)
      .then((response) => {
        setArtDetails(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load artwork details");
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
      setShowMessage("This artwork is already in the collection!");
      setMessageType("error");
      setTimeout(() => {
        setShowMessage("");
        setMessageType("");
      }, 3000);
      return;
    }
    addItemToCollection(collectionId, artDetails);
    setShowMessage("Artwork added to collection!");
    setMessageType("success");
    setTimeout(() => {
      setShowMessage("");
      setMessageType("");
    }, 3000);
  };

  if (isLoading)
    return (
      <Box className="loading">
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Box className="error">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  if (!artDetails)
    return (
      <Box className="no-art">
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
                <button
                  className="create-collection-btn"
                  onClick={() => {
                    /* TODO: open create modal */
                  }}
                >
                  Create New Collection
                </button>
              </div>
            )}
          </div>
          <p className="collection-info">
            You can add this artwork to multiple collections.
          </p>
        </div>
      )}

      {showMessage && (
        <div className={`message-toast ${messageType}`}>{showMessage}</div>
      )}

      {/* Lightbox Dialog for Enlarged Image */}
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
