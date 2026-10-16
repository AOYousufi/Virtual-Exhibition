import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useCollections } from "../../Context/CollectionContext";
import "./ArtCard.css";

const PLACEHOLDER =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"><rect width="300" height="400" fill="#eee9e2"/><text x="150" y="200" text-anchor="middle" fill="#685a50" font-family="sans-serif" font-size="17">Image unavailable</text></svg>');

const getImageUrl = (art) => {
  if (art.image || art.primaryimageurl) return art.image || art.primaryimageurl;
  if (art.images?.[0]?.baseimageurl) return art.images[0].baseimageurl;
  const iiif = art._images?._iiif_image_base_url || art._images?._iiif_image;
  return iiif ? iiif.replace(/\/$/, "") + "/full/600,/0/default.jpg" : PLACEHOLDER;
};

const ArtCard = ({ art }) => {
  const { collections } = useCollections();
  const location = useLocation();
  // Harvard search records expose objectid; V&A search records expose systemNumber.
  const artId = art.id ?? art.objectid ?? art.systemNumber;
  const title = art.title || art._primaryTitle || "Untitled artwork";
  const isInCollection = collections.some((col) =>
    col.items.some((item) => String(item.id) === String(artId))
  );
  const source = art.systemNumber ? "V&A" : art.objectid ? "Harvard" : "Saved artwork";

  const body = (
    <>
      <div className="art-card-image-container">
        <img
          src={getImageUrl(art)}
          alt={title}
          className="art-card-image"
          loading="lazy"
          decoding="async"
          width="300"
          height="400"
          onError={(event) => {
            if (event.currentTarget.src !== PLACEHOLDER) {
              event.currentTarget.src = PLACEHOLDER;
            }
          }}
        />
      </div>
      <div className="art-card-content">
        <p className="art-card-source">{source}</p>
        <h3 className="art-card-title">{title}</h3>
        <p className="art-card-description">
          {art.medium || art.date || art.dated || art._primaryDate || "Explore the artwork"}
        </p>
        {isInCollection && <p className="art-card-collection">In Collection</p>}
      </div>
    </>
  );

  return (
    <motion.div
      className={"art-card" + (isInCollection ? " in-collection" : "")}
      whileHover={{ boxShadow: "0 8px 16px rgba(0,0,0,0.16)" }}
      transition={{ duration: 0.2 }}
    >
      {artId === undefined || artId === null ? (
        <div aria-label={"Details unavailable for " + title}>{body}</div>
      ) : (
        <Link
          to={"/artworks/" + encodeURIComponent(artId)}
          state={{ from: location.pathname + location.search }}
          className="art-card-link"
          aria-label={"View details for " + title}
        >
          {body}
        </Link>
      )}
    </motion.div>
  );
};

export default ArtCard;
