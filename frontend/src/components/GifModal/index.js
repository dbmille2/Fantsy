import "./GifModal.css";
import ReactDOM from "react-dom";

function GifModal({ open, children, onClose }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="gif-search-overlay" onClick={onClose}></div>
      <div className="gif-search-modal">
        <button className="gif-search-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        {children}
      </div>
    </>,
    document.getElementById("gif-search-portal")
  );
}

export default GifModal;
