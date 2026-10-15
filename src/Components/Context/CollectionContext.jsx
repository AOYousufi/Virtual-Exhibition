import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "collections";
const CollectionsContext = createContext(null);

const isValidCollection = (collection) =>
  collection &&
  typeof collection.id === "string" &&
  typeof collection.name === "string" &&
  Array.isArray(collection.items);

const readCollections = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.filter(isValidCollection) : [];
  } catch (error) {
    console.warn("Saved collections could not be read:", error);
    return [];
  }
};

export const useCollections = () => {
  const context = useContext(CollectionsContext);
  if (!context) throw new Error("useCollections must be used inside CollectionsProvider");
  return context;
};

export const CollectionsProvider = ({ children }) => {
  const [collections, setCollections] = useState(readCollections);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
    } catch (error) {
      console.warn("Collections could not be saved on this device:", error);
    }
  }, [collections]);

  useEffect(() => {
    // Keep exhibitions in sync when a second tab edits the same browser storage.
    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY) setCollections(readCollections());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addCollection = (name) => {
    const trimmed = typeof name === "string" ? name.trim() : "";
    if (!trimmed || trimmed.length > 100) return null;
    if (collections.some((col) => col.name.toLowerCase() === trimmed.toLowerCase())) {
      return null;
    }
    const id = typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Date.now().toString();
    setCollections((prev) => [...prev, { id, name: trimmed, items: [] }]);
    return id;
  };

  const removeCollection = (collectionId) => {
    setCollections((prev) => prev.filter((col) => col.id !== collectionId));
  };

  const addItemToCollection = (collectionId, item) => {
    if (!item || item.id === undefined || item.id === null) return;
    setCollections((prev) =>
      prev.map((col) => {
        if (col.id !== collectionId) return col;
        if (col.items.some((existing) => String(existing.id) === String(item.id))) return col;
        return { ...col, items: [...col.items, item] };
      })
    );
  };

  const removeItemFromCollection = (collectionId, itemId) => {
    setCollections((prev) =>
      prev.map((col) =>
        col.id === collectionId
          ? { ...col, items: col.items.filter((item) => String(item.id) !== String(itemId)) }
          : col
      )
    );
  };

  return (
    <CollectionsContext.Provider
      value={{ collections, addCollection, removeCollection, addItemToCollection, removeItemFromCollection }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};
