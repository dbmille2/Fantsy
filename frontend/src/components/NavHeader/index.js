import "./NavHeader.css";
import SortButton from "../SortButton";

function NavHeader({ title }) {
  return (
    <div className="header">
      <span className="header-title">{title}</span>
      {title === "Home" && <SortButton />}
    </div>
  );
}

export default NavHeader;
