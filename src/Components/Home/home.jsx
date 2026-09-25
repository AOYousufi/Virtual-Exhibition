import React from "react";
import { Link } from "react-router-dom";
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

      <section className="features-section" aria-label="What you can do">
        <div className="feature-card">
          <h2>Discover</h2>
          <p>Search artworks from the Harvard Art Museums and V&amp;A collections.</p>
        </div>
        <div className="feature-card">
          <h2>Curate</h2>
          <p>Save artworks into personal exhibition collections in this browser.</p>
        </div>
        <div className="feature-card">
          <h2>Experience</h2>
          <p>Open artwork details, view larger images and build your own collection.</p>
        </div>
      </section>

      <section className="gallery-preview">
        <h2 className="gallery-title">Featured Artworks</h2>
        <div className="gallery-grid">
          {["Harvard artwork", "Harvard artwork", "V&A artwork", "Harvard artwork"].map(
            (label, index) => (
              <Link
                key={label + index}
                to="/artworks?q=art"
                className={"gallery-item gallery-item-" + (index + 1)}
                aria-label={"Explore featured " + label}
              >
                <span>Explore artworks</span>
              </Link>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
