import { Link } from "react-router-dom";
import "./TrendingPlayerCard.css";

function TrendingPlayerCard({ player }) {
  return (
    <Link
      className="trending-player-card-link"
      to={`/players/${player.id}/all`}
    >
      <li className="trending-player-card">
        <div className="trending-player-card-text">
          <div className="trending-card-header">Player · Trending</div>
          <div className="trending-card-player-name">{player.name}</div>
          <div className="trending-card-team-info">
            {player.position}
            {" - "}
            {player.teamName}
          </div>
          <div className="trending-card-number-posts">
            {player.tagCount} posts today
          </div>
        </div>
        <div className="trending-player-card-pic-container">
          <img
            src={player.imgUrl}
            className="trending-player-card-pic"
            alt="playerimg"
          />
        </div>
      </li>
    </Link>
  );
}

export default TrendingPlayerCard;
