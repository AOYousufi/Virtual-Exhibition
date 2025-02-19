import { Link } from "react-router-dom";
import "./ArtCard.css";
import { useCollections } from "../../Context/CollectionContext";
const ArtCard = ({ art }) => {

  const {collections} = useCollections()
  
  const imageUrl = art.contact?.includes("harvard.edu")
    ? art.primaryimageurl
    : art._currentLocation?.id?.startsWith("TH")
    ? art._images?._iiif_image_base_url + "full/full/0/default.jpg"
    : "https://via.placeholder.com/150";

  const sourceLabel = art.contact?.includes("harvard.edu")
    ? "Harvard"
    : art._currentLocation?.id?.startsWith("TH")
    ? "V&A"
    : "";


  const artLink = `/artworks/${
    art.contact?.includes("harvard.edu")
      ? art.id
      : art._currentLocation?.id?.startsWith("TH")
      ? art.systemNumber
      : ""
  }`;
  const artId = art.contact?.includes("harvard.edu")
  ? art.id
  : art._currentLocation?.id?.startsWith("TH")
    ? art.systemNumber
    : "";

const isInCollection = collections.some((col) =>
  col.items.some((item) => item.id === artId)
);

  return (
    <div className="art-card">
      <Link to={artLink} className="art-card-link">
        <div className="art-card-image-container">
         
          <img src={imageUrl} alt={art.title || "Artwork"} className="art-card-image" />
       
        </div>
        <div className="art-card-content">
          <p className="art-card-source">{sourceLabel}</p>
          <h3 className="art-card-title">{art.title || art._primaryTitle || "Untitled"}</h3>
          <p className="art-card-description">
            {art.medium || art._primaryDate || "No Description"}
            {isInCollection && <p> In Collection</p>}
           
          
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ArtCard;
