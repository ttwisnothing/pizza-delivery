import React, { useState, useEffect } from "react";
import "./order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets.js";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]); // สร้าง state สำหรับเก็บรายการสั่งซื้อ

  // ฟังก์ชันสำหรับดึงข้อมูลการสั่งซื้อทั้งหมด
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("ERROR"); // แสดงข้อความผิดพลาด
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to fetch orders"); // แสดงข้อความผิดพลาดกรณีเกิดข้อผิดพลาด
    }
  };

  // ฟังก์ชันสำหรับจัดการสถานะการสั่งซื้อ
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders(); // รีเฟรชข้อมูลรายการสั่งซื้อ
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Failed to update order status"); // แสดงข้อความผิดพลาดกรณีเกิดข้อผิดพลาด
    }
  };

  // ใช้ useEffect เพื่อดึงข้อมูลเมื่อ component ถูก mount
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="Order icon" />
            <div>
              {/* แสดงรายการอาหารที่สั่ง */}
              <p className="order-item-food">
                {order.items.map((item, index) => (
                  // ใช้ join เพื่อแสดงรายการอาหาร
                  <span key={index}>
                    {item.name} x {item.quantity}
                    {index < order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              {/* แสดงชื่อผู้สั่ง */}
              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>
              {/* แสดงที่อยู่ */}
              <div className="order-item-address">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </p>
              </div>
              {/* แสดงหมายเลขโทรศัพท์ */}
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            {/* Dropdown สำหรับเลือกสถานะการสั่งซื้อ */}
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
