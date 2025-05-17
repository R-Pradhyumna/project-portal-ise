import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      {/* Left logo */}
      <img src="/assets/MIT.webp" alt="MIT Logo" className="logo" />

      {/* Navigation */}
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Homepage
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/project" className="nav-link">
              Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/announcements" className="nav-link">
              Announcements
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/prizes" className="nav-link">
              Prizes
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/guidelines" className="nav-link">
              Guidelines
            </Link>
          </li>
        </ul>
      </nav>

      {/* Right logo */}
      <img src="/assets/ISE.webp" alt="ISE Logo" className="logo" />
    </header>
  );
}

export default Header;
