import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Home from "./Components/Home/home.jsx";
import Artworks from "./Components/Artworks/Artworks";
import SingleArt from "./Components/Artworks/Single Art/SingleArt";
import CollectionManager from "./Components/Exhibitions/CollectionManager";
import ExhibitionView from "./Components/Exhibitions/Individual Exhibiton/ExhibitonVIew";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer.jsx";

function App() {
  return (
    <div className="page-container">
      <Router>
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artworks" element={<Artworks />} />
            <Route path="/artworks/:id" element={<SingleArt />} />
            <Route path="/exhibitions" element={<CollectionManager />} />
            <Route path="/exhibitions/:id" element={<ExhibitionView />} />
            <Route
              path="*"
              element={
                <section className="not-found-page">
                  <h1>404</h1>
                  <p>We couldn&apos;t find that page.</p>
                  <Link to="/">Back to home</Link>
                </section>
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
