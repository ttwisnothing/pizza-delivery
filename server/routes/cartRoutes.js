import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart); // เพิ่มสินค้าในรถเข็น
cartRouter.post("/remove", authMiddleware, removeFromCart); // ลบสินค้าออกจากรถเข็น
cartRouter.post("/get", authMiddleware, getCart); // ดึงข้อมูลรถเข็นของผู้ใช้

export default cartRouter;
