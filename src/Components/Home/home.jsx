import React from "react";
import SearchBar from "../SearchBar/Searchbar";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Explore the Beauty of Art</h1>
          <p className="hero-subtitle">
            Immerse yourself in a vibrant world of paintings, sculptures, and artifacts.
          </p>
          <SearchBar />
        </div>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <h2>Discover</h2>
          <p>Explore a vast collection of historical and modern artworks.</p>
        </div>
        <div className="feature-card">
          <h2>Curate</h2>
          <p>Create your own exhibitions and share them with the world.</p>
        </div>
        <div className="feature-card">
          <h2>Experience</h2>
          <p>Engage with interactive galleries and dynamic presentations.</p>
        </div>
      </section>

      <section className="gallery-preview">
        <h2 className="gallery-title">Featured Artworks</h2>
        <div className="gallery-grid">
          <div className="gallery-item"></div>
          <div className="gallery-item"></div>
          <div className="gallery-item"></div>
          <div className="gallery-item"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
