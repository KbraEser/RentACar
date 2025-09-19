import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          CarRental
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Ana Sayfa
          </Link>
          <Link to="/cars" className="navbar-link">
            Araçlar
          </Link>
          <Link to="/about" className="navbar-link">
            Hakkımızda
          </Link>
          <Link to="/contact" className="navbar-link">
            İletişim
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
