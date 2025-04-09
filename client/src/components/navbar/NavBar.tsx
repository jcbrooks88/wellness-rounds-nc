import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LogoutButton from "../login/LogoutButton";
import "../../App.css"; 

const NavBar: React.FC = () => {
  const { user } = useContext(AuthContext)!;

  return (
    <nav className="navbar">

      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/about" className="navbar-link">
            About
          </Link>
        </li>

        {user ? (
          <>
            <li className="navbar-item">
              <Link to="/dashboard" className="navbar-link">
                Dashboard
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/profile" className="navbar-link">
                Profile
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/contact" className="navbar-link">
                Contact Us
              </Link>
            </li>
            <li className="navbar-item">
              <LogoutButton />
            </li>
          </>
        ) : (
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
