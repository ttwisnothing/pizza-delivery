import jwt from "jsonwebtoken";

// ฟังก์ชัน Middleware สำหรับตรวจสอบการเข้าถึงด้วย JWT
const authMiddleware = async (req, res, next) => {
  // ดึง token จาก headers
  const token = req.headers.token;

  // ตรวจสอบว่า token มีอยู่หรือไม่
  if (!token) {
    return res.status(401).json({ success: false, message: "ไม่สามารถเข้าถึงได้ โปรดเข้าสู่ระบบอีกครั้ง" });
  }

  try {
    // ยืนยัน token และถอดรหัส
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    // แนบ user ID ไปยังอ็อบเจกต์ req เพื่อใช้งานใน route ถัดไป
    req.body.userId = decodedToken.id;
    
    // ทำงานต่อไปยัง middleware หรือ route handler ถัดไป
    next();
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการตรวจสอบ token:", error);
    res.status(403).json({ success: false, message: "token ไม่ถูกต้อง" }); // ส่งสถานะ forbidden สำหรับ token ที่ไม่ถูกต้อง
  }
};

export default authMiddleware;
