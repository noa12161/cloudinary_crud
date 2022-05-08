import "./cloud2.css";

const Uploader = ({ onChangeFile, onSubmitForm, setUsername }) => {
  return (
    <div className="uploader_container">
      <form className="uploader_form" onSubmit={onSubmitForm}>
        <input
          className="uploader_username_input"
          type="text"
          placeholder="username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="uploader_file_input"
          type="file"
          accept="image"
          onChange={(e) => onChangeFile(e.target.files[0])}
        />
        <button>확인</button>
      </form>
    </div>
  );
};

export default Uploader;
