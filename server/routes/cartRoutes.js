import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

// สร้าง Router สำหรับการจัดการรถเข็น
const cartRouter = express.Router();

// กำหนดเส้นทาง API สำหรับการจัดการรถเข็น พร้อมกับ Middleware สำหรับตรวจสอบสิทธิ์
cartRouter.post("/add", authMiddleware, addToCart); // เพิ่มสินค้าในรถเข็น
cartRouter.post("/remove", authMiddleware, removeFromCart); // ลบสินค้าออกจากรถเข็น
cartRouter.post("/get", authMiddleware, getCart); // ดึงข้อมูลรถเข็นของผู้ใช้

export default cartRouter;
