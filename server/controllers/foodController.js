import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food function
const addFood = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Image is required" });
  }

  const imageFilename = req.file.filename;

  // สร้างอ็อบเจกต์ food ใหม่
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: imageFilename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food added successfully" });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: "Error adding food" });
  }
};

// List food function
const listFood = async (req, res) => {
  try {
    // ค้นหาทุก food จากฐานข้อมูล
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("Error fetching food list:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching food list" });
  }
};

// Remove food function
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    // ลบไฟล์ภาพจากเซิร์ฟเวอร์
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      }
    });

    // ลบ food จากฐานข้อมูล
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    console.error("Error removing food:", error);
    res.status(500).json({ success: false, message: "Error removing food" });
  }
};

export { addFood, listFood, removeFood };
