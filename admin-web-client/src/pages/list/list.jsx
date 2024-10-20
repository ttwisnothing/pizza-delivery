import React, { useEffect, useState, useCallback } from "react";
import "./list.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  // ใช้ useCallback เพื่อป้องกันการสร้างฟังก์ชันใหม่ซ้ำๆ ในทุกการ render
  const fetchList = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch the food list.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching the list.");
    }
  }, [url]);

  // ฟังก์ชันลบอาหาร พร้อมเรียก fetchList อีกครั้งหลังลบ
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // เรียกฟังก์ชันเพื่ออัปเดตข้อมูล
      } else {
        toast.error("Failed to remove the item.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while removing the item.");
    }
  };

  // ใช้ useEffect เพื่อดึงข้อมูลครั้งแรกเมื่อ component ถูก mount
  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <div className="list-container flex-col">
      <h2>All Food List</h2>
      <div className="list-table">
        {/* หัวตาราง */}
        <div className="list-header">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* แสดงรายการอาหาร */}
        {list.map((item) => (
          <div key={item._id} className="list-row">
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <button onClick={() => removeFood(item._id)} className="remove-btn">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
