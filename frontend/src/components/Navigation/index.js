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
  let postModalButton = <button className="post-modal-button">Post</button>;
  if (sessionUser) {
    sessionLinks = (
      <div className="profile-button">
        <ProfileButton user={sessionUser} />
      </div>
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
            <i className="fas fa-home" />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/posts/explore"
            className="left-nav-option"
            activeClassName="left-nav-active"
          >
            <i className="fas fa-hashtag" />

            <span>Explore</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/notifications"
            className="left-nav-option"
            activeClassName="left-nav-active"
          >
            <i className="fas fa-bell"></i>

            <span>Notifications</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/i/saved"
            className="left-nav-option"
            activeClassName="left-nav-active"
          >
            <i className="fas fa-bookmark"></i>
            <span>Saved</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/i/team"
            className="left-nav-option"
            activeClassName="left-nav-active"
          >
            <i className="fas fa-users"></i>
            <span>My Team</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/${sessionUser.username}`}
            className="left-nav-option"
            activeClassName="left-nav-active"
          >
            <i className="fas fa-user"></i>
            <span>Profile</span>
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
          <NavLink
            exact
            to="/explore/all"
            className="left-nav-option"
            activeClassName="left-nav-active"
          >
            <i className="fas fa-hashtag" />

            <span>Explore</span>
          </NavLink>
        </li>
      </>
    );
  }

  return (
    <div className="left-nav-wrapper">
      <div className="left-nav">
        <NavLink exact to="/home" className="home-logo">
          <i className="fas fa-football-ball"></i>
        </NavLink>
        <ul className="left-nav-container">{isLoaded && navLinks}</ul>
        {isLoaded && sessionLinks}
        {isLoaded && sessionUser && postModalButton}
      </div>
    </div>
  );
}

export default Navigation;
