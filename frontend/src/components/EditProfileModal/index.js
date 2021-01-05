import "./EditProfileModal.css";
import ReactDOM from "react-dom";

function EditProfileModal({ open, children, onClose }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="edit-profile-overlay" onClick={onClose}></div>
      <div className="edit-profile-modal">
        <button className="edit-profile-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        {children}
      </div>
    </>,
    document.getElementById("edit-profile-portal")
  );
}

export default EditProfileModal;
