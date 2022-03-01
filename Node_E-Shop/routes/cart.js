const router = require("express").Router();
const Cart = require("../models/Cart");

//POST cart
router.post("/", async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET cart
router.get("/find/:user_id", async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.params.user_id });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET carts
router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE cart
router.delete("/find/:user_id", async (req, res) => {
  try {
    await Cart.deleteOne({ user_id: req.params.user_id });
    res.status(200).json("Cart has been deleted successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE cart
router.put("/find/:user_id", async (req, res) => {
  try {
    const updatedCart = await Cart.update(
      { user_id: req.params.user_id },
      {
        $push: {
          products: req.body,
        },
        $inc: {
          total: req.body.total,
        },
      }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
