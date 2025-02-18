import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExhibitionView from "../CollectionManager";

const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/artworks?q=${query}`); 
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to the Artwork Gallery</h1>
      <p>Search for artworks from Harvard and V&A Museums</p>
      <input
        type="text"
        placeholder="Enter artwork name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "300px",
          marginRight: "10px",
        }}
      />
      <button onClick={handleSearch} style={{ padding: "10px 15px", fontSize: "16px", cursor: "pointer" }}>
        Search
      </button>
   
    </div>
  );
};

export default Home;
