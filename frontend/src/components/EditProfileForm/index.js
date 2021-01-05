import "./EditProfileForm.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  updateProfilePic,
  updateProfileBanner,
  updateBothPics,
  updateTextOnly,
} from "../../store/profile";

function EditProfileForm({ onClose }) {
  const dispatch = useDispatch();
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [newBannerPic, setNewBannerPic] = useState(null);
  const profile = useSelector((state) => state.profile);
  const [profilePicSrc, setProfilePicSrc] = useState(profile.profilePic);
  const [bannerPicSrc, setBannerPicSrc] = useState(profile.banner);
  const [newDisplayName, setNewDisplayName] = useState(profile.displayName);
  const [nameFocused, setNameFocused] = useState(false);
  const [newBio, setNewBio] = useState(profile.bio);
  const [bioFocused, setBioFocused] = useState(false);

  const updatePicFile = (e) => {
    const file = e.target.files[0];
    if (file) setNewProfilePic(file);
    setProfilePicSrc(URL.createObjectURL(file));
  };

  const updateBannerFile = (e) => {
    const file = e.target.files[0];
    if (file) setNewBannerPic(file);
    setBannerPicSrc(URL.createObjectURL(file));
  };

  const updateProfileHandler = () => {
    if (newProfilePic && !newBannerPic) {
      dispatch(
        updateProfilePic(newBio, newDisplayName, newProfilePic, profile.id)
      );
      setTimeout(() => onClose(), 2000);
    } else if (newBannerPic && !newProfilePic) {
      dispatch(
        updateProfileBanner(newBio, newDisplayName, newBannerPic, profile.id)
      );
      setTimeout(() => onClose(), 2000);
    } else if (newBannerPic && newProfilePic) {
      dispatch(
        updateBothPics(
          newBio,
          newDisplayName,
          newProfilePic,
          newBannerPic,
          profile.id
        )
      );
      setTimeout(() => onClose(), 2000);
    } else {
      dispatch(updateTextOnly(newBio, newDisplayName, profile.id));
      setTimeout(() => onClose(), 500);
    }
  };

  return (
    <div className="edit-profile-form-wrapper">
      <div className="edit-profile-form-header">
        <span className="edit-profile-form-header-text">Edit profile</span>
        <button
          onClick={() => updateProfileHandler()}
          className="save-profile-button"
        >
          Save
        </button>
      </div>
      <div className="edit-profile-form-pictures">
        <img
          src={bannerPicSrc}
          className="edit-profile-banner"
          alt="banner"
        ></img>
        <div className="edit-profile-pic-background"></div>
        <img
          src={profilePicSrc}
          className="edit-profile-user-pic"
          alt="user"
        ></img>
        <label htmlFor={"profile-pic-input"} className="profile-file-upload">
          <i className="far fa-plus-square profile-pic-plus"></i>
        </label>
        <input
          id={"profile-pic-input"}
          type="file"
          onChange={updatePicFile}
        ></input>
        <label htmlFor={"profile-banner-input"} className="banner-file-upload">
          <i className="far fa-plus-square profile-banner-plus"></i>
        </label>
        <input
          id={"profile-banner-input"}
          type="file"
          onChange={updateBannerFile}
        ></input>
      </div>
      <div className="edit-profile-form-inputs">
        <div className="name-input-wrapper">
          <button
            onClick={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
            className={nameFocused ? "name-wrapper focused" : "name-wrapper"}
          >
            <span
              className={nameFocused ? "name-header focused" : "name-header"}
            >
              Name
            </span>
            <input
              type="text"
              onBlur={() => setNameFocused(false)}
              onFocus={() => setNameFocused(true)}
              value={newDisplayName}
              onChange={(event) => setNewDisplayName(event.target.value)}
              className="name-input"
            ></input>
          </button>
        </div>
        <div className="bio-input-wrapper">
          <button
            onClick={() => setBioFocused(true)}
            onBlur={() => setBioFocused(false)}
            className={bioFocused ? "bio-wrapper focused" : "bio-wrapper"}
          >
            <span className={bioFocused ? "bio-header focused" : "bio-header"}>
              Bio
            </span>
            <textarea
              rows="4"
              onBlur={() => setBioFocused(false)}
              onFocus={() => setBioFocused(true)}
              value={newBio || ""}
              onChange={(event) => setNewBio(event.target.value)}
              className="bio-text-area"
            ></textarea>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileForm;
