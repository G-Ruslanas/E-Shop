const router = require("express").Router();
const Slide = require("../models/Slide");

//POST slide
router.post("/", async (req, res) => {
  const newSlide = new Slide(req.body);
  try {
    const savedSlide = await newSlide.save();
    res.status(200).json(savedSlide);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET slide
router.get("/find/:id", async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    res.status(200).json(slide);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET slides
router.get("/", async (req, res) => {
  try {
    const slides = await Slide.find();
    res.status(200).json(slides);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE slide
router.delete("/find/:id", async (req, res) => {
  try {
    await Slide.findByIdAndDelete(req.params.id);
    res.status(200).json("Slide has been deleted successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE slide
router.put("/find/:id", async (req, res) => {
  try {
    const updatedSlide = await Slide.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updatedSlide);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
