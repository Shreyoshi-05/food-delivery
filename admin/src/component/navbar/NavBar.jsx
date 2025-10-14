import React from "react";
import "./navbar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="logo_div">
        <h1 class="logo">Tomato</h1>
        <p>Admin Panel</p>
      </div>

      <div className="admin">
        <img src="/adm.jpg" alt="" />
      </div>
      
    </div>
  );
};

export default NavBar;
