require("dotenv").config();
var cors = require("cors");
const express = require("express");
const connect = require("./config/config");
const userRoute = require("./routes/user.router");
const productRoute = require("./routes/product.router")
const cartRoutes = require("./routes/cart.router");
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//To obtain get-query @uploaded-files
app.use("/uploads", express.static("uploads"));

//Routes
app.use("/user", userRoute);
app.use("/cart", cartRoutes);
app.use("/product", productRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connect();
  console.log("You listening on 8080...");
});
