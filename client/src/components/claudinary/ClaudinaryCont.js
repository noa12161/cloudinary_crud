import axios from "axios";
import React from "react";
import { useState } from "react";

const ClaudinaryCont = () => {
  const [image, setImage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (image === "") return alert("이미지를 골라주세요..");
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "david123");
      const dataRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dcnef2k8v/image/upload",
        formData
      );
      console.log(dataRes);
      const imageUrl = dataRes.data.url;
      const submitPost = {
        image: imageUrl,
      };
      setImage("");
      await axios.post("/api/claudinary/upload", submitPost);
    } catch (err) {
      console.log(err);
    }
  }

  const deleteImg = () => {};

  return (
    <div>
      <div>
        <h2>Add Image</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            name="file"
            accept="image/*"
            id="validationFormik107"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button>제출</button>
        </form>
        <img
          onClick={deleteImg}
          style={{ width: "150px" }}
          src="http://res.cloudinary.com/dcnef2k8v/image/upload/v1651955828/images/ssyk5ltmt3nqmzdemqo5.png"
          alt="img"
        />
      </div>
    </div>
  );
};

export default ClaudinaryCont;
