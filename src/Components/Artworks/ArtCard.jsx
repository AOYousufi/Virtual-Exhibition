import { Link } from "react-router-dom";

const ArtCard = ({ art }) => {


console.log(art.images);
console.log(art.images?.[0]);
console.log(art);
    return (
      <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
      <Link to={`/artworks/${art.contact?.includes("harvard.edu")
    ? art?.id
    : art._currentLocation?.id?.startsWith("TH") 
    ? art?.systemNumber
    : ""}`}>
        <img
          src={
            art.contact?.includes("harvard.edu")? art.
primaryimageurl : art._currentLocation?.id?.startsWith("TH") ?art._images?._iiif_image_base_url+"full/full/0/default.jpg" : "nothign" }
          alt={art.title || "Artwork"}
          style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
        />
<p>
  {art.contact?.includes("harvard.edu")
    ? "Harvard"
    : art._currentLocation?.id?.startsWith("TH") 
    ? "V&A" 
    : ""}
</p>
        <h3 style={{ fontSize: "16px", margin: "10px 0" }}>{art.title || art._primaryTitle || "Untitled"}</h3>

        <p style={{ fontSize: "14px", color: "#555" }}>{art.medium || art._primaryDate || "No Description"}</p>
        </Link>
      </div>
    );
  };
  
  export default ArtCard;
  