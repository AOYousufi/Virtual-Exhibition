import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCollections } from "../../Context/CollectionContext";
import "./ArtCard.css";

const ArtCard = ({ art }) => {
  const { collections } = useCollections();

  // Determine the image URL based on available data
  const imageUrl = art.contact?.includes("harvard.edu")
    ? art.primaryimageurl
    : art._currentLocation?.id?.startsWith("TH")
    ? art._images?._iiif_image_base_url + "full/full/0/default.jpg"
    : "https://via.placeholder.com/300x400?text=No+Image";

  const artId = art.contact?.includes("harvard.edu")
    ? art.id
    : art._currentLocation?.id?.startsWith("TH")
    ? art.systemNumber
    : "";

  const artLink = `/artworks/${artId}`;

  const isInCollection = collections.some((col) =>
    col.items.some((item) => item.id === artId)
  );

  return (
    <motion.div
      className={`art-card ${isInCollection ? "in-collection" : ""}`}
      whileHover={{
        scale: 1.05,
        boxShadow: isInCollection
          ? "0 10px 20px rgba(255, 215, 0, 0.4)"
          : "0 10px 15px rgba(0,0,0,0.2)",
      }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={artLink}
        className="art-card-link"
        aria-label={`View details for ${art.title || "Artwork"}`}
      >
        <div className="art-card-image-container">
          <motion.img
            src={imageUrl}
            alt={art.title || "Artwork"}
            className="art-card-image"
            loading="lazy"
            decoding="async"
            width="300"
            height="400"
            style={{ opacity: 1 }}
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/300x400?text=No+Image")
            }
          />
        </div>
        <div className="art-card-content">
          <p className="art-card-source">
            {art.contact?.includes("harvard.edu") ? "Harvard" : "V&A"}
          </p>
          <h3 className="art-card-title">
            {art.title || art._primaryTitle || "Untitled"}
          </h3>
          <p className="art-card-description">
            {art.medium || art._primaryDate || "No Description"}
          </p>
          {isInCollection && (
            <p className="art-card-collection">✨ In Collection</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ArtCard;
