import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/Searchbar";
import "./Home.css";

const discoveryThemes = [
  { title: "Portraits", query: "portrait" },
  { title: "Landscapes", query: "landscape" },
  { title: "Sculpture", query: "sculpture" },
  { title: "Textiles", query: "textile" },
];

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

      <section className="gallery-preview" aria-labelledby="explore-themes">
        <h2 id="explore-themes" className="gallery-title">Explore by Theme</h2>
        <p className="gallery-intro">Find something new across museum collections.</p>
        <div className="gallery-grid">
          {discoveryThemes.map(({ title, query }, index) => (
            <Link
              key={title}
              to={"/artworks?q=" + encodeURIComponent(query)}
              className={"gallery-item gallery-item-" + (index + 1)}
              aria-label={"Search for " + title.toLowerCase()}
            >
              <span>{title}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
