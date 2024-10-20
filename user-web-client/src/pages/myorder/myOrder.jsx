import React, { useState, useContext, useEffect } from "react";
import "./myOrder.css";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrder = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // สถานะการโหลด
  const [error, setError] = useState(null); // สถานะข้อผิดพลาด

  const fetchOrder = async () => {
    setLoading(true); // เริ่มต้นการโหลด
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (err) {
      setError("Failed to fetch orders. Please try again later."); // ตั้งค่าข้อผิดพลาด
    } finally {
      setLoading(false); // หยุดการโหลด
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>; // แสดงข้อความขณะโหลด
  }

  if (error) {
    return <div>{error}</div>; // แสดงข้อความข้อผิดพลาด
  }

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          data.map((order, index) => (
            <div key={index} className="my-order-orders">
              <img src={assets.parcel_icon} alt="Parcel" />
              <p>
                {order.items.map((item, index) => (
                  <span key={index}>
                    {item.name} x {item.quantity}
                    {index < order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf; </span>
                <b>{order.status}</b>
              </p>
              <button onClick={fetchOrder}>Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrder;
