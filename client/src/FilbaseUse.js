import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import axios from "axios";

const url = "http://localhost:5000/posts";

const FilbaseUse = () => {
  const initPostForm = {
    creator: "",
    title: "",
    message: "",
    selectedFile: "",
  };
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    selectedFile: "",
  });

  const createPost = (newPost) => axios.post(url, newPost);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createPost(postData);
    console.log(res);
    setPostData(initPostForm);
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className="something"
      onSubmit={handleSubmit}
    >
      <input
        name="creator"
        variant="outlined"
        value={postData.creator}
        onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
      />
      <input
        name="title"
        variant="outlined"
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
      <input
        name="message"
        variant="outlined"
        value={postData.message}
        onChange={(e) => setPostData({ ...postData, message: e.target.value })}
      />
      <div className="filbase">
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setPostData({ ...postData, selectedFile: base64 })
          }
        />
      </div>
    </form>
  );
};

export default FilbaseUse;
