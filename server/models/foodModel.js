import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true }, // ชื่อเมนู
  description: { type: String, required: true }, // คำอธิบายเมนู
  price: { type: Number, required: true }, // ราคา
  image: { type: String, required: true }, // ไฟล์ภาพอาหาร
  category: { type: String, required: true }, // หมวดหมู่
});

const foodModel = mongoose.models.food || mongoose.model("food-re", foodSchema);

export default foodModel;
