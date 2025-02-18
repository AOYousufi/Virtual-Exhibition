import React, { createContext, useContext, useState, useEffect } from 'react';

const CollectionsContext = createContext();

export const useCollections = () => useContext(CollectionsContext);

export const CollectionsProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);
  console.log(collections);

 
  useEffect(() => {
    const saved = localStorage.getItem('collections');
    if (saved) {
      setCollections(JSON.parse(saved));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('collections', JSON.stringify(collections));
  }, [collections]);


  const addCollection = (name) => {
    const newCollection = {
      id: Date.now().toString(), 
      name,
      items: [],
    };
    setCollections([...collections, newCollection]);
  };

  const removeCollection = (collectionId) => {
    setCollections(collections.filter(col => col.id !== collectionId));
  };

  const addItemToCollection = (collectionId, item) => {
    setCollections(collections.map(col =>
      col.id === collectionId
        ? { ...col, items: [...col.items, item] }
        : col
    ));
  };

  const removeItemFromCollection = (collectionId, itemId) => {
    setCollections(collections.map(col =>
      col.id === collectionId
        ? { ...col, items: col.items.filter(item => item.id !== itemId) }
        : col
    ));
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
