import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as profileActions from "../../store/profile";
import { Link, useHistory } from "react-router-dom";
import FollowButton from "../FollowButton";
import ProfilePostNav from "../ProfilePostNav";
import ProfileFeedContainer from "../ProfileFeedContainer";
import { months } from "./data";
import "./ProfilePage.css";

function ProfilePage() {
  let { username } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.session.user);
  const isSelf = profile.isSelf;
  const profilePic = profile.profilePic;
  let [month, _date, year] = new Date(profile.createdAt)
    .toLocaleDateString("en-US")
    .split("/");

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
        <div className="profile-info-container">
          <div className="profile-display-name">{profile.displayName}</div>
          <div className="profile-username">@{profile.username}</div>
          <div className="profile-join-date">
            <i className="far fa-calendar-alt" />
            <span>
              Joined {months[month - 1]} {year}
            </span>
          </div>

          <Link className="follow-container" to={`/${username}/following`}>
            {profile.following && (
              <span className="follow-number">
                {Object.keys(profile.following).length}
              </span>
            )}
            <span className="follow-text"> Following</span>
          </Link>
          <Link className="follow-container" to={`/${username}/followers`}>
            {profile.followers && (
              <span className="follow-number">
                {Object.keys(profile.followers).length}
              </span>
            )}
            <span className="follow-text"> Followers</span>
          </Link>
        </div>

        {/* <div>
          <button onClick={() => history.goBack()}>Go Back</button>
        </div> */}
      </div>
      {profile && <ProfilePostNav />}
      {profile.id && <ProfileFeedContainer />}
    </div>
  );
}

export default ProfilePage;
