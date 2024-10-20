import express from "express";
import multer from "multer";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";

// สร้าง Router สำหรับจัดการเมนูอาหาร
const foodRouter = express.Router();

// กำหนดการตั้งค่าการจัดเก็บไฟล์อัปโหลด
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    const timestampedName = `${Date.now()}_${file.originalname}`; // ชื่อไฟล์พร้อม Timestamp
    cb(null, timestampedName);
  },
});

const upload = multer({ storage });

// เส้นทาง API สำหรับเมนูอาหาร พร้อม Middleware สำหรับจัดการอัปโหลดรูปภาพ
foodRouter.post("/add", upload.single("image"), addFood); // เพิ่มอาหารพร้อมอัปโหลดรูป
foodRouter.get("/list", listFood); // แสดงรายการอาหารทั้งหมด
foodRouter.post("/remove", removeFood); // ลบอาหาร

export default foodRouter;
