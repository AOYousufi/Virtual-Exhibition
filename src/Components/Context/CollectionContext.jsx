import React, { createContext, useContext, useState, useEffect } from 'react';

const CollectionsContext = createContext();

export const useCollections = () => useContext(CollectionsContext);

export const CollectionsProvider = ({ children }) => {
  
  const [collections, setCollections] = useState(() => {
    const saved = localStorage.getItem('collections');
    return saved ? JSON.parse(saved) : [];
  });
  
  console.log(collections);

  
  useEffect(() => {
    localStorage.setItem('collections', JSON.stringify(collections));
  }, [collections]);

  const addCollection = (name) => {
    const newCollection = {
      id: Date.now().toString(),
      name,
      items: [],
    };
    setCollections((prev) => [...prev, newCollection]);
  };

  const removeCollection = (collectionId) => {
    setCollections((prev) => prev.filter(col => col.id !== collectionId));
  };

  const addItemToCollection = (collectionId, item) => {
    setCollections((prev) =>
      prev.map(col =>
        col.id === collectionId
          ? { ...col, items: [...col.items, item] }
          : col
      )
    );
  };

  const removeItemFromCollection = (collectionId, itemId) => {
    setCollections((prev) =>
      prev.map(col =>
        col.id === collectionId
          ? { ...col, items: col.items.filter(item => item.id !== itemId) }
          : col
      )
    );
  };

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        addCollection,
        removeCollection,
        addItemToCollection,
        removeItemFromCollection,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};
