import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  let navLinks;
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
    navLinks = (
      <>
        <li>
          <NavLink
            exact
            to="/home"
            className="left-nav-option"
            activeClassName="left-nav-active"
          >
            <i class="fas fa-home" />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/explore"
            className="left-nav-option"
            activeClassName="left-nav-active"
          >
            <i class="fas fa-hashtag" />
            Explore
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/notifications"
            className="left-nav-option"
            activeClassName="left-nav-active"
          >
            <i class="fas fa-bell"></i>
            Notifications
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/saved"
            className="left-nav-option"
            activeClassName="left-nav-active"
          >
            <i class="fas fa-bookmark"></i>
            Saved
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/team"
            className="left-nav-option"
            activeClassName="left-nav-active"
          >
            <i class="fas fa-football-ball"></i>
            My Team
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to={`/${sessionUser.username}`}
            className="left-nav-option"
            activeClassName="left-nav-active"
          >
            <i class="fas fa-user"></i>
            Profile
          </NavLink>
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <LoginFormModal />
        </li>
        <li>
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
      </>
    );
    navLinks = (
      <>
        <li>
          <NavLink exact to="/explore">
            Explore
          </NavLink>
        </li>
      </>
    );
  }

  return (
    <ul className="left-nav-container">
      {isLoaded && navLinks}
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
