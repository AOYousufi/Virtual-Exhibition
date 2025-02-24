import { useParams } from "react-router-dom";
import { fetchArtById } from "../../../APIs/api";
import { useState, useEffect } from "react";
import { useCollections } from "../../Context/CollectionContext";
import { motion } from "framer-motion";
import "./singleArt.css";

const SingleArt = () => {
  const { id } = useParams();
  const [artDetails, setArtDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [collectionPanelOpen, setCollectionPanelOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // ✅ State for confirmation
  const { collections, addItemToCollection } = useCollections();
console.log(artDetails);
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

  if (isLoading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!artDetails) return <p className="no-art">No artwork found.</p>;

  
  const handleAddToCollection = (collectionId) => {
    const collection = collections.find(col => col.id === collectionId);
    if (!collection) return;
  
    const itemExists = collection.items.some(item => item.id === artDetails.id);
    if (itemExists) {
      setShowConfirmation(false);
      alert("This artwork is already in the collection!");
      return;
    }
  
    addItemToCollection(collectionId, artDetails);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  return (
    <section className="single-art-container">
      {/* ✅ Hero Section */}
      <motion.div 
        className="single-art-hero"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        {artDetails.image && (
          <div className="single-art-image">
            <img src={artDetails.image} alt={artDetails.title} />
          </div>
        )}
      </motion.div>


      <div className="single-art-content">
        <div className="single-art-details">
          <h1 className="single-art-title">{artDetails.title}</h1>
          {artDetails.artist && <p><strong>Artist:</strong> {artDetails.artist}</p>}
          {artDetails.date && <p><strong>Date:</strong> {artDetails.date}</p>}
          {artDetails.medium && <p><strong>Medium:</strong> {artDetails.medium}</p>}
          {artDetails.dimensions && <p><strong>Dimensions:</strong> {artDetails.dimensions}</p>}
          {artDetails.location && <p><strong>Location:</strong> {artDetails.location}</p>}


          <motion.button
            className="add-to-collection-btn"
            whileHover={{ scale: 1.1 }}
            onClick={() => setCollectionPanelOpen(true)}
          >
            + Add to Collection
          </motion.button>
        </div>
      </div>

     
      {collectionPanelOpen && (
        <motion.div
          className="collection-panel"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2>Select Collection</h2>
          <button className="close-panel" onClick={() => setCollectionPanelOpen(false)}>✖</button>
          <div className="collection-list">
            {collections.map((col) => (
              <button key={col.id} onClick={() => handleAddToCollection(col.id)}>
                {col.name}
              </button>
            ))}
          </div>
          <p className="collection-info">You can add this artwork to multiple collections.</p>
        </motion.div>
      )}


      {showConfirmation && (
        <motion.div 
          className="confirmation-toast"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0, y: 20 }}
        >
          ✅ Artwork added to collection!
        </motion.div>
      )}
    </section>
  );
};

export default SingleArt;
