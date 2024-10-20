import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  listOrder,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js";

// สร้าง Router สำหรับจัดการคำสั่งซื้อ
const orderRouter = express.Router();

// เส้นทางสำหรับผู้ใช้และผู้ดูแลระบบ พร้อมกับการตรวจสอบสิทธิ์ที่จำเป็น
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrder); // (Admin)
orderRouter.post("/status", updateStatus); // (Admin)

export default orderRouter;
