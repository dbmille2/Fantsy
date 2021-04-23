import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import NewPost from "../NewPost";
import PostModal from "../PostModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [isPostOpen, setIsPostOpen] = useState(false);
  let navLinks;
  let sessionLinks;
  let postModalButton = (
    <button onClick={() => setIsPostOpen(true)} className="post-modal-button">
      Post
    </button>
  );
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
        <PostModal open={isPostOpen} onClose={() => setIsPostOpen(false)}>
          <NewPost modal={true} onClose={() => setIsPostOpen(false)}/>
        </PostModal>
      </div>
    </div>
  );
}

export default Navigation;
