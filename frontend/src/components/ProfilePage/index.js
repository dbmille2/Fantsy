import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as profileActions from "../../store/profile";
import { Link } from "react-router-dom";

function ProfilePage() {
  let { username } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.session.user);
  const isFollowing = profile.isFollowing;
  const isSelf = profile.isSelf;

  useEffect(() => {
    dispatch(profileActions.fetchProfile(username, user.id));
  }, [dispatch, username, user]);

  useEffect(() => {
    // dispatch(profileActions.checkFollowing(user))
  }, []);

  return (
    <div>
      <p>Profile Pic</p>
      <p>{profile.displayName}</p>
      <p>@{profile.username}</p>
      {!isSelf && (isFollowing ? <div>Unfollow</div> : <div>Follow</div>)}
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
