import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import "dotenv/config.js";

// กำหนดค่าตั้งต้นของแอปพลิเคชัน
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// เชื่อมต่อฐานข้อมูล
connectDB();

// กำหนด API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// เส้นทางหลัก
app.get("/", (req, res) => {
  res.send("API Working");
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`); // แสดงข้อความเมื่อเซิร์ฟเวอร์เริ่มทำงาน
});
