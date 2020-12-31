import PostInput from "../PostInput";
import { useSelector } from "react-redux";
import "./NewPost.css";
import { Link } from "react-router-dom";

function NewPost() {
  const session = useSelector((state) => state.session);
  const profilePic = session.preferences.profilePicUrl;
  return (
    <div className="new-post-container">
      <div className="pic-and-input">
        <Link to={`/${session.user.username}`}>
          <img src={profilePic} className="post-profile-pic" alt="profile" />
        </Link>
        <div className="new-post-wrapper">
          <PostInput />
        </div>
      </div>
    </div>
  );
}

export default NewPost;
