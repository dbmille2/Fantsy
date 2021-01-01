import "./PlayerPositionNav.css";
import { NavLink } from "react-router-dom";

function PlayerPositionNav() {
  return (
    <div className="position-nav">
      <NavLink
        className="position-nav-option"
        exact
        to={`/i/team/all/`}
        activeClassName="position-nav-active"
      >
        All
      </NavLink>
      <NavLink
        className="position-nav-option"
        exact
        to={`/i/team/all/qb`}
        activeClassName="position-nav-active"
      >
        QB
      </NavLink>
      <NavLink
        className="position-nav-option"
        exact
        to={`/i/team/all/rb`}
        activeClassName="position-nav-active"
      >
        RB
      </NavLink>
      <NavLink
        className="position-nav-option"
        exact
        to={`/i/team/all/wr`}
        activeClassName="position-nav-active"
      >
        WR
      </NavLink>
      <NavLink
        className="position-nav-option"
        exact
        to={`/i/team/all/te`}
        activeClassName="position-nav-active"
      >
        TE
      </NavLink>
      <NavLink
        className="position-nav-option"
        exact
        to={`/i/team/all/k`}
        activeClassName="position-nav-active"
      >
        K
      </NavLink>
    </div>
  );
}

export default PlayerPositionNav;
