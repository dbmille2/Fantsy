import PostInput from "../PostInput";
import { useSelector } from "react-redux";
import "./NewPost.css";
import { Link } from "react-router-dom";

function NewPost({ modal, onClose }) {
  const session = useSelector((state) => state.session);
  const profilePic = session.preferences.profilePicUrl;
  return (
    <div
      className={
        modal
          ? "new-post-container new-post-container-modal"
          : "new-post-container"
      }
    >
      <div className="pic-and-input">
        <Link to={`/${session.user.username}`}>
          <img
            src={profilePic}
            className={
              modal ? "post-profile-pic profil-pic-modal" : "post-profile-pic"
            }
            alt="profile"
          />
        </Link>
        <div className="new-post-wrapper">
          <PostInput modal={modal} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}

export default NewPost;
