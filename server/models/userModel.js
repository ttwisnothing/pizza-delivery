import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // ชื่อผู้ใช้
    email: { type: String, required: true, unique: true }, // อีเมล (ไม่ซ้ำกัน)
    password: { type: String, required: true }, // รหัสผ่าน
    cartData: { type: Object, default: {} }, // ข้อมูลตะกร้า
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user-re", userSchema);

export default userModel;
