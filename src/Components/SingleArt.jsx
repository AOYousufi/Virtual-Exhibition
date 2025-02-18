import { useParams } from 'react-router-dom';
import { fetchArtById } from '../api';
import { useState, useEffect } from 'react';
import { useCollections } from './CollectionContext';
import './singleArt.css';
import ExhibitionView from './ExhibitonVIew';
import CollectionManager from './CollectionManager';

const SingleArt = () => {
  const { id } = useParams();
  const [artDetails, setArtDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('');
  const { collections, addItemToCollection } = useCollections();

  useEffect(() => {
    setIsLoading(true);
    fetchArtById(id)
      .then((response) => {
        setArtDetails(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load artwork details');
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!artDetails) return <p className="no-art">No artwork found.</p>;

  const handleAddToCollection = () => {
    if (selectedCollection) {
      addItemToCollection(selectedCollection, artDetails);
      alert(`Artwork "${artDetails.title}" added to your collection.`);
    }
  };

  return (
    <section className="art-container">
      {artDetails.title && <h1 className="art-title">{artDetails.title}</h1>}
      <div className="art-content">
        {artDetails.image && (
          <div className="art-image">
            <img src={artDetails.image} alt={artDetails.title} />
          </div>
        )}
        <div className="art-details">
          {artDetails.date && (
            <p>
              <strong>Date:</strong> {artDetails.date}
            </p>
          )}
          {artDetails.medium && (
            <p>
              <strong>Medium:</strong> {artDetails.medium}
            </p>
          )}
          {artDetails.dimensions && (
            <p>
              <strong>Dimensions:</strong> {artDetails.dimensions}
            </p>
          )}
          {artDetails.description && (
            <>
              <p>
                <strong>Description:</strong>
              </p>
              <div
                className="art-description"
                dangerouslySetInnerHTML={{ __html: artDetails.description }}
              />
            </>
          )}
          {artDetails.provenance && (
            <p>
              <strong>Provenance:</strong> {artDetails.provenance}
            </p>
          )}
          {artDetails.location && (
            <p>
              <strong>Location:</strong> {artDetails.location}
            </p>
          )}
          {artDetails.creditLine && (
            <p>
              <strong>Credit Line:</strong> {artDetails.creditLine}
            </p>
          )}

          {/* Add to Collection Section */}
          <div className="add-to-collection">
            <label htmlFor="collectionSelect">Add to Collection:</label>
            <select
              id="collectionSelect"
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
            >
              <option value="">Select Collection</option>
              {collections.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>
            <button onClick={handleAddToCollection} disabled={!selectedCollection}>
              Add to Collection
            </button>
          </div>
        </div>
    
<ExhibitionView collectionId={collections?.[0]?.id}/>
<CollectionManager/>
      </div>
    </section>
  );
};

export default SingleArt;
