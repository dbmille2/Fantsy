import "./SignupFormModal.css";
import ReactDOM from "react-dom";

function SignupFormModal({ open, children, onClose }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="signup-overlay" onClick={onClose}></div>
      <div className="signup-modal">
        <button className="signup-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        {children}
      </div>
    </>,
    document.getElementById("signup-portal")
  );
}

export default SignupFormModal;
