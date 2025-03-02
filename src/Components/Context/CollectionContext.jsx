import React, { createContext, useContext, useState, useEffect } from "react";

const CollectionsContext = createContext();

export const useCollections = () => useContext(CollectionsContext);

export const CollectionsProvider = ({ children }) => {
  const [collections, setCollections] = useState(() => {
    const saved = localStorage.getItem("collections");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("collections", JSON.stringify(collections));
  }, [collections]);

  const addCollection = (name) => {
    const nameExists = collections.some(
      (col) => col.name.toLowerCase() === name.toLowerCase()
    );
    if (nameExists) {
      alert("A collection with this name already exists!");
      return;
    }
    const newCollection = {
      id: Date.now().toString(),
      name,
      items: [],
    };
    setCollections((prev) => [...prev, newCollection]);
  };

  const removeCollection = (collectionId) => {
    setCollections((prev) => prev.filter((col) => col.id !== collectionId));
  };

  const addItemToCollection = (collectionId, item) => {
    setCollections((prev) =>
      prev.map((col) => {
        if (col.id === collectionId) {
          const itemExists = col.items.some(
            (existingItem) => existingItem.id === item.id
          );
          if (itemExists) {
            alert("This artwork is already in the collection!");
            return col;
          }
          return { ...col, items: [...col.items, item] };
        }
        return col;
      })
    );
  };

  const removeItemFromCollection = (collectionId, itemId) => {
    setCollections((prev) =>
      prev.map((col) =>
        col.id === collectionId
          ? { ...col, items: col.items.filter((item) => item.id !== itemId) }
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
