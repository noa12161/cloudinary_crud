const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const User = require("../models/users");

console.log(path.dirname(__dirname));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("from multer req.body");
    console.log(req.body);
    // ./ === server 루트 디렉토리
    // / === c:\
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      // 파일이름+날짜(ms단위)
      file.originalname.split(".")[0] +
        Date.now() +
        // .jpg, .png ... 확장자
        path.extname(file.originalname)
    );
  },
});

// upload는 미들웨어다
const upload = multer({ storage });

// /users/add POST
router.post("/add", upload.single("photo"), (req, res) => {
  console.log("endPoint req.body");
  console.log(req.body);
  console.log(req.file);
  const name = req.body.name;
  const birthdate = req.body.birthdate;
  const photo = req.file.path;

  const newUserData = {
    name,
    birthdate,
    photo,
  };
  const newUser = new User(newUserData);

  newUser
    .save()
    .then(() => res.json("User Added"))
    .catch((e) => res.status(400).json(e));
});

// /users GET
router.get("/", async (req, res) => {
  try {
    const posts = await User.find({});
    res.status(200).send(posts);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

router.get("/rec", (req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((e) => res.status(400).json(e));
});

module.exports = router;
