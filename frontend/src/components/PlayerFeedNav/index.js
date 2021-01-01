import "./PlayerFeedNav.css";
import { NavLink, useParams } from "react-router-dom";

function PlayerFeedNav() {
  const { playerId } = useParams();
  return (
    <div className="player-feed-nav">
      <NavLink
        className="player-feed-nav-option"
        to={`/players/${playerId}/following`}
        activeClassName="player-feed-nav-active"
      >
        Following
      </NavLink>

      <NavLink
        className="player-feed-nav-option"
        to={`/players/${playerId}/all`}
        activeClassName="player-feed-nav-active"
      >
        All
      </NavLink>
    </div>
  );
}

export default PlayerFeedNav;
