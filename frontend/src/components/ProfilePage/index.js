import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as profileActions from "../../store/profile";
import { Link } from "react-router-dom";

function ProfilePage() {
  let { username } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(profileActions.fetchProfile(username));
  }, [dispatch, username]);

  return (
    <div>
      <p>Profile Pic</p>
      <p>{profile.displayName}</p>
      <p>@{profile.username}</p>
      <span>
        <Link to={`/${username}/following`}>
          {profile.following && profile.following.length} Following
        </Link>
      </span>
      <span>
        <Link to={`/${username}/followers`}>
          {profile.followers && profile.followers.length} Followers
        </Link>
      </span>
    </div>
  );
}

export default ProfilePage;
