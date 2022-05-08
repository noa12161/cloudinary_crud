const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const claudinaryRouter = require("./routes/claudinary");
const claudinaryRouter2 = require("./routes/claudinary2");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;
console.log(PORT);

// default limit is 100kb
// filebase64로 이미지 전송시 크기가 크므로 limit 확장...
app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(cors());
app.unsubscribe(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri).then(console.log("connected to DB"));

// https://namanrivaan.medium.com/how-to-upload-an-image-with-mern-stack-a6c02e0a26b7
app.use("/api/claudinary", claudinaryRouter);
// https://dev.to/itsmefarhan/cloudinary-files-images-crud-operations-with-nodejs-express-multer-2147
app.use("/api/claudinary2", claudinaryRouter2);

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(PORT, () => console.log(`running server on ${PORT}`));
