const Product = require("../models/product.model");
const Cart = require("../models/cart.model");

exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, rating, quantity, description } = req.body;

    if (!req.file) {
      return res.status(400).send({ success: false, message: "Image file is required" });
    }

    const imagePath = req.file.path;

    const product = new Product({
      name,
      category,
      price,
      rating,
      quantity,
      image: imagePath,
      description,
    });

    await product.save();

    return res.status(201).send({ success: true, data: product });
  } catch (error) {
    console.error("Error creating product:", error.message);
    return res.status(500).send({ success: false, message: "Server error", error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().lean().exec();
    return res.status(200).send({ success: true, data: products });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error);
  }
};

exports.topRatedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        '$match': {
          'rating': {
            '$gte': 4
          }
        }
      }, {
        '$limit': 4
      }
    ]);
    return res.status(200).send({ success: true, data: products });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error);
  }
};

exports.getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId).lean().exec();
    if (!product) {
      return res.status(404).send({ success: false, message: "Product not found" });
    }
    return res.status(200).send({ success: true, data: product });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error);
  }
};

exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, category, price, rating, quantity, image, description } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, category, price, rating, quantity, image, description },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).send({ success: false, message: "Product not found" });
    }
    return res.status(200).send({ success: true, data: updatedProduct });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error);
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).send({ success: false, message: "Product not found" });
    }
    return res.status(200).send({ success: true, data: deletedProduct });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error);
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const products = await Cart.aggregate([
      {
        '$lookup': {
          'from': 'users',
          'localField': 'userId',
          'foreignField': '_id',
          'as': 'userDetails'
        }
      }, {
        '$unwind': {
          'path': '$userDetails'
        }
      }, {
        '$lookup': {
          'from': 'products',
          'localField': 'productId',
          'foreignField': '_id',
          'as': 'productDetails'
        }
      }, {
        '$unwind': {
          'path': '$productDetails'
        }
      }, {
        '$project': {
          'productName': '$productDetails.name',
          'productPrice': '$productDetails.price',
          'quantity': 1,
          'userName': '$userDetails.username',
          'userEmail': '$userDetails.email',
          'mobileNumber': '$userDetails.mobileNumber'
        }
      }
    ])

    return res.status(200).send({ success: true, data: products });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error);
  }
};