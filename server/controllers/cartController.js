import userModel from "../models/userModel.js";

// Add to cart function
const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);

    let cartData = userData.cartData || {};

    cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(
      req.body.userId,
      { cartData },
      { new: true }
    );

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Remove from cart function
const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);

    let cartData = userData.cartData || {};

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }
    }

    await userModel.findByIdAndUpdate(
      req.body.userId,
      { cartData },
      { new: true }
    );

    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get cart data function
const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);

    const cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addToCart, removeFromCart, getCart };
