import mongoose from "mongoose";
import dotenv from "dotenv";

// โหลดตัวแปรจากไฟล์ .env
dotenv.config();

// เชื่อมต่อกับ MongoDB

export const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URL;
    
    if (!url) {
      throw new Error("❌ MongoDB URI is not defined in environment variables");
    }

    await mongoose.connect(url);
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // หยุดโปรแกรมหากเชื่อมต่อไม่ได้
  }
};
