// controllers/cart.controller.js

const Cart = require("../models/cart.model");

exports.getCart = async (req, res) => {
  const { _id } = req.user;
  try {
    const cart = await Cart.find({ user: _id }).populate("productId").lean().exec();
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { _id } = req.user;
    const item = req.body;

    let cart = await Cart.findOneAndUpdate(
      { user: _id, productId: item.productId },
      { quantity: item.quantity },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};


exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user
    console.log("userId", userId)
    const productId = req.params.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ success: false, error: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
