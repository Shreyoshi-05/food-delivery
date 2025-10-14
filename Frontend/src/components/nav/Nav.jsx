import React, { useState } from "react";
import "./Nav.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UseAppContext } from "../context/AppContext";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { FaCartShopping } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { IoBagCheck } from "react-icons/io5";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setPopupOpen, token, setToken } = UseAppContext();
  const [openAvatar, setOpenAvatar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate

  // Function to check active route
  const isActive = (path) => location.pathname === path;

  return (
    <div className="nav">
      {/* Logo */}
      <div className="logo">
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
        <h1 className="logo-text">Tomato</h1>
      </div>

      {/* Middle Links */}
      <div className={`midd ${menuOpen ? "open" : ""}`}>
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          style={{ color: isActive("/") ? "#ff5733" : "#333" }}
        >
          Home
        </Link>
        <Link
          to="/about"
          onClick={() => setMenuOpen(false)}
          style={{ color: isActive("/about") ? "#ff5733" : "#333" }}
        >
          About
        </Link>
        <Link
          to="/contact"
          onClick={() => setMenuOpen(false)}
          style={{ color: isActive("/contact") ? "#ff5733" : "#333" }}
        >
          Contact Us
        </Link>
      </div>

      {/* Right Side */}
      <div className="last">
        {token ? (
          <div className="avter">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Link to="/cart">
                <FaCartShopping
                  size={25}
                  style={{
                    color: isActive("/cart") ? "#ff5733" : "#333",
                    cursor: "pointer",
                  }}
                />
              </Link>
              <img
                src="/ad.jpg"
                onClick={() => setOpenAvatar(!openAvatar)}
                className="av_img"
                alt="Profile"
              />
            </div>

            {openAvatar && (
              <div className="dropdown">
                <Link to="/showorders">
                  <IoBagCheck />
                  <p>Orders</p>
                </Link>
                <div onClick={() => setToken("")}>
                  <MdLogout />
                  <p>Log Out</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setPopupOpen(true)}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Nav;
