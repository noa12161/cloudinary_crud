# cloudinary

> 파일을 로컬로 저장하지 않고 클라우드상에 저장할때 사용 </br>
> 나의 경우 사용자가 이미지를 업로드 하면 cloudinary에 이미지를 저장하고 </br>
> 저장된 이미지의 url을 mongoDB에 저장하는 방식으로 사용했다.

- 사용 라이브러리
  - express
  - body-parser
  - cloudinary
  - dotenv
  - cors
  - mongoose
  - multer

<br>
<br>
<br>

- ## clodinary 설정

```javascript
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;
```

- ## multer 설정

```javascript
const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
```

- ## 라우터에서 사용 CRUD 예시

```javascript
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
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
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
```

[참고 링크] (https://dev.to/itsmefarhan/cloudinary-files-images-crud-operations-with-nodejs-express-multer-2147)
