import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as profileActions from "../../store/profile";
import { Link, useHistory } from "react-router-dom";
import FollowButton from "../FollowButton";
import ProfileFeedContainer from "../ProfileFeedContainer";
import "./ProfilePage.css";

function ProfilePage() {
  let { username } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.session.user);
  const isSelf = profile.isSelf;
  const profilePic = profile.profilePic;

  useEffect(() => {
    dispatch(profileActions.fetchProfile(username, user.id));
  }, [dispatch, username, user]);

  return (
    <div className="full-profile-page">
      <div className="profile-heading">
        <img className="banner" src={profile.banner} alt="banner" />

        <div className="profile-pic-and-follow">
          {profilePic && (
            <img className="profile-pic" src={profilePic} alt="Profile" />
          )}

          {!isSelf && <FollowButton className="follow" />}
        </div>
        <p>{profile.displayName}</p>
        <p>@{profile.username}</p>

        <span>
          <Link to={`/${username}/following`}>
            {profile.following && Object.keys(profile.following).length}{" "}
            Following
          </Link>
        </span>
        <span>
          <Link to={`/${username}/followers`}>
            {profile.followers && Object.keys(profile.followers).length}{" "}
            Followers
          </Link>
        </span>
        <div>
          <button onClick={() => history.goBack()}>Go Back</button>
        </div>
      </div>
      <div className="profile-nav-container"></div>
      {profile.id && <ProfileFeedContainer />}
    </div>
  );
}

export default ProfilePage;
