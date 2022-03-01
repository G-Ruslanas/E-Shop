const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRouter = require("./routes/product");
const brandRouter = require("./routes/brand");
const slideRouter = require("./routes/slide");
const cartRouter = require("./routes/cart");
const stripeRouter = require("./routes/stripe");

mongoose
  .connect(
    "mongodb+srv://Ruslanas:raHNTxsUDbjytvP6@cluster0.bfmig.mongodb.net/baigiamasis?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connection Successfully"))
  .catch((error) => console.log(error));

app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/brands", brandRouter);
app.use("/api/slides", slideRouter);
app.use("/api/cart", cartRouter);
app.use("/api/stripe", stripeRouter);

app.listen(5000, () => {
  console.log("Backend server is running on port 5000!");
});
