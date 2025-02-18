import React from 'react';
import { useCollections } from './CollectionContext';

const ExhibitionView = ({ collectionId }) => {
  const { collections, removeItemFromCollection } = useCollections();
  const collection = collections.find(col => col.id === collectionId);

  if (!collection) return <p>Collection not found.</p>;

  return (
    <div>
      <h3>{collection.name}</h3>
      {collection.items.length === 0 ? (
        <p>No artworks added yet.</p>
      ) : (
        <ul>
          {collection.items.map((item) => (
            <li key={item.id}>
              <p>{item.title}</p>
              <button onClick={() => removeItemFromCollection(collectionId, item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExhibitionView;
