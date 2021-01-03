import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      {session.preferences && (
        <div className="user-profile-button" onClick={openMenu}>
          <div className="user-profile-pic-text-wrapper">
            <img
              className="user-button-profile-pic"
              src={session.preferences.profilePicUrl}
              alt="Profile"
            />
            <div className="user-profile-button-info">
              <div className="user-button-display-name">
                {session.displayName}
              </div>
              <div className="user-button-username">@{user.username}</div>
            </div>
          </div>
          <i className="fas fa-ellipsis-h user-button-ellipsis"></i>
        </div>
      )}
      {showMenu && (
        <div className="profile-dropdown-container">
          <div className="user-profile-pic-text-wrapper dropdown-wrapper">
            <img
              className="user-button-profile-pic pic-dropdown"
              src={session.preferences.profilePicUrl}
              alt="Profile"
            />
            <div className="user-profile-button-info">
              <div className="user-button-display-name">
                {session.displayName}
              </div>
              <div className="user-button-username">@{user.username}</div>
            </div>
          </div>
          <ul className="profile-dropdown">
            <a href={"https://github.com/dbmille2/Fantsy"}>
              <li className="github-links">
                <i className="fab fa-github"></i>
              </li>
            </a>
            <li className="logout-li">
              <div onClick={logout}>Log out @{user.username}</div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
