const router = require("express").Router();
const Brand = require("../models/Brand");

//POST brand
router.post("/", async (req, res) => {
  const newBrand = new Brand(req.body);
  try {
    const savedBrand = await newBrand.save();
    res.status(200).json(savedBrand);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET brand
router.get("/find/:id", async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET brands
router.get("/", async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE brand
router.delete("/find/:id", async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.status(200).json("Brand has been deleted successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE brand
router.put("/find/:id", async (req, res) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
