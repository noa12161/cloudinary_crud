const express = require("express");
const router = express.Router();
const Post = require("../models/post");

//create
router.post("/post", async (req, res) => {
  console.log("in!!");
  const { creator, title, message, selectedFile, fileName } = req.body;
  const postData = {
    creator,
    title,
    message,
    selectedFile,
    fileName,
  };
  console.log(postData);
  try {
    const newPost = new Post({
      creator,
      title,
      message,
      selectedFile,
      fileName,
    });
    console.log(newPost);
    await newPost.save();

    res.status(201).json(newPost);
  } catch (e) {
    res.status(500).json(e);
  }
});

//get posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(201).send(posts);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
