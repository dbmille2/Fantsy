import "./PostModal.css";
import ReactDOM from "react-dom";

function PostModal({ open, children, onClose }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="new-post-overlay" onClick={onClose}></div>
      <div className="new-post-modal">
        <button className="new-post-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        {children}
      </div>
    </>,
    document.getElementById("new-post-portal")
  );
}

export default PostModal;
