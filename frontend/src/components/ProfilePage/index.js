import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as profileActions from "../../store/profile";
import { Link } from "react-router-dom";
import FollowButton from "../FollowButton";
import "./ProfilePage.css";

function ProfilePage() {
  let { username } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.session.user);
  const isSelf = profile.isSelf;
  const profilePic = profile.profilePic;
  console.log(profilePic);

  useEffect(() => {
    dispatch(profileActions.fetchProfile(username, user.id));
  }, [dispatch, username, user]);

  return (
    <div>
      <div className="profile-pic-and-follow">
        {profilePic && (
          <img
            className="profile-pic"
            src={profilePic[0].imgUrl}
            alt="Profile"
          />
        )}

        {!isSelf && <FollowButton className="follow" />}
      </div>
      <p>{profile.displayName}</p>
      <p>@{profile.username}</p>

      <span>
        <Link to={`/${username}/following`}>
          {profile.following && Object.keys(profile.following).length} Following
        </Link>
      </span>
      <span>
        <Link to={`/${username}/followers`}>
          {profile.followers && Object.keys(profile.followers).length} Followers
        </Link>
      </span>
    </div>
  );
}

export default ProfilePage;
