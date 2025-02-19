import React, { useState } from 'react';
import { useCollections } from '../Context/CollectionContext';
import { Link } from 'react-router-dom';
import './CollectionManager.css';

const CollectionManager = () => {
  const { collections, addCollection, removeCollection } = useCollections();
  const [newCollectionName, setNewCollectionName] = useState('');

  const handleAdd = () => {
    if (newCollectionName.trim()) {
      addCollection(newCollectionName.trim());
      setNewCollectionName('');
    }
  };

  return (
    <div className="collection-manager-container">
      <h2 className="collection-manager-title">Your Exhibition Collections</h2>
      <input
        type="text"
        placeholder="New Collection Name"
        value={newCollectionName}
        onChange={(e) => setNewCollectionName(e.target.value)}
        className="collection-manager-input"
      />
      <button onClick={handleAdd} className="collection-manager-button">Add Collection</button>
      <ul className="collection-manager-list">
        {collections.map((collection) => (
          <li key={collection.id}>
            <Link to={`/exhibitons/${collection.id}`}>{collection.name}</Link>
            <button onClick={() => removeCollection(collection.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionManager;
