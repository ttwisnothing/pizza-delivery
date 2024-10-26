import React, { useState } from "react";
import "./add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  // ฟังก์ชันจัดการการเปลี่ยนแปลงค่าในฟอร์ม
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // ฟังก์ชันส่งข้อมูลเมื่อกดปุ่ม Submit
  const onSubmitHandler = async (event) => {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้า
    try {
      const formData = new FormData(); // สร้าง FormData เพื่อรองรับการอัปโหลดรูปภาพ
      Object.entries(data).forEach(([key, value]) => formData.append(key, value)); // เติมข้อมูลทั้งหมดลงใน formData
      formData.append("image", image);

      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        toast.success(response.data.message); // แจ้งเตือนเมื่อสำเร็จ
        resetForm(); // ล้างค่าในฟอร์ม
      } else {
        toast.error(response.data.message); // แจ้งเตือนเมื่อเกิดข้อผิดพลาด
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // ฟังก์ชันรีเซ็ตฟอร์ม
  const resetForm = () => {
    setData({ name: "", description: "", price: "", category: "" });
    setImage(null);
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        {/* อัปโหลดรูปภาพ */}
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Preview"
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* ชื่อสินค้า */}
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            value={data.name}
            placeholder="Type here"
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* รายละเอียดสินค้า */}
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            value={data.description}
            rows="6"
            placeholder="Write content here"
            onChange={onChangeHandler}
            required
          ></textarea>
        </div>

        {/* หมวดหมู่และราคา */}
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category" value={data.category} onChange={onChangeHandler} required>
              <option value="" disabled>Select Category</option>
              <option value="Pizza">Pizza</option>
              <option value="Chicken">Chicken</option>
              <option value="Burger">Burger</option>
              <option value="Fries">Fries</option>
              <option value="Bread">Bread</option>
              <option value="Drink">Drink</option>
              <option value="Ice Cream">Ice Cream</option>
              <option value="Alcohol">Alcohol</option>
            </select>
          </div>

          <div className="price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              value={data.price}
              placeholder="$20"
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>

        {/* ปุ่มเพิ่มสินค้า */}
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
