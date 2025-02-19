import React from 'react';
import { useCollections } from '../../Context/CollectionContext';
import { useParams } from 'react-router-dom';
import './ExhibitionView.css';
import { Link } from 'react-router-dom';
const ExhibitionView = () => {
  const { collections, removeItemFromCollection } = useCollections();
  const { id } = useParams();
  const collectionId = id;
  const collection = collections.find((col) => col.id === collectionId);

  if (!collection) return <p className="exhibition-error">Collection not found.</p>;

  return (
    <div className="exhibition-view-container">
      <h3 className="exhibition-title">{collection.name}</h3>
      {collection.items.length === 0 ? (
        <p className="exhibition-empty">No artworks added yet.</p>
      ) : (
        <ul className="exhibition-items">
          {collection.items.map((item) => (
            <li key={item.id} className="exhibition-item">
              <Link to={`/artworks/${item.id}`}><p className="exhibition-item-title">{item.title}</p></Link>
              <button
                className="exhibition-remove-btn"
                onClick={() => removeItemFromCollection(collectionId, item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExhibitionView;
