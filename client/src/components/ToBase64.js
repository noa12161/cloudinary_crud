import "./css/toBase64.css";
import axios from "axios";
import React from "react";
import { useState } from "react";

/*
  // server
    const { creator, title, message, selectedFile, fileName } = req.body;
  //front
  파일선택
  onChange => uploadImage
  => convertBase64(file) => fileReader.readAsDataURL(file) => fileReader.result
  =>fetch(url, {..., selectedFile:fileReader.result(base64)})
*/

/*
  uploadImage -> convertBase64 -> setPostForm, setBaseImg
  -> onSubmitForm -> setPostForm('')
*/
const ToBase64 = () => {
  // 서버에 보낼 양식
  const [postForm, setPostForm] = useState({
    creator: "",
    title: "",
    message: "",
    selectedFile: "",
    fileName: "",
  });
  //미리보기용 사진
  const [baseImg, setBaseImg] = useState(null);

  // 파일명 + base64 url 로 변환된 사진
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const fileName = file.name + Date.now();
    const base64 = await convertBase64(file);
    setPostForm({
      ...postForm,
      fileName,
      selectedFile: base64,
    });

    setBaseImg(base64);
  };

  // return fileReader.readAsDataURL(file)
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        console.log(fileReader.result);
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  // 서버에 양식 전송.
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const res = await axios.post("/posts/post", postForm);
    console.log(res);
    setPostForm({
      creator: "",
      title: "",
      message: "",
      selectedFile: "",
      fileName: "",
    });
  };
  return (
    <div className="tobase64_container">
      <form className="form_container" onSubmit={onSubmitForm}>
        <input
          placeholder="작성자..."
          className="creator_input border-b"
          type="text"
          value={postForm.creator}
          onChange={(e) =>
            setPostForm({ ...postForm, creator: e.target.value })
          }
        />
        <input
          placeholder="제목..."
          className="title_input"
          type="text"
          value={postForm.title}
          onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
        />
        <textarea
          placeholder="내용..."
          className="message_input"
          type="text"
          value={postForm.message}
          onChange={(e) =>
            setPostForm({ ...postForm, message: e.target.value })
          }
        />
        <label className="file_input_label" htmlFor="input-file">
          사진 추가
        </label>
        <input
          id="input-file"
          className="file_input"
          type="file"
          accept="image/*"
          onChange={(e) => uploadImage(e)}
        />
        <button className="button_input">확인</button>
      </form>
      {baseImg && (
        <div style={{ width: "200px", height: "300px" }}>
          <img
            src={baseImg}
            alt="img"
            style={{ width: "100%", objectFit: "fill", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default ToBase64;
