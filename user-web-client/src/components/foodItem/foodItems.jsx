import React, { useContext } from "react";
import "./foodItems.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/storeContext";

const FoodItems = ({ id, name, price, description, image }) => {
  const { cartItem, addToCart, removeFromCart, url } = useContext(StoreContext);

  const handleAddToCart = () => {
    addToCart(id);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={`${url}/images/${image}`}
          alt={`${name}`}
        />
        {!cartItem[id] ? (
          <img
            className="add"
            onClick={handleAddToCart}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={handleRemoveFromCart}
              src={assets.remove_icon_red}
              alt="Remove from cart"
            />
            <p>{cartItem[id]}</p>
            <img
              onClick={handleAddToCart}
              src={assets.add_icon_green}
              alt="Add more to cart"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItems;
