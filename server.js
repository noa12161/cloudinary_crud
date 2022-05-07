const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

const app = express();
require("dotenv").config();

const port = process.env.PORT || 5000;
// default limit is 100kb
// filebase64로 이미지 전송시 크기가 크므로 limit 확장...
app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(cors());
app.unsubscribe(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri).then(console.log("connected to DB"));

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`listening at port${port}`);
});
