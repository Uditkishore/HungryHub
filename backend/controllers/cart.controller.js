// controllers/cart.controller.js

const Cart = require("../models/cart.model");

exports.getCart = async (req, res) => {
  const userId = req.user;
  try {
    const cart = await Cart.find({ userId: userId }).populate("productId").lean().exec();
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user;
    const item = req.body;

    let cart = await Cart.findOneAndUpdate(
      { userId: userId, productId: item.productId },
      { quantity: item.quantity },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};


exports.updateCart = async (req, res) => {
  try {
    const item = req.body;

    const updatedCart = await Cart.findByIdAndUpdate(
      { _id: item.productId },
      { quantity: item.quantity },
    );

    console.log("updateCart", updatedCart);

    if (!updatedCart) {
      return res.status(404).json({ success: false, error: "Cart item not found" });
    }

    res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};



exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user
    const productId = req.params.id;

    const cart = await Cart.findByIdAndDelete({_id : productId})

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
