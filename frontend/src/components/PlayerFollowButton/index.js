import "./PlayerFollowButton.css";
import { useDispatch } from "react-redux";
import { addPlayerFollow, removePlayerFollow } from "../../store/session";
import { useSelector } from "react-redux";
import { useState } from "react";

function PlayerFollowButton({ player }) {
  const followedPlayers = useSelector((state) => state.session.followedPlayers);
  const user = useSelector((state) => state.session.user);
  const [followed, setFollowed] = useState(
    followedPlayers[player.id] !== undefined
  );
  const dispatch = useDispatch();
  const onHover = (event) => {
    event.target.textContent = "Unfollow";
  };
  const offHover = (event) => {
    event.target.textContent = "Following";
  };

  const clickHandler = (e) => {
    if (followed) {
      dispatch(removePlayerFollow(user.id, player.id));
      setFollowed(false);
    } else {
      dispatch(addPlayerFollow(user.id, player.id));
      setFollowed(true);
    }
  };
  return (
    <button
      className={
        followed
          ? "player-follow-button unfollow-button"
          : "player-follow-button follow-button"
      }
      onMouseOver={followed ? (event) => onHover(event) : undefined}
      onMouseOut={followed ? (event) => offHover(event) : undefined}
      onClick={clickHandler}
    >
      {followed ? "Following" : "Follow"}
    </button>
  );
}

export default PlayerFollowButton;
