import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import axios from "axios";

const Form = () => {
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
  const [resImg, setResImg] = useState(null);

  const createPost = (newPost) => axios.post("/posts/post", newPost);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createPost(postData);
    console.log(res);
    setResImg(res.data.selectedFile);
    setPostData(initPostForm);
  };
  useEffect(() => {
    console.log(postData);
  }, [postData]);
  return (
    <div className="form_container">
      <form
        autoComplete="off"
        noValidate
        className="something"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="creator"
          name="creator"
          variant="outlined"
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <input
          placeholder="title"
          name="title"
          variant="outlined"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <input
          placeholder="message"
          name="message"
          variant="outlined"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <div className="filbase">
          <FileBase
            type="file"
            multiple={false}
            onDone={
              (props) => console.log(props)
              // setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <button>제출</button>
      </form>
      {resImg && (
        <div className="img_container" style={{ width: "200px" }}>
          <img src={resImg} alt="responseImage" style={{ width: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default Form;
