import "./BackButton.css";
import { useHistory } from "react-router-dom";

function BackButton() {
  const history = useHistory();

  return (
    <button onClick={() => history.goBack()} className="back-button">
      <i className="fas fa-arrow-left"></i>
    </button>
  );
}

export default BackButton;
