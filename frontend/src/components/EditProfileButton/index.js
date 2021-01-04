import { useSelector, useDispatch } from "react-redux";
import "./EditProfileButton.css";
import React, { useState } from "react";
import EditProfileModal from "../EditProfileModal";
import EditProfileForm from "../EditProfileForm";

function EditProfileButton() {
  // const user = useSelector((state) => state.session.user);
  // const profile = useSelector((state) => state.profile);
  // const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="edit-profile-wrapper">
      <button
        className="edit-profile-button"
        onClick={() => setIsProfileOpen(true)}
      >
        Edit Profile
      </button>
      <EditProfileModal
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      >
        <EditProfileForm onClose={() => setIsProfileOpen(false)} />
      </EditProfileModal>
    </div>
  );
}

export default EditProfileButton;
