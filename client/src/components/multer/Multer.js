import { useState, useEffect } from "react";
import axios from "axios";
import PostsFromMulter from "./PostsFromMulter";

const Multer = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    birthdate: "",
    photo: "",
  });

  const [posts, setPosts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // FormData() 생성자(Constructor)는 새로운 FormData객체를 만듭니다.
    // formData.append('key', value) 로 formData에 데이터 추가 가능
    const formData = new FormData();
    formData.append("photo", newUser.photo);
    formData.append("birthdate", newUser.birthdate);
    formData.append("name", newUser.name);

    axios
      .post("/users/add", formData)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const handlePhoto = (e) => {
    console.log(e.target.files);
    setNewUser({ ...newUser, photo: e.target.files[0] });
  };
  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("/users");
        console.log(res.data);
        setPosts(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getPosts();
  }, []);

  useEffect(() => {
    console.log(newUser);
  }, [newUser]);
  return (
    <div>
      <div className="form_container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="photo"
            onChange={handlePhoto}
          />
          <input
            type="text"
            placeholder="name"
            name="name"
            value={newUser.name}
            onChange={handleChange}
          />
          <input
            type="date"
            name="birthdate"
            value={newUser.date}
            onChange={handleChange}
          />
          <input type="submit" />
        </form>
      </div>
      {/* <div className="posts_continer">
        <PostsFromMulter posts={posts} />
      </div> */}
    </div>
  );
};

export default Multer;
