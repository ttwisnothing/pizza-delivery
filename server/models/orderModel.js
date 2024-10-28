import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ID ของผู้ใช้
  items: { type: Array, required: true }, // รายการสินค้าที่สั่งซื้อ
  amount: { type: Number, required: true }, // จำนวนเงินรวม
  address: { type: Object, required: true }, // ที่อยู่สำหรับการจัดส่ง
  status: { type: String, default: "Food Processing" }, // สถานะคำสั่งซื้อ
  date: { type: Date, default: Date.now }, // วันที่และเวลาที่สร้างคำสั่งซื้อ
  payment: { type: Boolean, default: false }, // สถานะการชำระเงิน
});

const orderModel =
  mongoose.models.order || mongoose.model("order-re", orderSchema);

export default orderModel;
