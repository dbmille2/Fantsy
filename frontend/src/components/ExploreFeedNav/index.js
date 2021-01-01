import "./ExploreFeedNav.css";
import { NavLink } from "react-router-dom";

function ExploreFeedNav() {
  return (
    <div className="explore-feed-nav">
      <NavLink
        className="explore-feed-nav-option"
        to={`/posts/explore/players`}
        activeClassName="explore-feed-nav-active"
      >
        My Team
      </NavLink>

      <NavLink
        className="explore-feed-nav-option"
        to={`/posts/explore/all`}
        activeClassName="explore-feed-nav-active"
      >
        All
      </NavLink>
    </div>
  );
}

export default ExploreFeedNav;
