import PostInput from "../PostInput";
import PostButton from "../PostButton";
import { useSelector } from "react-redux";
import "./NewPost.css";

function NewPost() {
  const session = useSelector((state) => state.session);
  const profilePic = session.preferences.profilePicUrl;
  return (
    <div className="new-post-container">
      <div className="pic-and-input">
        <img src={profilePic} className="post-profile-pic" alt="profile" />
        <PostInput />
      </div>
      <div className="new-post-buttons">
        <div className="util-buttons">UtilButtonsPlaceholder</div>
        <PostButton />
      </div>
    </div>
  );
}

export default NewPost;
