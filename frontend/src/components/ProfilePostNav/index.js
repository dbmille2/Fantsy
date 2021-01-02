// import { useState, useEffect } from "react";
import { useSelector} from "react-redux";
// import ProfileListItem from "../ProfileListItem";
import { NavLink } from "react-router-dom";
import "./ProfilePostNav.css";

function ProfilePostNav({ fState }) {
  
  const profile = useSelector((state) => state.profile);

  return (
    <div className="profile-nav-container">
      <div className="profile-nav-container">
        <NavLink
          exact
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
          to={`/${profile.username}/media`}
          activeClassName="profile-active"
        >
          Media
        </NavLink>
        <NavLink
          className="profile-nav-option"
          to={`/${profile.username}/likes`}
          activeClassName="profile-active"
        >
          Likes
        </NavLink>
      </div>
    </div>
  );
}

export default ProfilePostNav;
