import { useSelector, useDispatch } from "react-redux";
import "./FollowButton.css";
import { addFollower, removeFollower } from "../../store/profile";

function FollowButton() {
  const user = useSelector((state) => state.session.user);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const clickHandler = (e) => {
    if (profile.isFollowing) {
      dispatch(removeFollower(profile.username, user.id, profile.id));
    } else {
      dispatch(addFollower(profile.username, user.id, profile.id));
    }
  };

  const onHover = (event) => {
    event.target.textContent = "Unfollow";
  };
  const offHover = (event) => {
    event.target.textContent = "Following";
  };

  return (
    <button
      className={profile.isFollowing ? "unfollow-button" : "follow-button"}
      onMouseOver={profile.isFollowing ? (event) => onHover(event) : undefined}
      onMouseOut={profile.isFollowing ? (event) => offHover(event) : undefined}
      onClick={clickHandler}
    >
      {profile.isFollowing ? "Following" : "Follow"}
    </button>
  );
}

export default FollowButton;
