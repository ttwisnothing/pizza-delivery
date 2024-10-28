import React, { useContext, useEffect, useState, useCallback } from "react";
import "./placeOrder.css";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlacerOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItem, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false); // สถานะการโหลด

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true); // เริ่มต้นการโหลด

      let orderItems = food_list
        .filter((item) => cartItem[item._id] > 0)
        .map((item) => ({
          ...item,
          quantity: cartItem[item._id],
        }));

      const orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2,
      };

      console.log("Order Data: ", orderData); // สำหรับการตรวจสอบ

      try {
        const response = await axios.post(url + "/api/order/place", orderData, {
          headers: { token },
        });
        if (response.data.success) {
          window.location.replace(response.data.session_url);
        } else {
          alert("ERROR: " + response.data.message || "An error occurred");
        }
      } catch (error) {
        console.error("Error placing order:", error);
        alert("An error occurred while placing the order. Please try again.");
      } finally {
        setLoading(false); // สิ้นสุดการโหลด
      }
    },
    [data, food_list, cartItem, getTotalCartAmount, token, url]
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip Code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="submit" disabled={loading}>
            {" "}
            {/* ปิดปุ่มเมื่อกำลังโหลด */}
            {loading ? "PROCEEDING..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlacerOrder;
