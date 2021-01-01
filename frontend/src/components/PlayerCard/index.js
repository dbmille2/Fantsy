import "./PlayerCard.css";
import PlayerFollowButton from "../PlayerFollowButton";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function PlayerCard({ player }) {
  const followedPlayers = useSelector((state) => state.session.followedPlayers);
  useEffect(() => {
    console.log("HI");
  }, [followedPlayers]);
  return (
    <div className={`player-card ${player.position}`}>
      <div className="player-card-info">
        <img className="player-card-pic" src={player.imgUrl} alt="player-pic" />
        <div className="player-card-text">
          <div className="player-card-text-name">{player.name}</div>
          <div className="player-card-text-position">
            {player.position}
            {" - "}
            {player.teamName}
          </div>
        </div>
      </div>
      <PlayerFollowButton player={player} />
    </div>
  );
}

export default PlayerCard;
