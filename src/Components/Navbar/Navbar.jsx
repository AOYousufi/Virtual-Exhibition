import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">

          {/* ✅ Logo */}
          <div className="navbar-logo">
            <Link to="/">My Art Platform</Link>
          </div>

          {/* ✅ Mobile Menu Button */}
          <button 
            className="menu-toggle" 
            onClick={() => setMenuOpen(!menuOpen)} 
            aria-label="Toggle Menu"
          >
            ☰
          </button>

          {/* ✅ Navigation Menu */}
          <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li className={location.pathname === "/exhibitions" ? "active" : ""}>
              <Link to="/exhibitions" onClick={() => setMenuOpen(false)}>Exhibitions</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* ✅ Spacer to prevent content from going under navbar */}
      <div className="navbar-spacer"></div>
    </>
  );
};

export default Navbar;
