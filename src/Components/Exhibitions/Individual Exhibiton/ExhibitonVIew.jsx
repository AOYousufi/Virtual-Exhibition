import React from "react";
import { useCollections } from "../../Context/CollectionContext";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./ExhibitionView.css";

const ExhibitionView = () => {
  const { collections, removeItemFromCollection } = useCollections();
  const { id } = useParams();
  const collection = collections.find((col) => col.id === id);

  if (!collection)
    return <p className="exhibition-error">Collection not found.</p>;

  return (
    <motion.div
      className="exhibition-view-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="exhibition-title">{collection.name}</h1>
      {collection.items.length === 0 ? (
        <p className="exhibition-empty">No artworks added yet.</p>
      ) : (
        <motion.ul
          className="exhibition-items"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {collection.items.map((item) => (
            <motion.li
              key={item.id}
              className="exhibition-item"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                to={`/artworks/${item.id}`}
                className="exhibition-item-link"
              >
                <p className="exhibition-item-title">{item.title}</p>
              </Link>
              <button
                className="exhibition-remove-btn"
                onClick={() => removeItemFromCollection(collection.id, item.id)}
                aria-label={`Remove ${item.title} from collection`}
              >
                Remove
              </button>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default ExhibitionView;
