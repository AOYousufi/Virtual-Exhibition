import { Link } from 'react-router-dom';
import './navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">My Art Platform</Link>
        </div>
        <ul className="navbar-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
         
          <li>
            <Link to="/exhibitons">Exhibitions</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
