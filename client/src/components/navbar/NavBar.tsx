import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LogoutButton from "../login/LogoutButton";

const NavBar: React.FC = () => {
  const { user } = useContext(AuthContext)!;

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
        </li>
        <li style={liStyle}>
          <Link to="/about" style={linkStyle}>
            About
          </Link>
        </li>

        {user ? (
          <>
            <li style={liStyle}>
              <Link to="/dashboard" style={linkStyle}>
                Dashboard
              </Link>
            </li>
            <li style={liStyle}>
              <Link to="/profile" style={linkStyle}>
                Profile
              </Link>
            </li>
            <li style={liStyle}>
              <Link to="/discussion" style={linkStyle}>
                Discussions
              </Link>
            </li>
            <li style={liStyle}>
              <LogoutButton />
            </li>
          </>
        ) : (
          <li style={liStyle}>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

// Styles
const navStyle = {
  backgroundColor: "#333",
  padding: "10px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const ulStyle = {
  display: "flex",
  listStyleType: "none",
  margin: 0,
  padding: 0,
};

const liStyle = {
  margin: "0 15px",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "18px",
};

export default NavBar;
