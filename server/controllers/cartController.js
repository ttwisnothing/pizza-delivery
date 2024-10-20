import userModel from "../models/userModel.js";

// Function to add an item to the user's cart
const addToCart = async (req, res) => {
  try {
    // ค้นหาข้อมูลผู้ใช้จาก userId
    const userData = await userModel.findById(req.body.userId);
    
    // ตรวจสอบว่าผู้ใช้มีข้อมูลใน cartData หรือไม่
    let cartData = userData.cartData || {};
    
    // เพิ่มจำนวนสินค้าหรือสร้างรายการใหม่
    cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;
    
    // อัปเดตข้อมูล cartData ในฐานข้อมูล
    await userModel.findByIdAndUpdate(req.body.userId, { cartData }, { new: true });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Function to remove an item from the user's cart
const removeFromCart = async (req, res) => {
  try {
    // ค้นหาข้อมูลผู้ใช้จาก userId
    const userData = await userModel.findById(req.body.userId);
    
    // ตรวจสอบว่าผู้ใช้มีข้อมูลใน cartData หรือไม่
    let cartData = userData.cartData || {};
    
    // ตรวจสอบและลดจำนวนสินค้าหรือกำจัดรายการออก
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }
    }
    
    // อัปเดตข้อมูล cartData ในฐานข้อมูล
    await userModel.findByIdAndUpdate(req.body.userId, { cartData }, { new: true });

    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Function to fetch the user's cart data
const getCart = async (req, res) => {
  try {
    // ค้นหาข้อมูลผู้ใช้จาก userId
    const userData = await userModel.findById(req.body.userId);
    
    // ตรวจสอบว่าผู้ใช้มีข้อมูลใน cartData หรือไม่
    const cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addToCart, removeFromCart, getCart };
