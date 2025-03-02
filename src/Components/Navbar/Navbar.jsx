import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./navbar.css";
import logo from "./Logo.png";
const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/">
              <img src={logo} />
            </Link>
          </div>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>

          <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li
              className={location.pathname === "/exhibitions" ? "active" : ""}
            >
              <Link to="/exhibitions" onClick={() => setMenuOpen(false)}>
                Exhibitions
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="navbar-spacer"></div>
    </>
  );
};

export default Navbar;
