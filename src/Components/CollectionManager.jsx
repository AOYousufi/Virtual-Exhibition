import React, { useState } from 'react';
import { useCollections } from './CollectionContext';

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
    <div>
      <h2>Your Exhibition Collections</h2>
      <input
        type="text"
        placeholder="New Collection Name"
        value={newCollectionName}
        onChange={(e) => setNewCollectionName(e.target.value)}
      />
      <button onClick={handleAdd}>Add Collection</button>
      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>
            {collection.name}
            <button onClick={() => removeCollection(collection.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionManager;
