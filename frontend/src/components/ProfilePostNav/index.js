// import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import ProfileListItem from "../ProfileListItem";
import { NavLink } from "react-router-dom";
import "./ProfilePostNav.css";

function ProfilePostNav({ fState }) {
  // const [followState, setFollowState] = useState(fState);
  // const [group, setGroup] = useState({});
  const profile = useSelector((state) => state.profile);
  // useEffect(() => {
  //   setFollowState(fState);
  // }, [fState]);
  // useEffect(() => {
  //   if (followState) {
  //     setGroup(profile.followers);
  //   } else {
  //     setGroup(profile.following);
  //   }
  // }, [followState, profile]);

  return (
    <div className="profile-nav-container">
      <div className="profile-nav-container">
        <NavLink
          className="profile-nav-option"
          to={`/${profile.username}/`}
          activeClassName="profile-active"
        >
          Posts
        </NavLink>

        <NavLink
          className="profile-nav-option"
          to={`/${profile.username}/with_replies`}
          activeClassName="profile-active"
        >
          Posts & replies
        </NavLink>
        <NavLink
          className="profile-nav-option"
          to={`/${profile.username}/with_replies`}
          activeClassName="profile-active"
        >
          Media
        </NavLink>
        <NavLink
          className="profile-nav-option"
          to={`/${profile.username}/with_replies`}
          activeClassName="profile-active"
        >
          Stars
        </NavLink>
      </div>
      {/* <ul>
        {group &&
          Object.values(group).map((profile) => (
            <li key={profile.id}>
              <ProfileListItem profile={profile} />
            </li>
          ))}
      </ul> */}
    </div>
  );
}

export default ProfilePostNav;
