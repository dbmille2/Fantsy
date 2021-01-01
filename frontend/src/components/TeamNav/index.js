import "./TeamNav.css";
import { NavLink } from "react-router-dom";

function TeamNav() {
  return (
    <div className="team-nav">
      <NavLink
        className="team-nav-option"
        exact
        to={`/i/team`}
        activeClassName="team-nav-active"
      >
        My Team
      </NavLink>

      <NavLink
        className="team-nav-option"
        exact
        to={`/i/team/all`}
        activeClassName="team-nav-active"
      >
        All
      </NavLink>
    </div>
  );
}
export default TeamNav;
