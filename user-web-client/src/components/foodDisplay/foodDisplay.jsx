import React, { useContext } from "react";
import "./foodDisplay.css";
import { StoreContext } from "../../context/storeContext";
import FoodItems from "../foodItem/foodItems";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // ฟังก์ชันช่วยในการกรองรายการอาหารตามหมวดหมู่
  const filteredFoodList = food_list.filter(
    (item) => category === "All" || category === item.category
  );

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredFoodList.length > 0 ? (
          filteredFoodList.map((item) => (
            <FoodItems
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p>No items available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
