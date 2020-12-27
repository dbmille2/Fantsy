import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as followActions from "../../store/follows";
import * as playerActions from "../../store/players";

function ProfilePage() {
  let { username } = useParams();
  const dispatch = useDispatch();
  const follows = useSelector((state) => state.follows);

  useEffect(() => {
    dispatch(followActions.fetchFollowers(username));
    dispatch(followActions.fetchFollowing(username));
    dispatch(playerActions.fetchFollowedPlayers(username));
  }, [dispatch, username]);

  return (
    <div>
      <h1>Followers</h1>
      <ul>
        {follows.followers &&
          follows.followers.map((follower) => (
            <li key={follower.id}>{follower.displayName}</li>
          ))}
      </ul>
      <h1>Following</h1>
      <ul>
        {follows.following &&
          follows.following.map((follower) => (
            <li key={follower.id}>{follower.displayName}</li>
          ))}
      </ul>
    </div>
  );
}

export default ProfilePage;
