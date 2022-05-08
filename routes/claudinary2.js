const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Claud = require("../models/claudinary");

// /api/claudinary2 POST
router.post("/", upload.single("image"), async (req, res) => {
  console.log("below is req.file");
  console.log(req.file);
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // Create new user
    let user = new Claud({
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // Save user
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

router.get("/", async (req, res) => {
  console.log("in");
  try {
    let user = await Claud.find();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await Claud.findById(req.params.id);
    console.log(user.cloudinary_id);
    console.log(typeof user.cloudinary_id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Delete user from db
    await user.remove();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let user = await Claud.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const data = {
      name: req.body.name || user.name,
      avatar: result.secure_url || user.avatar,
      cloudinary_id: result.public_id || user.cloudinary_id,
    };
    user = await Claud.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
