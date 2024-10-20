import React from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";

// สร้างคอมโพเนนต์ Navbar
const Navbar = () => {
  return (
    <nav className="navbar">
      <img className="logo" src={assets.logo} alt="Website Logo" />
      <img className="profile" src={assets.profile_image} alt="Profile" />
    </nav>
  );
};

export default Navbar;
