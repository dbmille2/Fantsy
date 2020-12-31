import "./NavHeader.css";
import SortButton from "../SortButton";
import { useSelector } from "react-redux";
import BackButton from "../BackButton";

function NavHeader({ title, subTitle }) {
  const feed = useSelector((state) => state.posts.feed);
  return (
    <div className="nav-header-wrapper">
      {feed && (
        <div className="header">
          <div className="left-header">
            {title !== "Home" && <BackButton />}
            <div className="nav-user-info">
              <span className="header-title">{title}</span>
              {title !== "Home" && (
                <span className="header-number-posts">
                  {Object.keys(feed).length} {subTitle}
                </span>
              )}
            </div>
          </div>

          {title === "Home" && <SortButton />}
        </div>
      )}
    </div>
  );
}

export default NavHeader;
