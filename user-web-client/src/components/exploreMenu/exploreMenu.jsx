import React from "react";
import "./exploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      {/* หัวข้อหลักของเมนู */}
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your craving and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt={item.menu_name} // เพิ่ม alt สำหรับการเข้าถึง
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
