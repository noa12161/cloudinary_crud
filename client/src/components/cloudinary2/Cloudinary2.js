import "./cloud2.css";

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Posts from "./Posts";
import Uploader from "./Uploader";

const Cloudinary2 = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [postSuccess, setPostSuccess] = useState(true);
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeFile = (file) => {
    setFile(file);
  };

  const changeToFormData = (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", username);
    return formData;
  };

  // API콜 함수
  const createUserApi = async (formData) => {
    return await axios.post("/api/claudinary2", formData);
  };
  const getUserInfoApi = async () => {
    return await axios.get("/api/claudinary2");
  };
  const deleteUserApi = async (id) => {
    await axios.delete(`/api/claudinary2/${id}`);
  };
  // 유저 정보 가져오는 함수
  const fetchUserInfo = async () => {
    const res = await getUserInfoApi();
    const updatedPosts = res.data;
    console.log(updatedPosts);
    setPosts(updatedPosts);
    setPostSuccess(false);
  };

  // 파일 업로드 함수
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const formData = changeToFormData(file);
    setIsLoading(true);
    const res = await createUserApi(formData);
    setIsLoading(false);
    console.log(res.data);
    if (res.status === 200) {
      setPostSuccess(true);
    } else setPostSuccess(false);
  };

  //파일 삭제 함수
  const onDeleteForm = async (id) => {
    await deleteUserApi(id);
    await fetchUserInfo();
  };

  useEffect(() => {
    if (!postSuccess) return;
    fetchUserInfo();
  }, [postSuccess]);

  return (
    <div className="cloudinary2_container">
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <Uploader
          onChangeFile={onChangeFile}
          onSubmitForm={onSubmitForm}
          setUsername={setUsername}
        />
      )}
      <Posts posts={posts} onDeleteForm={onDeleteForm} />
    </div>
  );
};

export default Cloudinary2;
