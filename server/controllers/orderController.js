import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Function to place an order
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    // สร้างอ็อบเจกต์ order ใหม่
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    // เคลียร์ cartData ของผู้ใช้
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // สร้างรายการ line_items สำหรับ Stripe
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        // ใช้ Math.round() เพื่อให้แน่ใจว่าเป็นจำนวนเต็ม
        unit_amount: Math.round(item.price * 100 * 80), // ปรับให้เป็นจำนวนเต็ม
      },
      quantity: item.quantity,
    }));

    // เพิ่มค่าขนส่ง
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: Math.round(2 * 100 * 80), // ปรับให้เป็นจำนวนเต็ม
      },
      quantity: 1,
    });

    // สร้าง session สำหรับการชำระเงิน
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Function to verify the order payment status
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error verifying order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Function to get user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Function to list all orders for admin
const listOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching order list:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Function to update the status of an order
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrder, updateStatus };