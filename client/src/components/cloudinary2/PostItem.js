import "./cloud2.css";

const PostItem = ({ post, onDeleteForm }) => {
  return (
    <div className="post_container">
      <h3 onClick={() => onDeleteForm(post._id)}>삭제하기</h3>
      <div className="post_username">{post.name}</div>
      <img src={post.avatar} alt="img" className="post_img" />
    </div>
  );
};

export default PostItem;
