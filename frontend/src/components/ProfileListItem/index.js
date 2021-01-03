import { Link } from "react-router-dom";
import "./ProfileListItem.css";
function ProfileListItem({ profile }) {
  return (
    <div className={`follower-card`}>
      <Link className="follower-card-link" to={`/${profile.username}`}>
        <div className="follower-card-info">
          <img
            className="follower-card-pic"
            src={profile.UserPreference.profilePicUrl}
            alt="profile-pic"
          />

          <div className="follower-card-text">
            <div className="follower-card-text-name">{profile.displayName}</div>
            <div className="follower-card-text-username">
              @{profile.username}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProfileListItem;
