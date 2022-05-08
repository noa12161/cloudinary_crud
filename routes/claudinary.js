const express = require("express");
const Claudinary = require("../models/claudinary");
const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    const { image } = req.body;
    if (!image)
      return res.status(400).json({ msg: "Please enter an icon url" });

    let newImage = new Claudinary({
      image,
    });
    newImage = await newImage.save();
    res.send(newImage);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
