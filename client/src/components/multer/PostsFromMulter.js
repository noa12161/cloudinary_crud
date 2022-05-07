const Post = ({ post }) => {
  return (
    <div className="post_container">
      <div className="post_username">{post.name}</div>
      <div className="post_birthdate">{post.birthdate}</div>
      <img
        style={{ width: "200px" }}
        src={post.photo}
        alt="img"
        className="post_photo"
      />
    </div>
  );
};

const PostsFromMulter = ({ posts }) => {
  return posts.map((post) => <Post post={post} />);
};

export default PostsFromMulter;
