const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  creator: String,
  title: String,
  message: String,
  selectedFile: String,
  fileName: String,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
