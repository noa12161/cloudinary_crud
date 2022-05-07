import "./css/posts.css";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await axios.get("/posts/posts");
        if (posts.status !== 201) return alert("err");
        setPosts(posts.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="posts_container">
      {posts &&
        posts.map((p) => (
          <div className="post_container">
            <div className="post_box">
              <div className="post_creator">{p.creator}</div>
              <div className="post_title">{p.title}</div>
              <div className="post_image_container">
                <img
                  src={p.selectedFile}
                  alt="postImage"
                  className="post_img"
                />
              </div>
              <div className="post_message">{p.message}</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Posts;
