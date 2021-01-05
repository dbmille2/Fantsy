import "./ImageModal.css";
import ReactDOM from "react-dom";

function ImageModal({ open, children, onClose }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="image-overlay" onClick={onClose}></div>
      <div className="image-modal">
        <button className="image-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        {children}
      </div>
    </>,
    document.getElementById("image-portal")
  );
}

export default ImageModal;
