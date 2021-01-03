import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileListItem from "../ProfileListItem";
import { NavLink } from "react-router-dom";
import "./FollowPage.css";

function FollowPage({ fState }) {
  const [followState, setFollowState] = useState(fState);
  const [group, setGroup] = useState({});
  const profile = useSelector((state) => state.profile);
  useEffect(() => {
    setFollowState(fState);
  }, [fState]);
  useEffect(() => {
    if (followState) {
      setGroup(profile.followers);
    } else {
      setGroup(profile.following);
    }
  }, [followState, profile]);

  return (
    <div className="follow-page-container">
      <div className="follow-nav-container">
        <NavLink
          className="follow-nav-option"
          to={`/${profile.username}/followers`}
          activeClassName="follow-active"
        >
          Followers
        </NavLink>

        <NavLink
          className="follow-nav-option"
          to={`/${profile.username}/following`}
          activeClassName="follow-active"
        >
          Following
        </NavLink>
      </div>
      <ul className="followers-feed-container">
        {group &&
          Object.values(group).map((profile) => (
            <ProfileListItem profile={profile} />
          ))}
      </ul>
    </div>
  );
}

export default FollowPage;
