import "./PlayerCard.css";
import PlayerFollowButton from "../PlayerFollowButton";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function PlayerCard({ player }) {
  const followedPlayers = useSelector((state) => state.session.followedPlayers);
  useEffect(() => {
  }, [followedPlayers]);
  return (
    <div className={`player-card ${player.position}`}>
      <Link className="player-card-link" to={`/players/${player.id}/following`}>
        <div className="player-card-info">
          <img
            className="player-card-pic"
            src={player.imgUrl}
            alt="player-pic"
          />

          <div className="player-card-text">
            <div className="player-card-text-name">{player.name}</div>
            <div className="player-card-text-position">
              {player.position}
              {" - "}
              {player.teamName}
            </div>
          </div>
        </div>
      </Link>
      <PlayerFollowButton player={player} />
    </div>
  );
}

export default PlayerCard;
