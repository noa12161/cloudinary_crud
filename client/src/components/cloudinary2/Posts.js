import "./cloud2.css";

import PostItem from "./PostItem";

const Posts = ({ posts, onDeleteForm }) => {
  return (
    <div className="posts_container">
      {posts &&
        posts.map((post) => (
          <PostItem
            onDeleteForm={onDeleteForm}
            post={post}
            key={post.cloudinary_id}
          />
        ))}
    </div>
  );
};

export default Posts;
