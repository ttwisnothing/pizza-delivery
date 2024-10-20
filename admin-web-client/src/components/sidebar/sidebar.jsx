import React from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

// สร้างคอมโพเนนต์ Sidebar
const Sidebar = () => {
  const renderOption = (to, icon, label) => (
    <NavLink to={to} className="sidebar-option">
      <img src={icon} alt={label} />
      <p>{label}</p>
    </NavLink>
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-options">
        {renderOption("/add", assets.add_icon, "Add Items")}
        {renderOption("/list", assets.order_icon, "List Items")}
        {renderOption("/orders", assets.order_icon, "Orders")}
      </div>
    </aside>
  );
};

// ส่งออก Sidebar เพื่อให้ใช้ในส่วนอื่นได้
export default Sidebar;
